from sqlalchemy import Column, Integer, String, Text
from database import Base


class Book(Base):
    __tablename__ = 'books'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    author = Column(String(120), nullable=False)
    genre = Column(String(80), nullable=False)
    description = Column(Text, nullable=True)
