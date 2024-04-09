import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/navBar/navBar";
import Landing from "./Views/landing";
import Products from "./Views/products/products";
import ShoppingCart from "./Views/shoppingCart";
import Profile from "./Views/profile/profile";
import Appointments from "./Views/appointments";
import Detail from "./Views/detail";
import Login from "./Components/login/login";
import Register from "./Components/register/register";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { getUserByToken } from "./redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import DashboardNavBar from "./dasboardComponents/dashboardNavBar/dashboardNavBar";
import UserAppointments from "./dasboardComponents/appointments/userAppointments";
import ProductBoard from "./dasboardComponents/productBoard/productBoard";
import ProductForm from "./dasboardComponents/productForm/productForm";
import EditAppointment from "./dasboardComponents/editAppointment/editAppointment";
import ProductDetail from "./Components/productDetail/productDetail";
import CheckOutProducts from "./Views/checkOutProducts/checkOutProducts";
import UserOrders from "./Components/userOrders/userOrders";
import MyAppointments from "./Components/userAppointments/myAppointments";
import Purchases from "./dasboardComponents/purchases/purchases";
import BackToTop from "./Components/backToTop/backToTop";

axios.defaults.baseURL = "http://localhost:3001";

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.userByToken);

    const checkAuth = async () => {
        try {
            const cookie = document.cookie
                .split(";")
                .find((cookie) => cookie.trim().startsWith("jwt="));
            const jwtCookie = cookie?.substring(4);
            const decodedUser = await dispatch(getUserByToken(jwtCookie));
            return decodedUser;
        } catch (error) {
            console.error("User not found:", error);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const jwtCookie = document.cookie
                    .split(";")
                    .find((cookie) => cookie.trim().startsWith("jwt="));

                if (
                    !jwtCookie &&
                    location.pathname !== "/login" &&
                    location.pathname !== "/register"
                ) {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Auth error:", error);
            }
        };

        checkAuth();
    }, [navigate, location.pathname]);

    return (
        <div
            className={
                location.pathname.startsWith("/products") ? "products" : "App"
            }
        >
            <BackToTop />
            {location.pathname.startsWith("/dashboard") ? (
                <DashboardNavBar />
            ) : (
                <NavBar user={user} />
            )}

            <Routes>
                <Route exact path="/products" element={<Products />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/" element={<Appointments />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route
                    exact
                    path="/profile/appointments"
                    element={<MyAppointments />}
                />
                <Route exact path="/profile/orders" element={<UserOrders />} />
                <Route
                    exact
                    path="/products/:id"
                    element={<ProductDetail user={user && user.id} />}
                />
                <Route
                    exact
                    path="/shoppingCart"
                    element={<ShoppingCart user={user} />}
                />
                <Route
                    exact
                    path="/dashboard/appointments"
                    element={<UserAppointments />}
                />
                <Route
                    exact
                    path="/dashboard/appointments/edit"
                    element={<EditAppointment />}
                />
                <Route
                    exact
                    path="/dashboard/products"
                    element={<ProductBoard />}
                />
                <Route
                    exact
                    path="/dashboard/products/create"
                    element={<ProductForm />}
                />
                <Route
                    exact
                    path="/dashboard/products/:id"
                    element={<ProductForm />}
                />
                <Route
                    exact
                    path="/dashboard/purchase"
                    element={<Purchases />}
                />
                <Route exact path="/checkout" element={<CheckOutProducts />} />
            </Routes>
        </div>
    );
}

export default App;
