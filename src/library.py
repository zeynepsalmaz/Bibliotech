import json
from .book import Book

import httpx


class Library:

    def search_books(self, query: str):
        query_lower = query.lower()
        return [book for book in self.books if query_lower in book.isbn.lower() or query_lower in book.title.lower()]
    def __init__(self, filename="library.json"):
        self.filename = filename
        self.books = []
        self.load_books()

    def add_book(self, isbn: str):
        """
        Takes ISBN, fetches book info from Open Library API and adds it.
        """
        url = f"https://openlibrary.org/isbn/{isbn}.json"
        print(f"[DEBUG] Open Library API request: {url}")
        try:
            response = httpx.get(url, timeout=10, follow_redirects=True)
            print(f"[DEBUG] API status: {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                title = data.get("title", "Unknown")
                authors = data.get("authors", [])
                author_names = []
                for author in authors:
                    key = author.get("key")
                    if key:
                        author_url = f"https://openlibrary.org{key}.json"
                        try:
                            author_resp = httpx.get(author_url, timeout=5, follow_redirects=True)
                            print(f"[DEBUG] Author API status: {author_resp.status_code} for {author_url}")
                            if author_resp.status_code == 200:
                                author_data = author_resp.json()
                                author_names.append(author_data.get("name", "Unknown"))
                        except Exception as e:
                            print(f"[DEBUG] Author API error: {e}")
                            author_names.append("Unknown")
                author_str = ", ".join(author_names) if author_names else "Unknown"
                book = Book(title, author_str, isbn)
                self.books.append(book)
                self.save_books()
                print(f"[DEBUG] Book added: {book}")
                return book
            elif response.status_code == 404:
                print("[DEBUG] Book not found (404)")
                return None
            else:
                print(f"[DEBUG] API unexpected status: {response.status_code}")
                return None
        except Exception as e:
            print(f"[DEBUG] API connection error: {e}")
            return None

    def remove_book(self, isbn: str):
        self.books = [b for b in self.books if b.isbn != isbn]
        self.save_books()

    def list_books(self):
        return self.books

    def find_book(self, isbn: str):
        for book in self.books:
            if book.isbn == isbn:
                return book
        return None

    def load_books(self):
        try:
            with open(self.filename, "r") as f:
                data = json.load(f)
                self.books = [Book(**item) for item in data]
        except (FileNotFoundError, json.JSONDecodeError):
            self.books = []

    def save_books(self):
        with open(self.filename, "w") as f:
            json.dump([book.__dict__ for book in self.books], f, indent=4)
