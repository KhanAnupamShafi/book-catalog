# Book Catalog

---

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png 'Logo'

[Deployed Frontend Live Link ( Vercel) ](https://book-library-frontend-livid.vercel.app/)

[Frontend Github Repository](https://github.com/KhanAnupamShafi/book-catalog)

[Backend Github Repository](https://github.com/KhanAnupamShafi/book-catalog-server)

### Requirements:

Create a simple and clean landing page for a book catalog system using React and redux . The landing page should have a header, a list of the top 10 recently added books and a footer. There should be some open routes such as "All Books", "Sign In", and "Sign Up".

### Login Page and Registration Page: ( You can use firebase authentication or custom authentication)

Create a way for users to create new accounts with a unique email and password. Also, create a way for users to log in using their credentials. After a successful login, the login button should be replaced with a logout button in the navbar. Create a way for users to securely log out of the application.

### All Books Page

- Fetch a list of books from an API using RTK Query and Display the list of books (Table or card or any other manner). Each book should display key information such as

  - Title
  - Author
  - Genre
  - Publication Date

- Implement a search bar that allows users to search for books based on criteria such as title, author, or genre.

- Enable filtering options below or side of the search bar to narrow down the book list based on genre & publication year.

- Ensure search and filtering operations are efficient and provide accurate results.

- Implement an "Add New" Button to navigate to the "add-new-book" page to add a new book. You can also add "Add New Book" as a navigation menu for authenticated users.

### Add New Book Page

Authenticated users can add a new book by filling out a form. After submitting the form, the user will be notified of the success or failure of the operation with a toast or other notification.

### Book Details Page

When a user clicks on a book from the list, displays a detailed view of the book. The detailed view should include the following information:

- **Title**
- **Author**
- **Genre**
- **Publication Date**
- **Reviews**

The reviews should be displayed on the book details page.

**Add two buttons to the book details page:**

- Edit Button
- Delete Button

When a user clicks on the **Edit Book** button, they should be redirected to the **edit-book** page. When a user clicks on the **Delete Book** button, they should see a confirmation dialogue to confirm that they want to delete the book.

**Authenticated users should be able to leave reviews for books.** Implement a submit box for submitting a review.

### Edit Books Page:

Authenticate users can edit a book using a form. The form should have current data when editing. After submitting the form, the user should be notified using a toast or any other solution. If there is any issue, the user will also be notified.
