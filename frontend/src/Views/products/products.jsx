import React from "react";
import ProductBoard from "../../dasboardComponents/productBoard/productBoard";
import style from './products.module.css'

const Products = () => {
    return (
        <div className={style.products}>
            <ProductBoard />
        </div>
    );
};

export default Products;
