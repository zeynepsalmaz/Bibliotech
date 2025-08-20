from library import Library
from book import Book

def main():
    library = Library()
    while True:
        print("\n1. Add Book\n2. Delete Book\n3. List Books\n4. Find Book\n5. Exit")
        choice = input("Your choice: ")
        if choice == "1":
            isbn = input("ISBN: ")
            book = library.add_book(isbn)
            if book:
                print(f"Book added: {book}")
            else:
                print("Book not found or could not be added.")
        elif choice == "2":
            isbn = input("ISBN of the book to delete: ")
            library.remove_book(isbn)
            print("Book deleted.")
        elif choice == "3":
            books = library.list_books()
            if not books:
                print("Library is empty.")
            else:
                for book in books:
                    print(book)
        elif choice == "4":
            isbn = input("ISBN to search: ")
            book = library.find_book(isbn)
            if book:
                print(book)
            else:
                print("Book not found.")
        elif choice == "5":
            print("Exiting...")
            break
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    main()
