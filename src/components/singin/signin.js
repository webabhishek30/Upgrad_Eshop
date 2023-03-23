import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Icon } from '@material-ui/core';
import Lock from '@material-ui/icons/Lock';
import {useFormik} from 'formik';
import { signInSchema } from '../../assets/schemas';
import { useNavigate, Link } from 'react-router-dom';

const initialValues = {
    email : "",
    password : ""
}

let token = window.sessionStorage.getItem('userDetail');

export default function Signin(){
    let navigate = useNavigate();
    
   
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues : initialValues,
        validationSchema : signInSchema,
        onSubmit : async (values) => {
            try{
                let response = await fetch("http://localhost:8080/api/auth/signin",{
                    method: 'POST',
                    headers: {
                        "Content-Type" : "application/json",
                        "Accept" : "*/*",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        username : values.email,
                        password : values.password
                    })
                });
                response = await response.json();
                console.log(response);
                window.sessionStorage.setItem('userDetail', JSON.stringify(response['token']));
                
                navigate('/');
                window.location.reload();
            }catch(error){
                alert(error.message);
            }
        }
    });

    

    return(
        <div className='mt-4em h-100 align-items-center justify-content-center d-flex'>
            <div className='min-container'>
                <div className='icon'>
                    <Icon>
                        <Lock/>
                    </Icon>
                </div>
                <h2 className='title text-center'>Sign in</h2>
                <Box component='form' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <TextField fullWidth type={'email'} name='email' variant="outlined" size="medium" label="Email Address *" value={values.email} onChange = {handleChange} onBlur = {handleBlur} className={errors.email && touched.email ? 'error' : ''}/>
                    </div>
                    <div className='mb-4'>
                        <TextField fullWidth variant="outlined" name='password' type={'password'} size="medium" label="Password *"  value={values.password}  onChange = {handleChange} onBlur = {handleBlur} className={errors.password && touched.password ? 'error' : ''} />
                    </div>
                    <div className='mb-4'>
                        <Button variant='contained' color='primary' type='submit' fullWidth disableElevation>Sign In</Button>
                    </div>
                </Box>
                <Link to="/signup">Don't have an account? Sign Up</Link>
            </div>
        </div>
    );
}