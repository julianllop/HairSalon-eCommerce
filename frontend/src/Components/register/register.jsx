import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "./validateRegister";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
    Card,
    Typography,
    CardContent,
    TextField,
    Button,
    Box,
} from "@mui/material";
import style from "./register.module.css";
import { createUser } from "../../redux/actions/userActions";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const firstInputRef = useRef(null);

    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    const users = useSelector((state) => state.users);

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        passwordX2: "",
    });

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        passwordX2: "",
    });

    const handleInputChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setForm({ ...form, [property]: value });

        setErrors(
            validate({
                ...form,
                [property]: value,
            })
        );

        // console.log("errors: ", errors);
    };

    // const hasErrors = Object.values(errors).some((error) => error !== "");

    function handleSubmit(event) {
        event.preventDefault();

        let { username, email, password } = form;

        dispatch(createUser({ username, email, password }));

        console.log();
        setForm({
            username: "",
            email: "",
            password: "",
            passwordX2: "",
        });

        console.log(form);
        console.log("errors: ", errors);

        setTimeout(() => {
            navigate("/");
        }, 1000);
    }

    const isSmallScreen = useMediaQuery("(max-width:550px)");
    const isMediumScreen = useMediaQuery("(min-width:650px)");

    return (
        <div className={style.formContainer}>
            <Box
                sx={{
                    minWidth: "100%",
                    padding: "2rem",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "0px 1px 2px  rgba(0, 0, 0, 0.318)",

                    ...(isSmallScreen && { padding: "1rem" }),
                }}
            >
                <Typography
                    sx={{
                        fontSize: "clamp(1px, 12vw, 2.5rem)",
                        fontWeight: "700",
                        background:
                            "linear-gradient(90deg, rgba(140,214,255,1) 0%, rgb(25,118,210) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Sign Up
                </Typography>
                <CardContent
                    sx={{
                        minWidth: "100%",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <form className={style.form} onSubmit={handleSubmit}>
                        <Box
                            sx={{
                                minWidth: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "start",
                                gap: "5px",
                            }}
                        >
                            <TextField
                                required
                                variant="filled"
                                label="username"
                                className={style.input}
                                onChange={handleInputChange}
                                name="username"
                                value={form.username}
                                inputRef={firstInputRef}
                                sx={{
                                    minWidth: "100%",
                                    ...(isSmallScreen && {}),
                                }}
                            />
                            {errors.username && (
                                <p className={style.error}>{errors.username}</p>
                            )}
                        </Box>
                        <Box
                            sx={{
                                minWidth: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "start",
                                gap: "5px",
                            }}
                        >
                            <TextField
                                required
                                variant="filled"
                                label="email"
                                className={style.input}
                                onChange={handleInputChange}
                                name="email"
                                value={form.email}
                                sx={{
                                    minWidth: "100%",
                                    ...(isSmallScreen && {}),
                                }}
                            />
                            {errors.email && (
                                <p className={style.error}>{errors.email}</p>
                            )}
                        </Box>

                        <Box
                            sx={{
                                minWidth: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "start",
                                gap: "5px",
                            }}
                        >
                            <TextField
                                required
                                type="password"
                                variant="filled"
                                label="password"
                                rows={4}
                                className={style.input}
                                onChange={handleInputChange}
                                name="password"
                                value={form.password}
                                sx={{
                                    minWidth: "100%",
                                    ...(isSmallScreen && {}),
                                }}
                            />
                            {errors.password && (
                                <p className={style.error}>{errors.password}</p>
                            )}
                        </Box>
                        <Box
                            sx={{
                                minWidth: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "start",
                                gap: "5px",
                            }}
                        >
                            <TextField
                                required
                                type="password"
                                variant="filled"
                                label="repeat password"
                                rows={4}
                                className={style.input}
                                onChange={handleInputChange}
                                name="passwordX2"
                                value={form.passwordX2}
                                sx={{
                                    minWidth: "100%",
                                    ...(isSmallScreen && {}),
                                }}
                            />
                            {errors.passwordX2 && (
                                <p className={style.error}>
                                    {errors.passwordX2}
                                </p>
                            )}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                minWidth: "100%",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    margin: 0,
                                    padding: 0,

                                    ...(isMediumScreen && {
                                        fontSize: "13px",
                                    }),
                                }}
                            >
                                Already have an account?
                            </Typography>
                            <Link className={style.link} to={"/login"}>
                                Login
                            </Link>
                        </Box>
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            // disabled={hasErrors}
                        >
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
            </Box>
        </div>
    );
};

export default Register;
