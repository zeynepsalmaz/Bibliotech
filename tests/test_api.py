from fastapi.testclient import TestClient
from src.api import app
import os

client = TestClient(app)

def test_get_books_empty():
    response = client.get("/books")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_add_book_and_get():
    # Temiz başlangıç için sil
    client.delete("/books/9780140328721")
    response = client.post("/books", json={"isbn": "9780140328721"})
    assert response.status_code == 200
    data = response.json()
    assert data["isbn"] == "9780140328721"
    assert data["title"] is not None
    assert "Roald Dahl" in data["author"]
    # Listelemede de görünsün
    response2 = client.get("/books")
    assert any(book["isbn"] == "9780140328721" for book in response2.json())

def test_delete_book():
    # Önce ekle
    client.post("/books", json={"isbn": "9780140328721"})
    response = client.delete("/books/9780140328721")
    assert response.status_code == 200
    assert response.json()["message"] == "Kitap silindi."
    # Tekrar silmeye çalışınca 404
    response2 = client.delete("/books/9780140328721")
    assert response2.status_code == 404

def test_add_book_invalid():
    response = client.post("/books", json={"isbn": "0000000000000"})
    assert response.status_code == 404
    assert "Kitap bulunamadı" in response.json()["detail"]
