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

// Get the book list available in the shop- async
public_users.get('/', async (req, res) => {
    try {
        const bookList = await Promise.resolve(books);  
        return res.status(200).json({ books: bookList });
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books" });
    }
});

// Get book details based on ISBN - async
public_users.get('/isbn/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn; // Get the ISBN 

        // Simulating an async operation (e.g., fetching from a database)
        const bookDetails = await Promise.resolve(books[isbn]);  

        if (bookDetails) {
            return res.status(200).json(bookDetails);
        } else {
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving book details" });
    }
});
  
// Get book details based on author - async
public_users.get('/author/:author', async (req, res) => {
    try {
        const author = req.params.author; // Get author

        // Simulating an async operation (e.g., fetching from a database)
        const booksByAuthor = await Promise.resolve(
            Object.values(books).filter(book => book.author === author)
        );

        if (booksByAuthor.length > 0) {
            return res.status(200).json(booksByAuthor);
        } else {
            return res.status(404).json({ message: "No books found by this author" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books" });
    }
});

// Get all books based on title- async
public_users.get('/title/:title', async (req, res) => {
    try {
        const title = req.params.title; // Get title

        // Simulating an async operation (e.g., fetching from a database)
        const booksByTitle = await Promise.resolve(
            Object.values(books).filter(book => book.title === title)
        );

        if (booksByTitle.length > 0) {
            return res.status(200).json(booksByTitle);
        } else {
            return res.status(404).json({ message: "No books found with this title" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving books" });
    }
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
