const Database = require("./Database.js")
const Author = require("./entities/Author");
const User = require("./entities/User");
const Book = require("./entities/Book");
const Posters = require("./entities/Posters");
const Order = require("./entities/Order");

module.exports = class App {
  static #database = new Database();

  createUser(name, email, password) {
    const user = new User(name, email, password);
    App.#database.saveUser(user);
  }

  getUsers() {
    return App.#database.find("users");
  }

  createAuthor(name, nationality, bio) {
    const author = new Author(name, nationality, bio);
    App.#database.saveAuthor(author);
  }

  getAuthors() {
    return App.#database.find("authors");
  }

  createBook(title, synopsis, genre, pages, author, description, price, inStock) {
    const book = new Book(title, synopsis, genre, pages, author, description, price, inStock);
    App.#database.saveBook(book);
  }
  addBook(bookName, quantity) {
    App.#database.addBooksToSotck(bookName, quantity);
  }

  getBooks() {
   return App.#database.find("books")
  }

  createPoster(name, description, height, widht, price, inStock) {
    const poster = new Posters(name, description, height, widht, price, inStock);
    App.#database.savePoster(poster);
  }

  addPoster(posterName, quantity) {
    App.#database.addPostersToStock(posterName, quantity);
  }

  getPosters(posterName, quantity) {
    return App.#database.find('posters')
  }

  createOrder(items, user) {
    const order = new Order(items, user);
    App.#database.saveOrder(order);
    order.data.items.forEach(({ product, quantity }) => {
      if (product instanceof Book) {
        App.#database.removeBooksFromStock(product.name, quantity);
      } else if (product instanceof Posters) {
        App.#database.removePostersFromStock(product.name, product);
      }
    })
  }

  getOrders(){
    return App.#database.find('orders')
  }

  showDatabase() {
    App.#database.showStorage()
  }
}
