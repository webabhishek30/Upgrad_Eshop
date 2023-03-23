import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Grid, TextField } from "@material-ui/core";

let token = window.sessionStorage.getItem("userDetail");

const ProductDetails = ({setQuantity}) => {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [prevQuantity, setprevQuantity] = useState(0);
    const [currentQuantity, setCurrentQuantity] = useState(prevQuantity);
    let navigate = useNavigate();

    useEffect(() => {
        async function product() {
        try {
            let response = await fetch(`http://localhost:8080/api/products/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "Application/json",
                Accept: "*/*",
            },
            });
            response = await response.json();
            setProductDetail(response);
        } catch (error) {
            alert(error.message);
        }
        }
        product();
    }, []);

    console.log(productDetail);

    const handleChange = (e) => {
        setprevQuantity(e.target.value);
    };
    useEffect(() => {
        setCurrentQuantity(prevQuantity);
    })

    const placeOrder = () => {
        if (token != null) {
        navigate("/placeOrder");
        console.log(currentQuantity);
        setQuantity = currentQuantity;
        console.log(`setQuantity : ${setQuantity}` );
        } else {
        navigate("/login");
        }
    };

    return (
        <>
            <div className="mt-6em">
                <div className="container">
                <Grid container spacing={10}>
                    <Grid item xs={4}>
                    <div className="pl-3 pr-3">
                        <img
                        src={productDetail.imageUrl}
                        alt={productDetail.description}
                        style={{ maxWidth: "100%" }}
                        />
                    </div>
                    </Grid>
                    <Grid item xs={6}>
                    <h3>
                        {productDetail.name} Available Stocks :{" "}
                        {productDetail.availableItems}
                    </h3>
                    <small>Category: {productDetail.category}</small>
                    <p>{productDetail.description}</p>
                    <h3>₹ {productDetail.price}</h3>
                    <div className="mb-3">
                        <TextField
                        fullWidth
                        name="productQuantity"
                        variant="outlined"
                        size="medium"
                        label="Enter Quantity"
                        onChange={(e) => handleChange(e)}
                        value={prevQuantity}
                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={placeOrder}
                        value={currentQuantity}
                    >
                        Place Order
                    </Button>
                    </Grid>
                </Grid>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
