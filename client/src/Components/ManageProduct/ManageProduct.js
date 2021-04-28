import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ManageProduct = () => {
    const [books,setBooks] = useState([]);
    useEffect(()=>{
        fetch('https://banana-shortcake-02710.herokuapp.com/books')
        .then(res=>res.json())
        .then(data=>setBooks(data))
    },[books]);

    const handleDelete =(id)=>{
        fetch(`https://banana-shortcake-02710.herokuapp.com/books/${id}`,{
            method:'DELETE'
        }).then(res=> res.json())
        .then(data=> console.log('deleted'))
        .catch(err=>console.log(err))  
    }

    return (
        <div className='container-fluid'>
            <aside>
                <Link to='/admin'><h5 style={{color: 'black', textDecoration:'none', marginTop:'30px'}}>Add Product</h5></Link>
                <Link to='/manageProduct'><h5  style={{color: 'black', textDecoration:'none', marginTop:'30px'}}>Manage Product</h5></Link>
            </aside>
            <div className='container mt-3'>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            books.map(book=>
                            <tr>
                                <td>{book.title}</td>
                                <td>1</td>
                                <td>$ {book.price}</td>  
                                <td><button onClick={()=>handleDelete(`${book._id}`)} className='btn btn-danger'>Delete</button></td>  
                            </tr>) 
                        }
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default ManageProduct;