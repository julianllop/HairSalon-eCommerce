import React from "react";
import axios from "axios";
import { Button, Box, useMediaQuery } from "@mui/material";

const CheckOutProducts = ({ products, userId, productsToCheckout, cartId }) => {
    const data = {
        productsToCheckout,
        userId,
        cartId,
    };

    const isSmallScreen = useMediaQuery("(max-width:450px)");
    const isVerticalScreen = useMediaQuery("(max-width:1100px)");

    const handleClick = async () => {
        try {
            const productIds = products?.map((product) => product?.id);

            const response = await axios.post(
                "http://localhost:3001/shoppingCart/checkoutAll",
                { data }
            );

            console.log(response.data);

            // Comprobar si la respuesta contiene la URL esperada
            if (response.data && response.data.url) {
                window.location.href = response.data.url;
                localStorage.setItem("productIds", JSON.stringify(productIds));
            } else {
                console.error(
                    "La respuesta del servidor no contiene una URL válida."
                );
            }
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
        }
    };

    return (
        <Box
            sx={{
                minWidth: "100%",
            }}
        >
            <Button
                disabled={!productsToCheckout?.length}
                variant="contained"
                sx={{
                    minWidth: "90%",
                    height: "50px",
                    fontSize: "clamp(15px, 4vw, 1.2rem)",

                    ...(isSmallScreen && {
                        padding: 0,
                        height: "30px",
                    }),
                }}
                onClick={handleClick}
            >
                Pay Now
            </Button>
        </Box>
    );
};

export default CheckOutProducts;
