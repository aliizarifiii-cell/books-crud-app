# Books CRUD App
# Ditt Förnamn Ditt Efternamn

Detta är en fullstack CRUD-applikation byggd med FastAPI i backend och React i frontend.
Temat är en enkel boksamling där användaren kan skapa, läsa, uppdatera och ta bort böcker.

## Projektstruktur

```bash
fullstack-crud-app/
├── backend
│   ├── app.py
│   ├── database.py
│   ├── models/
│   │   └── book.py
│   ├── schemas/
│   │   └── book.py
│   └── routes/
│       └── books.py
├── frontend
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── styles.css
└── README.md
```

## Starta backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend körs på:
```bash
http://127.0.0.1:8000
```

## Starta frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend körs på:
```bash
http://localhost:5173
```

## Endpoints
- POST /books
- GET /books
- GET /books/{id}
- PUT /books/{id}
- DELETE /books/{id}

## Tekniker
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- React
- Vite
- Axios

## Funktioner
- Skapa bok
- Visa alla böcker
- Hämta en bok via id
- Uppdatera bok
- Ta bort bok
- Enkel felhantering
- CORS konfigurerad mellan frontend och backend
