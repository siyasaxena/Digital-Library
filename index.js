const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let books = [
  {
    id: uuidv4(),
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Quest / Philosophical Fiction",
    status: "Read",
    image:
      "https://tse1.mm.bing.net/th/id/OIP._Z09kGkAdrMKJsz-Zu4LJwHaKj?pid=Api&P=0&h=180",
  },
  {
    id: uuidv4(),
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic American Literature",
    status: "Pending",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.yfVGoypnjZqq67iJTCadswHaLH?pid=Api&P=0&h=180",
  },
  {
    id: uuidv4(),
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Southern Gothic / Drama",
    status: "Read",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.7v6sG5S_nR-_mte569flqgHaJQ?pid=Api&P=0&h=180",
  },
  {
    id: uuidv4(),
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "High Fantasy",
    status: "Pending",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.BmZHhgg5XvJSgJ1MAINI3AHaLG?pid=Api&P=0&h=180",
  },
  {
    id: uuidv4(),
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian Fiction",
    status: "Read",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.kbMxdBWJd1dEmqtbRqHa5wHaLX?pid=Api&P=0&h=180",
  },
  {
    id: uuidv4(),
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance of Manners",
    status: "Pending",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.wcZjPkH4FZD5QYi_2kfxxAHaLS?pid=Api&P=0&h=180",
  },
  {
    id: uuidv4(),
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Coming-of-age Fiction",
    status: "Pending",
    image:
      "https://tse1.mm.bing.net/th/id/OIP.WIlTXUUOYa6nqscRw9Gx6AHaKn?pid=Api&P=0&h=180",
  },
  {
    id: uuidv4(),
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    genre: "Psychological Fiction",
    status: "Pending",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.dUsglQbDHYQPTdTuu7X7BwHaLc?pid=Api&P=0&h=180",
  },
  {
    id: uuidv4(),
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Mystery / Thriller",
    status: "Read",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.tMn6F6T70Fki2J7-zitoawHaLH?pid=Api&P=0&h=180",
  },
  {
    id: uuidv4(),
    title: "Sapiens: A Brief History of Humankind",
    author: "History of Humankind	Yuval Noah Harari",
    genre: "Non-Fiction / Anthropology",
    status: "Pending",
    image:
      "https://tse4.mm.bing.net/th/id/OIP.AZzsxY7oQbCqWItZXYsl7gHaKQ?pid=Api&P=0&h=180",
  },
];

app.get("/books", (req, res) => {
  res.render("index.ejs", { books });
});
app.get("/books/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/books", (req, res) => {
  let { image, title, author, genre, status } = req.body;
  let id = uuidv4();
  books.push({ id, image, title, author, genre, status });
  res.redirect("/books");
});
app.get("/books/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let book = books.find((b) => id === b.id);
  res.render("show.ejs", { book });
});
app.patch("/books/:id", (req, res) => {
  let newtitle = req.body.status;
  let book = books.find((b) => id === b.id);
  book.status = newtitle;
  console.log(book);
  res.redirect("/books");
});

app.get("/books/:id/edit", (req, res) => {
  let { id } = req.params;
  let book = books.find((b) => id === b.id);
  res.render("edit.ejs", { book });
});
app.delete("/books/:id", (req, res) => {
  let { id } = req.params;
  books = books.filter((b) => id !== b.id);
  res.redirect("/books");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
