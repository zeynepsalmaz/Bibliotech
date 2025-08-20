
# Bibliotech

Modern library management system with a Python FastAPI backend and a Next.js (React) frontend.

## Setup

```bash
git clone <repo-url>
cd Bibliotech
pip install -r requirements.txt
```

## Usage

### Terminal CLI
```bash
python src/main.py
```

### API Server
```bash
uvicorn src.api:app --reload
```

### Run All API Tests
```bash
pytest tests/
```

## API Endpoints

### `GET /books`
List all books as JSON. Supports search with `?query=` (by ISBN or title).

### `POST /books`
Add a book by ISBN. Request body:
```json
{
	"isbn": "9780140328721"
}
```
Returns the added book or 404 if not found.

### `DELETE /books/{isbn}`
Delete a book by ISBN. Returns `{ "message": "Book deleted." }` or 404 if not found.

### Bulk Operations
- `POST /books/bulk` — Add multiple books by ISBN list.
- `DELETE /books/bulk` — Delete multiple books by ISBN list.

### Interactive API Docs
Visit [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) while the server is running for Swagger UI.

---

See `frontend/README.md` for frontend usage and development.

# Bibliotech
Full-stack book management app from Global AI Hub Python 202 Bootcamp. Built with OOP, enriched via Open Library API, exposed as a REST API using FastAPI, and completed with a React frontend for a user-friendly interface.
