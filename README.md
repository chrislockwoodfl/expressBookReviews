This is a Node / Express project. There is no UI. It simulates a book review system. There is a database of books. The following operations can be performed:

-retrieve all books
-retrieve books by author
-retrieve books by title
-retrieve books by ISBN
-retrieve book reviews by ISBN
-register new user
-login
-add/update a book review
-delete a book review

To run the project in a terminal on port 5000:
node index.js

Test the features via curl. For example:
curl -X GET http://localhost:5000/isbn/3   # get the book with ISBN 3
curl -X GET http://localhost:5000/review/3  # get reviews for book with ISBN 3
curl -X GET "http://localhost:5000/author/Jane%20Austen"  #get books by Jane Austen

The create user and login functions only need to be used if you will be adding/updating reviews. Users are not saved between sessions, so if you restart the server, you will need to register a user before logging them in.

Most of the code is in the directory final_project/router, specifically general.js.

This project is from the course "Developing Back-End Apps with Node.js and Express" by IBM.
