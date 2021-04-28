import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

const Admin = () => {
    const axios = require('axios').default;
    const { register, handleSubmit, watch, errors } = useForm();
    const [imgURL,setImageURL] = useState();

    const onSubmit = data => {
        const bookData = {
            title: data.title,
            author: data.author,
            price: data.price,
            img: imgURL
        }
        fetch('https://banana-shortcake-02710.herokuapp.com/addBook',{
            method:'post',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(bookData)
        }).then(res=>res.json())
        .then(data=> console.log('data posted successfully'))
    };

    const handleImage =(e) =>{
        const imageData = new FormData();
        imageData.set('key','3870c154d57c9cf79d3e734926dc16fe');
        imageData.append('image', e.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(response => {
            setImageURL(response.data.data.display_url);
          })
          .catch(error=> {
            console.log(error);
          });
    }

    return (
        <div className='container-fluid'>
            <aside>
                <Link to='/admin'><h5 style={{color: 'black', textDecoration:'none', marginTop:'30px'}}>Add Product</h5></Link>
                <Link to='/manageProduct'><h5  style={{color: 'black', textDecoration:'none', marginTop:'30px'}}>Manage Product</h5></Link>
            </aside>
            <div className='container'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input style={{width:'30%'}} className='form-control' name="title" placeholder='title' ref={register}/>
                    <br/><input style={{width:'30%'}} className='form-control' name="author" placeholder='author name' ref={register}/>
                    <br/><input style={{width:'30%'}} className='form-control' name="price" placeholder='price' ref={register}/>
                    <br/>
                    <input type="file" onChange={handleImage} />
                    <input className='btn btn-success' type="submit" value='Add book'/>
                </form>
            </div>
        </div>
    );
};

export default Admin;