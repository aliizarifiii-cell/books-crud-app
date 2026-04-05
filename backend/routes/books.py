from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models.book import Book
from schemas.book import BookCreate, BookResponse, BookUpdate

router = APIRouter(prefix='/books', tags=['books'])


@router.post('', response_model=BookResponse, status_code=status.HTTP_201_CREATED)
def create_book(book: BookCreate, db: Session = Depends(get_db)):
    new_book = Book(**book.model_dump())
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book


@router.get('', response_model=list[BookResponse], status_code=status.HTTP_200_OK)
def get_books(db: Session = Depends(get_db)):
    return db.query(Book).order_by(Book.id.desc()).all()


@router.get('/{book_id}', response_model=BookResponse, status_code=status.HTTP_200_OK)
def get_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Book not found')
    return book


@router.put('/{book_id}', response_model=BookResponse, status_code=status.HTTP_200_OK)
def update_book(book_id: int, updated_book: BookUpdate, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Book not found')

    for key, value in updated_book.model_dump().items():
        setattr(book, key, value)

    db.commit()
    db.refresh(book)
    return book


@router.delete('/{book_id}', status_code=status.HTTP_200_OK)
def delete_book(book_id: int, db: Session = Depends(get_db)):
    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Book not found')

    db.delete(book)
    db.commit()
    return {'message': 'Book deleted successfully'}
