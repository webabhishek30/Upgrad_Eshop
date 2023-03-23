import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { Box, Button, Icon } from '@material-ui/core';
import Lock from '@material-ui/icons/Lock';
import {useFormik} from 'formik';
import { signUpSchema } from '../../assets/schemas';
import { Link } from 'react-router-dom';

const initialValues = {
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    confirmPassword : "",
    mobile: ""
}

export default function Signup(){
    const [message, setMessage] = useState("");

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues : initialValues,
        validationSchema : signUpSchema,
        onSubmit : async (values) => {
            let response = await fetch("http://localhost:8080/api/auth/signup",{
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "*/*"
                },
                body: JSON.stringify({
                    firstName : values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password, 
                    contactNumber: values.mobile
                })
            });
            response = await response.json();
            setMessage(response.message);
            console.log(response);
            
        }

    });

    return(
        <div className='mt-4em h-100 align-items-center justify-content-center d-flex'>
            <div className='min-container'>
                <div>{message}</div>
                <div className='icon'>
                    <Icon>
                        <Lock/>
                    </Icon>
                </div>
                <h2 className='title text-center'>Sign Up</h2>
                <Box  component='form' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <TextField variant="outlined" size="medium" label="First Name *" name='firstName' fullWidth value={values.firstName} onChange={handleChange} onBlur={handleBlur}  className={errors.firstName && touched.firstName ? 'error' : ''}  />
                    </div>
                    <div className='mb-4'>
                        <TextField  variant="outlined" size="medium" label="Last Name *" name='lastName' fullWidth value={values.lastName}onChange={handleChange} onBlur={handleBlur}  className={errors.lastName && touched.lastName ? 'error' : ''}  />
                    </div>
                    <div className='mb-4'>
                        <TextField variant="outlined" size="medium" label="Email Address *" name='email' type={'email'} fullWidth value={values.email} onChange={handleChange} onBlur={handleBlur} className={errors.email && touched.email ? 'error' : ''} />
                    </div>
                    <div className='mb-4'>
                        <TextField  variant="outlined" size="medium" label="Password *" name='password' type={'password'} fullWidth value={values.password} onChange={handleChange} onBlur={handleBlur} className={errors.password && touched.password ? 'error' : ''} />
                    </div>
                    <div className='mb-4'>
                        <TextField  variant="outlined" size="medium" label="Confirm Password *" name='confirmPassword' type={'password'} fullWidth value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}  className={errors.confirmPassword && touched.confirmPassword ? 'error' : ''}/>
                    </div>
                    <div className='mb-4'>
                        <TextField  variant="outlined" size="medium" label="Contact Number *" name='mobile' type={'number'} fullWidth onChange={handleChange} onBlur={handleBlur}  className={errors.mobile && touched.mobile ? 'error' : ''} />
                    </div>
                    <div className='mb-4'>
                        <Button variant='contained' color='primary' type='submit' fullWidth disableElevation>Sign Up</Button>
                    </div>
                </Box>
                <div className='text-right'>
                    <Link to="/login">Already have an account? Sign in</Link>
                </div>
            </div>
        </div>
    );
}