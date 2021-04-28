import React from 'react';
import '../Navar/Navbar.css';
import { navData } from '../Navar/NavbarData';

const Navbar = () => {
    return (
        <div className="nav">
            <ul>
             {
                 navData.map((item,index)=>{
                     return(
                         <li key={index} className={item.cName}>{item.title}</li>
                     )
                 })
             }
            </ul>
        </div>
    );
};

export default Navbar;