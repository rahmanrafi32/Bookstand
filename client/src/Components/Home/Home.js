import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookContext } from "../../App";

const Home = () => {
  const [bookInfo, setBookInfo] = useContext(BookContext);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("https://banana-shortcake-02710.herokuapp.com/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, [books]);

  const handleBuy = (id) => {
    fetch(`https://banana-shortcake-02710.herokuapp.com/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBookInfo(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="">
      {books.length === 0 && (
        <div
          className="spinner-border container text-success"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <div className="container">
        <div className="row">
          {books.map((book) => (
            <div className="col-md-4 mt-4">
              <div
                className="card mb-2"
                style={{ width: "300px", height: "470px" }}
              >
                <img
                  src={book.img}
                  style={{ height: "300px", width: "300px" }}
                  className="card-img-top  m-auto"
                  alt="bookImage"
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">Author: {book.author}</p>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6>Price: ${book.price}</h6>
                    </div>
                    <div>
                      <Link
                        to="/checkout"
                        onClick={() => handleBuy(`${book._id}`)}
                        className="btn btn-success"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
