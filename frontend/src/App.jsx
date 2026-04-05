import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/books'

const emptyForm = {
  title: '',
  author: '',
  genre: '',
  description: '',
}

function App() {
  const [books, setBooks] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL)
      setBooks(response.data)
    } catch (error) {
      setMessage('Kunde inte hämta böcker.')
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form)
        setMessage('Boken uppdaterades.')
      } else {
        await axios.post(API_URL, form)
        setMessage('Boken skapades.')
      }

      resetForm()
      fetchBooks()
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Något gick fel.')
    }
  }

  const handleEdit = (book) => {
    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description || '',
    })
    setEditingId(book.id)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setMessage('Boken togs bort.')
      if (editingId === id) {
        resetForm()
      }
      fetchBooks()
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Kunde inte ta bort boken.')
    }
  }

  return (
    <div className="container">
      <h1>Books CRUD App</h1>
      <p>En enkel fullstack-applikation med FastAPI och React.</p>

      <form onSubmit={handleSubmit} className="form-card">
        <input
          name="title"
          placeholder="Titel"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="author"
          placeholder="Författare"
          value={form.author}
          onChange={handleChange}
          required
        />
        <input
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Beskrivning"
          value={form.description}
          onChange={handleChange}
          rows="4"
        />

        <div className="button-row">
          <button type="submit">{editingId ? 'Uppdatera bok' : 'Lägg till bok'}</button>
          {editingId && (
            <button type="button" onClick={resetForm} className="secondary">
              Avbryt
            </button>
          )}
        </div>
      </form>

      {message && <p className="message">{message}</p>}

      <div className="books-list">
        {books.length === 0 ? (
          <p>Inga böcker ännu.</p>
        ) : (
          books.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p><strong>Författare:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p>{book.description}</p>
              <div className="button-row">
                <button onClick={() => handleEdit(book)}>Redigera</button>
                <button onClick={() => handleDelete(book.id)} className="danger">
                  Ta bort
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
