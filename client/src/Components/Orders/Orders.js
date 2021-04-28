import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';

const Orders = () => {
    const [orders,setOrders] =useState([]);
    const [loggedUser, setLoggedUser] = useContext(UserContext);
        
            fetch(`https://banana-shortcake-02710.herokuapp.com/orders?orderBy=${loggedUser.email}`)
            .then(res=>res.json())
            .then(data=> setOrders(data));
        
    return (
        <div className='container'>
            <h1 className='text-center'>Order List Of {loggedUser.displayName}</h1>
            <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                   orders.map(order=>
                                   <tr>
                                       <td>{(new Date(order.date).toDateString('dd/MM/yyyy'))}</td>
                                        <td>{order.title}</td>
                                        <td>1</td>
                                        <td>$ {order.price}</td>  
                                </tr>) 
                            }
                    </tbody>
                </table>
        </div>
    );
};

export default Orders;