import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookContext, UserContext } from '../../App';

const CheckOut = () => {
    const [bookInfo,setBookInfo] = useContext(BookContext);
    const [loggedUser, setLoggedUser] = useContext(UserContext);
    const handleCheckOut =()=>{
        const orderItem = {
            name:loggedUser.displayName,
            orderBy: loggedUser.email,
            title: bookInfo[0]?.title,
            price: bookInfo[0]?.price,
            date: new Date()
        }
        fetch(`https://banana-shortcake-02710.herokuapp.com/orderItem`, {
            method: 'POST',
            body: JSON.stringify(orderItem),
            headers: {
                'Content-Type': 'application/json'
            },
          
        })
    }
    return (
            <div className='container mt-5'>
            <h1>Check Out</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                        
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                bookInfo.map(book=>
                                    <tr>
                                        <td>{book.title}</td>
                                        <td>1</td>
                                        <td>$ {book.price}</td>
                                    </tr>)

                            }
                            {
                                bookInfo.map(book=>
                                    <tr>
                                        <td colSpan='2'>Total</td>
                                        <td>$ {book.price}</td>
                                    </tr>)

                            }
                    </tbody>
                       <Link to='/orders'><button onClick={handleCheckOut} className='btn btn-success ml-auto'>Check Out</button></Link>
                </table>
            </div>
        </div>
    );
};

export default CheckOut;