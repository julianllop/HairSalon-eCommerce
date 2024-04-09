import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Typography,
    Avatar,
    useMediaQuery,
    MenuItem,
    FormControl,
    styled,
    TextField,
} from "@mui/material";
import style from "./profile.module.css";
import { validate } from "./profileValidate";
import { useNavigate } from "react-router-dom";
import { getUserByToken, updateUser } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "../../Components/editProfile/editProfile";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [editing, setEditing] = useState(false);
    const user = useSelector((state) => state.userByToken);

    const isPhone = useMediaQuery("(max-width:480px)");
    const isMediumScreen = useMediaQuery("(max-width:600px)");

    const firstLetter = user?.username && user.username[0].toUpperCase();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        passwordX2: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        passwordX2: "",
    });

    const checkAuth = async () => {
        try {
            setTimeout(async () => {
                const cookie = document.cookie
                    .split(";")
                    .find((cookie) => cookie.trim().startsWith("jwt="));
                const jwtCookie = cookie.substring(4);
                const decodedUser = await dispatch(getUserByToken(jwtCookie));
                return decodedUser;
            }, 100);
        } catch (error) {
            console.error("User not found:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await checkAuth();
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setForm({
                username: user.username,
                email: user.email,
                password: "",
                passwordX2: "",
            });
        }
    }, [user]);

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
    };

    const resetForm = () => {
        setForm({
            username: "",
            email: "",
            password: "",
            passwordX2: "",
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const id = user.id;
        let { username, email, password } = form;

        const taskData = {
            id,
            username,
            email,
            password,
        };

        if (taskData) {
            await dispatch(updateUser(taskData));
            await checkAuth(); // Actualiza los datos del usuario
            setEditing(false);
        }
        // resetForm();
        // navigate("/dashboard/products");
    };

    return (
        <Box
            sx={{
                minWidth: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                flexDirection: "column",
                marginTop: 10,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "50px",
                    minWidth: "30%",
                    boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.114)",
                    padding: "2rem",
                    borderRadius: "10px",

                    ...(isPhone && {
                        padding: "1rem",
                        minWidth: "80%",
                    }),

                    // ...(isMediumScreen && {
                    //     padding: "1rem",
                    //     minWidth: "80%",
                    // }),
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        minWidth: "100%",
                        gap: "20px",

                        ...(isPhone && {
                            gap: "10px",
                        }),
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "20px",

                            ...(isPhone && {
                                gap: "10px",
                            }),
                        }}
                    >
                        <Avatar
                            sx={{
                                minWidth: "60px",
                                height: "60px",
                                backgroundColor: "palevioletred",

                                ...(isPhone && {
                                    minWidth: "45px",
                                    height: "45px",
                                }),
                            }}
                        >
                            {firstLetter}
                        </Avatar>
                        <Typography
                            sx={{
                                fontSize: "clamp(15px, 4vw, 1.5rem)",
                                color: "rgb(165, 54, 91)",
                            }}
                        >
                            {user.username}
                        </Typography>
                    </Box>
                    <EditProfile setEditing={setEditing} email={user.email} />
                </Box>
                <form className={style.form} onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            minWidth: "100%",
                        }}
                    >
                        <TextField
                            label="Username"
                            id="custom-css-outlined-input"
                            name="username"
                            value={form.username}
                            onChange={handleInputChange}
                            inputProps={{ readOnly: !editing }}
                            sx={{
                                cursor: !editing ? "default" : "not-allowed",
                                minWidth: "100%",
                                "& label.Mui-focused": {
                                    color: "rgb(165, 54, 91)",
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottomColor: "rgb(165, 54, 91)",
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "rgb(165, 54, 91)",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "rgb(165, 54, 91)",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "rgb(165, 54, 91)",
                                    },
                                },
                            }}
                        />
                        {errors.username && (
                            <Typography
                                sx={{
                                    padding: 0,
                                    margin: 0,
                                    color: "crimson",
                                    textAlign: "start",
                                    textWrap: "wrap",
                                    fontSize: "clamp(10px, 3vw, 15px)",
                                    minWidth: "60%",
                                }}
                            >
                                {errors.username}
                            </Typography>
                        )}
                    </Box>
                    <Box
                        sx={{
                            minWidth: "100%",
                        }}
                    >
                        <TextField
                            label="Email"
                            id="custom-css-outlined-input"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            inputProps={{ readOnly: !editing }}
                            sx={{
                                minWidth: "100%",
                                "& label.Mui-focused": {
                                    color: "rgb(165, 54, 91)",
                                },
                                "& .MuiInput-underline:after": {
                                    borderBottomColor: "rgb(165, 54, 91)",
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "rgb(165, 54, 91)",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "rgb(165, 54, 91)",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "rgb(165, 54, 91)",
                                    },
                                },
                            }}
                        />
                        {errors.description && (
                            <Typography className={style.error}>
                                {errors.description}
                            </Typography>
                        )}
                    </Box>
                    {editing && (
                        <Box
                            sx={{
                                minWidth: "100%",
                            }}
                        >
                            <TextField
                                label="New password"
                                id="custom-css-outlined-input"
                                type="password"
                                name="password"
                                value={form.image}
                                onChange={handleInputChange}
                                sx={{
                                    minWidth: "100%",
                                    "& label.Mui-focused": {
                                        color: "rgb(165, 54, 91)",
                                    },
                                    "& .MuiInput-underline:after": {
                                        borderBottomColor: "rgb(165, 54, 91)",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "rgb(165, 54, 91)",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "rgb(165, 54, 91)",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "rgb(165, 54, 91)",
                                        },
                                    },
                                }}
                            />
                            {errors.password && (
                                <Typography
                                    sx={{
                                        padding: 0,
                                        margin: 0,
                                        color: "crimson",
                                        textAlign: "start",
                                        // textWrap: "wrap",
                                        fontSize: "clamp(10px, 3vw, 15px)",
                                        minWidth: "60%",
                                    }}
                                >
                                    {errors.password}
                                </Typography>
                            )}
                        </Box>
                    )}
                    {editing && (
                        <Box
                            sx={{
                                minWidth: "100%",
                            }}
                        >
                            <TextField
                                label="Confirm password"
                                id="custom-css-outlined-input"
                                type="password"
                                name="passwordX2"
                                value={form.price}
                                onChange={handleInputChange}
                                sx={{
                                    minWidth: "100%",
                                    "& label.Mui-focused": {
                                        color: "rgb(165, 54, 91)",
                                    },
                                    "& .MuiInput-underline:after": {
                                        borderBottomColor: "rgb(165, 54, 91)",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "rgb(165, 54, 91)",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "rgb(165, 54, 91)",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "rgb(165, 54, 91)",
                                        },
                                    },
                                }}
                            />
                            {errors.passwordX2 && (
                                <Typography
                                    sx={{
                                        padding: 0,
                                        margin: 0,
                                        color: "crimson",
                                        textAlign: "start",
                                        textWrap: "wrap",
                                        fontSize: "clamp(10px, 3vw, 15px)",
                                        minWidth: "60%",
                                    }}
                                >
                                    {errors.passwordX2}
                                </Typography>
                            )}
                        </Box>
                    )}
                    {editing && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                minWidth: "100%",
                                gap: "40px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    minWidth: "100%",
                                    gap: "10px",
                                }}
                            >
                                <Button
                                    color="error"
                                    variant="contained"
                                    onClick={() => setEditing(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="success"
                                    variant="contained"
                                    type="submit"
                                >
                                    Ok
                                </Button>
                            </Box>
                        </Box>
                    )}
                </form>
            </Box>
        </Box>
    );
};

export default Profile;
