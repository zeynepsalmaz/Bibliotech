
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .library import Library
from typing import List

app = FastAPI()

 # CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
library = Library()

class BookModel(BaseModel):
    title: str
    author: str
    isbn: str

class ISBNModel(BaseModel):
    isbn: str

class BulkISBNModel(BaseModel):
    isbns: List[str]


# List all books or search by ISBN or title
from fastapi import Query

@app.get("/books", response_model=list[BookModel])
def get_books(query: str = Query(None, description="Search by ISBN or title")):
    books = library.list_books()
    if query:
        query_lower = query.lower()
        books = [b for b in books if query_lower in b.isbn.lower() or query_lower in b.title.lower()]
    return [BookModel(title=b.title, author=b.author, isbn=b.isbn) for b in books]

@app.post("/books", response_model=BookModel)
def add_book(isbn_model: ISBNModel):
    # Do not add if the same ISBN already exists
    if library.find_book(isbn_model.isbn):
        raise HTTPException(status_code=409, detail="This ISBN already exists.")
    book = library.add_book(isbn_model.isbn)
    if book:
        return BookModel(title=book.title, author=book.author, isbn=book.isbn)
    raise HTTPException(status_code=404, detail="Book not found or could not be added.")

@app.delete("/books/{isbn}")
def delete_book(isbn: str):
    book = library.find_book(isbn)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found.")
    library.remove_book(isbn)
    return {"message": "Book deleted."}
 # Bulk add books
@app.post("/books/bulk", response_model=list[BookModel])
def add_books_bulk(bulk: BulkISBNModel):
    added_books = []
    already_exists = []
    for isbn in bulk.isbns:
        if library.find_book(isbn):
            already_exists.append(isbn)
            continue
        book = library.add_book(isbn)
        if book:
            added_books.append(BookModel(title=book.title, author=book.author, isbn=book.isbn))
    if not added_books:
        raise HTTPException(
            status_code=409 if already_exists else 404,
            detail=(
                "No books could be added. Already existing ISBNs: " + ", ".join(already_exists)
                if already_exists else "No books could be added."
            )
        )
    if already_exists:
        return {"added": added_books, "already_exists": already_exists}
    return added_books

 # Bulk delete books
@app.delete("/books/bulk")
def delete_books_bulk(bulk: BulkISBNModel):
    deleted = 0
    for isbn in bulk.isbns:
        book = library.find_book(isbn)
        if book:
            library.remove_book(isbn)
            deleted += 1
    if deleted == 0:
        raise HTTPException(status_code=404, detail="No books could be deleted.")
    return {"message": f"{deleted} books deleted."}
