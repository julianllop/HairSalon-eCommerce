import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "./loginValidation";
import { login } from "../../redux/actions/userActions";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
    Card,
    Typography,
    CardContent,
    TextField,
    Button,
    Box,
    FormControl,
    InputLabel,
    FilledInput,
    InputAdornment,
    IconButton,
} from "@mui/material";
import style from "./login.module.css";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const firstInputRef = useRef(null);

    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const [form, setForm] = useState({
        email: "",
        password: "",
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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const { email, password } = form;

        if (email && password) {
            try {
                const user = dispatch(login({ email, password }));

                if (user) {
                    setForm({
                        email: "",
                        password: "",
                    });

                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                }
            } catch (error) {
                console.error("Error logging in:", error);
            }
        }
    };

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
                    Sign In
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
                            }}
                        >
                            <TextField
                                required
                                fullWidth
                                variant="filled"
                                label="email"
                                className={style.input}
                                onChange={handleInputChange}
                                name="email"
                                value={form.email}
                                inputRef={firstInputRef}
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
                            }}
                        >
                            <FormControl fullWidth variant="filled" required>
                                <InputLabel htmlFor="outlined-adornment-password">
                                    password
                                </InputLabel>
                                <FilledInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? "text" : "password"}
                                    onChange={handleInputChange}
                                    name="password"
                                    value={form.password}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            {errors.password && (
                                <Box
                                    sx={{
                                        minWidth: "100%",
                                    }}
                                >
                                    <p className={style.error}>
                                        {errors.password}
                                    </p>
                                </Box>
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
                                Don't have an account yet?
                            </Typography>
                            <Link className={style.link} to={"/register"}>
                                Sign Up
                            </Link>
                        </Box>
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            // disabled={hasErrors}
                        >
                            Sign In
                        </Button>
                    </form>
                </CardContent>
            </Box>
        </div>
    );
};

export default Login;
