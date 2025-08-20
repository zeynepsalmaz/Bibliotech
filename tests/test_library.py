import pytest
from src.book import Book
from src.library import Library
import os

def test_add_and_list_books(tmp_path):
    test_file = tmp_path / "test_library.json"
    lib = Library(filename=str(test_file))
    # Geçerli bir ISBN ile test (ör: 9780140328721)
    book = lib.add_book("9780140328721")
    books = lib.list_books()
    assert len(books) == 1
    assert books[0].title is not None
    assert "Roald Dahl" in books[0].author
    assert books[0].isbn == "9780140328721"

def test_remove_book(tmp_path):
    test_file = tmp_path / "test_library.json"
    lib = Library(filename=str(test_file))
    lib.add_book("9780140328721")
    lib.add_book("9780439023528")  # The Hunger Games
    lib.remove_book("9780140328721")
    books = lib.list_books()
    assert len(books) == 1
    assert books[0].isbn == "9780439023528"

def test_find_book(tmp_path):
    test_file = tmp_path / "test_library.json"
    lib = Library(filename=str(test_file))
    lib.add_book("9780140328721")
    found = lib.find_book("9780140328721")
    assert found is not None
    assert found.title is not None
    assert "Roald Dahl" in found.author
    not_found = lib.find_book("0000000000000")
    assert not_found is None
