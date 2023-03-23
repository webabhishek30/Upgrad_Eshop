import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { Box, Button, FormControl, MenuItem, Select, InputLabel } from '@material-ui/core';
import { addProductSchema } from '../../assets/schemas';
import {useFormik} from 'formik';

const initialValues = {
    name : "",
    category : "",
    manufacturer : "",
    availableItem : "",
    price : "",
    imageUrl: "",
    description: ""
}

function AddProduct(){
    const [message, setMessage] = useState("");
    let token = window.sessionStorage.getItem('userDetail');
    const [category, setCategory] = useState("");

    const changeCategory = (event) => {
        setCategory(event.target.value);
        console.log(category)
    };
    
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues : initialValues,
        validationSchema : addProductSchema,
        onSubmit : async (values) => {
            let response = await fetch("http://localhost:8080/api/products",{
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "*/*",
                    Authorization : "Bearer " + JSON.parse(token)
                },
                body: JSON.stringify({
                    name : values.name,
                    category: values.category,
                    manufacturer: values.manufacturer,
                    availableItems: values.availableItem, 
                    price: values.price,
                    imageUrl: values.imageUrl,
                    description: values.description
                })
            });
            response = await response.json();
            setMessage(response.message);
            console.log(response);
            
        }

    });
    return (
        <div className='mt-4em h-100 align-items-center justify-content-center d-flex'>
            <div className='min-container'>
                <div>{message}</div>
                <Box  component='form' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <TextField variant="outlined" size="medium" label="Name *" name='name' fullWidth value={values.name} onChange={handleChange} onBlur={handleBlur}  className={errors.name && touched.name ? 'error' : ''}  />
                    </div>
                    <div className='mb-4'>
                        <FormControl fullWidth>
                            <InputLabel id="category">Category</InputLabel>
                            <Select
                                labelId="category"
                                id="demo-simple-select"
                                name='category'
                                value={values.category} onChange={handleChange} onBlur={handleBlur}  className={errors.category && touched.category ? 'error' : ''}
                                label="Category"
                                >
                                <MenuItem value={'Apparel'}>Apparel</MenuItem>
                                <MenuItem value={'Electronic'}>Electronic</MenuItem>
                                <MenuItem value={'Personal Care'}>Personal Care</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='mb-4'>
                        <TextField variant="outlined" size="medium" label="Manufacturer *" name='manufacturer' fullWidth value={values.manufacturer} onChange={handleChange} onBlur={handleBlur} className={errors.manufacturer && touched.manufacturer ? 'error' : ''} />
                    </div>
                    <div className='mb-4'>
                        <TextField  variant="outlined" size="medium" label="Available Item *" name='availableItem' fullWidth value={values.password} onChange={handleChange} onBlur={handleBlur} className={errors.availableItem && touched.availableItem ? 'error' : ''} />
                    </div>
                    <div className='mb-4'>
                        <TextField  variant="outlined" size="medium" label="Price *" name='price' fullWidth value={values.price} onChange={handleChange} onBlur={handleBlur}  className={errors.price && touched.price ? 'error' : ''}/>
                    </div>
                    <div className='mb-4'>
                        <TextField  variant="outlined" size="medium" label="Image Url" name='imageUrl' fullWidth onChange={handleChange} onBlur={handleBlur}  className={errors.imageUrl && touched.imageUrl ? 'error' : ''} />
                    </div>
                    <div className='mb-4'>
                        <TextField  variant="outlined" size="medium" label="Product Description" name='description' fullWidth onChange={handleChange} onBlur={handleBlur} />
                    </div>
                    <div className='mb-4'>
                        <Button variant='contained' color='primary' type='submit' fullWidth disableElevation>Add Product</Button>
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default AddProduct;