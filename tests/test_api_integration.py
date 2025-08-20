import pytest
from src.library import Library

def test_add_book_valid_isbn(monkeypatch, tmp_path):
    # 9780140328721: Matilda by Roald Dahl
    test_file = tmp_path / "test_library.json"
    lib = Library(filename=str(test_file))
    book = lib.add_book("9780140328721")
    assert book is not None
    assert book.title is not None
    assert "Roald Dahl" in book.author
    assert book.isbn == "9780140328721"

def test_add_book_invalid_isbn(tmp_path):
    test_file = tmp_path / "test_library.json"
    lib = Library(filename=str(test_file))
    book = lib.add_book("0000000000000")
    assert book is None
