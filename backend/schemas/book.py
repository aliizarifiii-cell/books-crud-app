from pydantic import BaseModel, Field


class BookBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=150)
    author: str = Field(..., min_length=1, max_length=120)
    genre: str = Field(..., min_length=1, max_length=80)
    description: str | None = Field(default=None, max_length=1000)


class BookCreate(BookBase):
    pass


class BookUpdate(BookBase):
    pass


class BookResponse(BookBase):
    id: int

    model_config = {'from_attributes': True}
