import React, {useEffect, useState} from 'react';
import { Button, Icon, Grid } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

let token = window.sessionStorage.getItem('userDetail');

function Product(){
    const [productList, setProductList] = useState([]);
    const [role, setRole] = useState("");
    useEffect(() => {
        async function fetchData(){
            let response = await fetch('http://localhost:8080/api/products');
            response = await response.json();
            return setProductList(response);
        }
        fetchData();
        
    }, []);
    
    const deleteItem = async (id) => {
        let token = window.sessionStorage.getItem('userDetail');
        let response = await fetch(`http://localhost:8080/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                "Accept" : "*/*",
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        });
        response = await response.json();
        setProductList(response);
    }
    useEffect(() => {
        if(role == 'ADMIN'){
            async function userDetail() {
                let response = await fetch('http://localhost:8080/api/users/', {
                        method: 'GET',
                        headers: {
                            "Content-Type" : "application/json",
                            "Accept" : "*/*",
                            Authorization : `Bearer ${JSON.parse(token)}`
                        },
                    });
                    response = await response.json();
                    response.map((item) => {
                        if(item?.roles[0]?.name === 'ADMIN'){
                            setRole(item?.roles[0]?.name);
                        }
                    });
        
            }
            userDetail();
        }
    },[]);


    return (
        <div className='mt-6em mr-5 ml-5 h-50'>
            <Grid container spacing={3}>
                {productList.length > 0 ? productList.map((item, index) => {
                    return (
                        <Grid item xs={3} key={index}>
                            <Link to={'/productDetails/' + item.id} id={item.id}>
                                <div className='card'>
                                    <div className='card-img-top'>
                                        <img src={item.imageUrl} alt='' />
                                    </div>
                                    <div className='card-title align-items-center d-flex justify-content-between'>
                                        <h4 className='mt-0 mb-0'>{item.name}</h4>
                                        <div><strong>₹ {item.price}</strong></div>
                                    </div>
                                    <div className='card-description'>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        
                                        <Button variant='contained' color='primary' disableElevation>Buy</Button>
                                        {role === 'ADMIN' ? <div className='text-right d-flex align-items-center'>
                                            <Icon className='mr-2'>
                                                <Edit/>
                                            </Icon>
                                            <Icon>
                                                <Delete onClick={() => {deleteItem(item.id)}} />
                                            </Icon>
                                            
                                        </div> : ''}
                                    </div>
                                </div>
                            </Link>
                            
                        </Grid>
                    )
                }) : <Grid item xs={12} className="text-center"> No Item Found </Grid>}
            </Grid>
        </div>
    );
}

export default Product;