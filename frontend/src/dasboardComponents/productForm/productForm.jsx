import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Typography,
    useMediaQuery,
    MenuItem,
    FormControl,
    styled,
    TextField,
} from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import styles from "./productForm.module.css";
import { validate } from "./validateProduct";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
    createProduct,
    getProduct,
    updateProduct,
} from "../../redux/actions/productActions";

const ProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const [editing, setEditing] = useState(false);

    const firstInputRef = useRef(null);

    const loadProduct = async (id) => {
        try {
            const productToEdit = await dispatch(getProduct(id));

            if (productToEdit && productToEdit.payload) {
                const updatedProduct = productToEdit.payload;
                const { title, image, description, price, category, isActive } =
                    updatedProduct;

                setForm({
                    title: title || "",
                    description: description || "",
                    image: image || "",
                    price: price || "",
                    category: category || "",
                    isActive: isActive || "",
                });
                setEditing(true);
            } else {
                console.error("Product data is missing or undefined.");
            }
        } catch (error) {
            console.error("Error loading product:", error);
        }
    };

    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (params.id) {
            loadProduct(params.id);
        } else {
            setEditing(false);
            setForm({
                title: "",
                description: "",
                image: "",
                price: "",
                category: "",
                isActive: "",
            });
        }
    }, [params.id]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        image: "",
        price: "",
        category: "",
        isActive: "",
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        image: "",
        price: "",
        category: "",
        isActive: "",
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
    };

    const isSmallScreen = useMediaQuery("(max-width:400px)");
    const isMediumScreen = useMediaQuery("(max-width:550px)");

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transform: "translate(-50%, -50%)",
        width: isMediumScreen ? "60%" : "30%",
        borderRadius: "10px",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 2,
        outline: "none",
        gap: "15px",
    };

    const resetForm = () => {
        setForm({
            title: "",
            description: "",
            image: "",
            price: "",
            category: "",
            isActive: "",
        });
    };

    function handleSubmit(event) {
        event.preventDefault();

        let { title, image, description, price, category, isActive } = form;

        const taskData = {
            title,
            image,
            description,
            price,
            category,
            isActive,
        };

        editing
            ? dispatch(updateProduct(params.id, taskData))
            : dispatch(createProduct(taskData));

        // console.log({ title, image, description, price, category, isActive });

        resetForm();
        navigate("/dashboard/products");
    }
    return (
        <div>
            <Box
                sx={{
                    minWidth: "100%",
                    height: "80vh",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    flexDirection: "column",
                    marginTop: 10,
                }}
            >
                <Box sx={style}>
                    <Typography
                        id="transition-modal-title"
                        variant="h4"
                        component="h2"
                        sx={{
                            // fontSize: "25px",
                            fontWeight: "700",
                            background:
                                "linear-gradient(90deg, rgb(165, 54, 91) 0%, rgb(255, 218, 230)  100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",

                            ...(isSmallScreen && {
                                fontSize: "20px",
                            }),
                        }}
                    >
                        {editing ? "Update product" : "Create new product"}
                    </Typography>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <Box
                            sx={{
                                minWidth: "100%",
                            }}
                        >
                            <TextField
                                label="Title"
                                id="custom-css-outlined-input"
                                name="title"
                                value={form.title}
                                inputRef={firstInputRef}
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
                            {errors.title && (
                                <Typography className={styles.error}>
                                    {errors.title}
                                </Typography>
                            )}
                        </Box>
                        <Box
                            sx={{
                                minWidth: "100%",
                            }}
                        >
                            <TextField
                                label="Description"
                                id="custom-css-outlined-input"
                                name="description"
                                value={form.description}
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
                            {errors.description && (
                                <Typography className={styles.error}>
                                    {errors.description}
                                </Typography>
                            )}
                        </Box>
                        <Box
                            sx={{
                                minWidth: "100%",
                            }}
                        >
                            <TextField
                                label="Image"
                                id="custom-css-outlined-input"
                                type="text"
                                name="image"
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
                            {errors.image && (
                                <Typography className={styles.error}>
                                    {errors.image}
                                </Typography>
                            )}
                        </Box>
                        <Box
                            sx={{
                                minWidth: "100%",
                            }}
                        >
                            <TextField
                                label="Price"
                                id="custom-css-outlined-input"
                                name="price"
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
                            {errors.price && (
                                <Typography className={styles.error}>
                                    {errors.price}
                                </Typography>
                            )}
                        </Box>
                        <FormControl
                            sx={{
                                minWidth: "100%",
                            }}
                        >
                            <TextField
                                labelid="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                // autowidth
                                label="Category"
                                select
                                name="category"
                                value={form.category}
                                onChange={handleInputChange}
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
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
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"shampoo"}>Shampoo</MenuItem>
                                <MenuItem value={"conditioner"}>
                                    Conditioner
                                </MenuItem>
                                <MenuItem value={"hairAndScalpOils"}>
                                    Hair & scalp oils
                                </MenuItem>
                                <MenuItem value={"hairColor"}>
                                    Hair color
                                </MenuItem>
                                <MenuItem value={"hairTreatments"}>
                                    Hair treatments
                                </MenuItem>
                            </TextField>
                            {errors.category && (
                                <Typography className={styles.error}>
                                    {errors.category}
                                </Typography>
                            )}
                        </FormControl>
                        <FormControl
                            sx={{
                                minWidth: "100%",
                            }}
                        >
                            <TextField
                                labelid="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                // autowidth
                                label="Is active?"
                                select
                                name="isActive"
                                value={form.isActive}
                                onChange={handleInputChange}
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
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
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={true}>Active</MenuItem>
                                <MenuItem value={false}>Not active</MenuItem>
                            </TextField>
                            {errors.isActive && (
                                <Typography className={styles.error}>
                                    {errors.isActive}
                                </Typography>
                            )}
                        </FormControl>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                // minWidth: "300px",
                                gap: "40px",
                                marginTop: 3,
                                marginBottom: 1,
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
                                    onClick={() =>
                                        navigate("/dashboard/products")
                                    }
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
                    </form>
                </Box>
            </Box>
        </div>
    );
};

export default ProductForm;
