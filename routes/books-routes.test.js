process.env.NODE_ENV = "test";
console.log(process.env.NODE_ENV)
const db = require("../db");

const request = require("supertest");
const app = require("../app")
const Book = require("../models/book")


beforeEach(async function() {
  let testBookInfo = {
      "isbn": "0691161518",
      "amazon_url": "http://a.co/eobPtX2",
      "author": "whiskey",
      "language": "english",
      "pages": 264,
      "publisher": "Princeton University Press",
      "title": "Power-Up: Unlocking Hidden Math in Video Games",
      "year": 2017
    };
  
  let createBook = await Book.create(testBookInfo);
})

afterEach(async function() {
await Book.remove("0691161518");
})
  afterAll(async function() {
    await db.end();
  })


describe("GET /", function() {

    test("Gets an object of all books", async function() {
        const response = await request(app).get(`/books`)
        expect(response.body.books[0]).toEqual({
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "whiskey",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking Hidden Math in Video Games",
            "year": 2017
          });
        expect(response.body.books).toHaveLength(1);
        expect(response.statusCode).toEqual(200);
    })
})