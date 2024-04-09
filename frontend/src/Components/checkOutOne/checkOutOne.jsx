import React from "react";
import axios from "axios";
import { Button, Box } from "@mui/material";

const CheckOutOne = ({ id, title, quantity, userId, price, cartId }) => {
    const data = {
        productsToCheckout: [
            {
                id,
                title,
                quantity,
                price,
            },
        ],

        userId,
        cartId,
    };

    console.log(data);

    const handleClick = async () => {
        const url = await axios.post(
            "http://localhost:3001/shoppingCart/checkoutAll",
            { data }
        );
        console.log(url.data);
        window.location.href = url.data.url;
    };

    return (
        <Button
            onClick={handleClick}
            sx={{
                padding: 0,
                minWidth: "fit-content",
                backgroundColor: "transparent",
                fontSize: "clamp(10px, 4vw, 0.9rem)",
                "&:hover": {
                    backgroundColor: "transparent",
                },
            }}
        >
            Buy Now
        </Button>
    );
};

export default CheckOutOne;
