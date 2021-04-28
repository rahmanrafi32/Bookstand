import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookContext } from '../../App';

const Home = () => {
    const [bookInfo,setBookInfo] = useContext(BookContext);
    
    const [books,setBooks] = useState([]);
    useEffect(()=>{
        fetch('https://banana-shortcake-02710.herokuapp.com/books')
        .then(res=>res.json())
        .then(data=>setBooks(data))
    },[books]);

    const handleBuy = (id) =>{
        fetch(`https://banana-shortcake-02710.herokuapp.com/books/${id}`)
        .then(res=> res.json())
        .then(data=> {
            setBookInfo(data);
        })
        .catch(err=>console.log(err))

    }

    return (
        <div className='container-fluid'>
            <div className='align-items-center'>
                <form className="form-inline m-5">
                    <input className="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
            <div className='row'>
                {
                    books.length === 0 &&   <div className="spinner-border container text-success" style={{width: '3rem', height: '3rem'}} role="status">
                    <span className="sr-only">Loading...</span>
                  </div> 
                }
                {
                    books.map(book=> 
                    <div className='col-md-3 m-2'>
                        <div className="card mb-2" style={{width: "370px",height:"450px"}}>
                            <img src={book.img} style={{height:'300px', width:'300px'}} className="card-img-top  m-auto" alt="bookImage"/>
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">Author: {book.author}</p>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <h6>Price: ${book.price}</h6>
                                    </div>
                                    <div>
                                        <Link to='/checkout' onClick={()=>handleBuy(`${book._id}`)} className="btn btn-success">Buy Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Home;