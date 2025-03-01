const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const { username, password } = req.body; // get username and password  

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are needed" });
    }

    // Does user exist?
    if (users[username]) {
        return res.status(409).json({ message: "User already exists" });
    }

    users[username] = { password: password };
    return res.status(201).json({ message: "User registered" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).json({ books: books });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn; // Get the ISBN 

    if (books[isbn]) {
        return res.status(200).json(books[isbn]);  
    } else {
        return res.status(404).json({ message: "Book not found" });  
    }
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author; // Get author
    const booksByAuthor = Object.values(books).filter(book => book.author === author);  
    
    if (booksByAuthor.length > 0) {
        return res.status(200).json(booksByAuthor); // Return book details if found
    } else {
        return res.status(404).json({ message: "No books found by this author" }); // Return error if not found
    }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title // Get title
    const booksByTitle = Object.values(books).filter(book => book.title === title);  
    
    if (booksByTitle.length > 0) {
        return res.status(200).json(booksByTitle);  
    } else {
        return res.status(404).json({ message: "No books found with this title" });      }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn; // Get ISBN 

    if (books[isbn]) {
        return res.status(200).json(books[isbn].reviews);  
    } else {
        return res.status(404).json({ message: "Book not found" }); 
    }
});

module.exports.general = public_users;
