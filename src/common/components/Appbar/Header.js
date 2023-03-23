import React, { useEffect, useState } from 'react';
import './Appbar.css';
import { Icon } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';

let token = window.sessionStorage.getItem('userDetail');


export default function Header(){
    const [role, setRole] = useState("");

    useEffect(() => {
        const userDetail = async () => {
            let response = await fetch('http://localhost:8080/api/users', {
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
    }, []);
    
    console.log(role);
    let navigate = useNavigate();
    const sessionOut = () => {
        window.sessionStorage.clear();
        window.location.reload();
        navigate('/');
    }

    return(
        <AppBar>
            <Toolbar>
                <div className='d-flex justify-content-between w-100'>
                    <div className='logo d-flex align-items-center'>
                        <Icon size="large" edge="start" className='mr-1' color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <ShoppingCartIcon />
                        </Icon>
                        <div className='d-inline-block'>
                            upGrad E-shop
                        </div>
                    </div>
                    <div className='topLinks'>
                        {/* {token == null ? NotLoggedIn() : LoggedIn(role)} */}
                        {token == null ? <ul>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                            <li>
                                <Link to='/signup'>Signup</Link>
                            </li>
                        </ul> : <ul>
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            {role === 'ADMIN' ? <li>
                                <Link to='/addProducts'>Add Products</Link>
                            </li> : ''}
                            
                            <li>
                                <Link to='/' onClick={sessionOut}>Logout</Link>
                            </li>
                        </ul>}
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
}
