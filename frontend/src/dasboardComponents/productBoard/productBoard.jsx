import React, { useEffect, useState } from "react";
import ProductForm from "../productForm/productForm";
import {
    Box,
    Fade,
    Modal,
    Button,
    Typography,
    Backdrop,
    useMediaQuery,
    MenuItem,
    FormControl,
    styled,
    TextField,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import DashboardProduct from "../products/dashboardProduct";
import style from "./productBoard.module.css";
import { getProducts } from "../../redux/actions/productActions";
import SearchBar from "../../Components/searchBar/searchBar";
import Pagination from "../../Components/pagination/pagination";

const ProductBoard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const products = useSelector((state) => state.products);

    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [orderBy, setOrderBy] = useState("");
    const [create, setCreate] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const isVerticalScreen = useMediaQuery("(max-width:1000px)");
    const isSmallScreen = useMediaQuery("(max-width:630px)");
    const isPhoneScreen = useMediaQuery("(max-width:400px)");

    useEffect(() => {
        dispatch(getProducts(selectedCategories, orderBy))
            .then(() => setLoading(false))
            .catch((error) => {
                console.error("Error getting products:", error);
                setLoading(false);
            });
    }, [dispatch, selectedCategories, orderBy]);

    const currentProducts =
        products &&
        products.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10);

    const [category, setCategory] = React.useState({
        shampoo: false,
        conditioner: false,
        hairAndScalpOils: false,
        hairColor: false,
        hairTreatments: false,
    });

    const handleChange = (event) => {
        const categoryName = event.target.name;
        const isChecked = event.target.checked;

        setCategory((prevCategory) => ({
            ...prevCategory,
            [categoryName]: isChecked,
        }));

        if (isChecked) {
            setSelectedCategories([...selectedCategories, categoryName]);
            setCurrentPage(1);
        } else {
            const updatedCategories = selectedCategories.filter(
                (category) => category !== categoryName
            );
            setSelectedCategories(updatedCategories);
            setCurrentPage(1);
        }
    };

    const handleClearFilters = () => {
        setCategory({
            shampoo: false,
            conditioner: false,
            hairAndScalpOils: false,
            hairColor: false,
            hairTreatments: false,
        });
        setSelectedCategories([]);
        setOrderBy("");
    };

    const {
        shampoo,
        conditioner,
        hairAndScalpOils,
        hairColor,
        hairTreatments,
    } = category;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "stretch",
                minWidth: "100%",
                height: "fit-content",
                overflowX: "hidden",
                paddingTop: location.pathname.startsWith("/dashboard")
                    ? "2.5rem"
                    : "0",
                paddingBottom: "2rem",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    // height: "100%",
                }}
            >
                {location.pathname.startsWith("/dashboard") && (
                    <Typography
                        sx={{
                            fontSize: "clamp(25px, 4vw, 3rem)",
                            fontWeight: "700",
                            background:
                                "linear-gradient(90deg, rgb(165, 54, 91) 0%, rgb(255, 193, 212)  100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Manage your products
                    </Typography>
                )}

                {!create ? (
                    <div className={style.addButton}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "50px",
                                minWidth: "100%",
                                flexDirection: isVerticalScreen
                                    ? "column"
                                    : "row",
                                // flexDirection: "row",
                            }}
                        >
                            <SearchBar />
                            {location.pathname.startsWith("/dashboard") && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: isVerticalScreen
                                            ? "flex-end"
                                            : "center",
                                        gap: "20px",
                                        // minWidth: "90%",

                                        ...(isVerticalScreen && {
                                            minWidth: "90%",
                                        }),

                                        ...(isSmallScreen && {
                                            minWidth: "80vw",
                                        }),
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            // minWidth: "40%"
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "#2e7d32",
                                                fontWeight: 700,
                                                padding: 0,
                                                margin: 0,
                                                fontSize:
                                                    "clamp(15px, 3vw, 1.2rem)",
                                            }}
                                        >
                                            ADD NEW
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: "#2e7d32",
                                                fontWeight: 700,
                                                padding: 0,
                                                margin: 0,
                                                fontSize:
                                                    "clamp(15px, 3vw, 1.2rem)",
                                            }}
                                        >
                                            PRODUCT
                                        </Typography>
                                    </Box>
                                    <Button
                                        onClick={() =>
                                            navigate(
                                                "/dashboard/products/create"
                                            )
                                        }
                                        sx={{
                                            borderRadius: "10px",
                                            height: "70px",
                                            minWidth: "70px",
                                            padding: 0,
                                            backgroundColor: "#2e7d3225",
                                            color: "#2e7d32",

                                            // ...(isVerticalScreen && {
                                            //     minWidth: "90%",
                                            // }),

                                            ...(isSmallScreen && {
                                                height: "50px",
                                                minWidth: "50px",
                                            }),

                                            "&:hover": {
                                                backgroundColor: "#2e7d3225",
                                                opacity: "0.8",
                                            },
                                        }}
                                    >
                                        <AddIcon
                                            color="success"
                                            sx={{
                                                margin: 0,
                                                padding: 0,
                                                fontSize:
                                                    "clamp(2rem, 4vw, 3rem)",
                                            }}
                                        />
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </div>
                ) : (
                    ""
                )}

                {create ? (
                    <ProductForm />
                ) : loading ? (
                    "loading"
                ) : (
                    <Box ////////////////////
                        sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "start",
                            minWidth: "100%",

                            ...(isVerticalScreen && {
                                flexDirection: "column",
                                alignItems: "center",
                            }),
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                                minWidth: "10%",

                                ...(isVerticalScreen && {
                                    minWidth: "80vw",
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    marginBottom: "2rem",
                                }),

                                ...(isSmallScreen && {
                                    minWidth: "80vw",
                                    justifyContent: "space-around",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    marginBottom: "2rem",
                                }),
                            }}
                        >
                            {isVerticalScreen ? (
                                <FormControl
                                    sx={{
                                        minWidth: "33.3333%",

                                        ...(isSmallScreen && {
                                            minWidth: "100%",
                                        }),
                                    }}
                                >
                                    <TextField
                                        labelid="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        // autowidth
                                        label="Choose category"
                                        select
                                        value={orderBy}
                                        onChange={(e) =>
                                            setOrderBy(e.target.value)
                                        }
                                        sx={{
                                            "& label.Mui-focused": {
                                                color: "rgb(165, 54, 91)",
                                            },
                                            "& .MuiInput-underline:after": {
                                                borderBottomColor:
                                                    "rgb(165, 54, 91)",
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": {
                                                    borderColor:
                                                        "rgb(165, 54, 91)",
                                                },
                                                "&:hover fieldset": {
                                                    borderColor:
                                                        "rgb(165, 54, 91)",
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor:
                                                        "rgb(165, 54, 91)",
                                                },
                                            },
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            category.shampoo
                                                        }
                                                        onChange={handleChange}
                                                        name="shampoo"
                                                    />
                                                }
                                                label="Shampoo"
                                            />
                                        </MenuItem>
                                        <MenuItem>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            category.conditioner
                                                        }
                                                        onChange={handleChange}
                                                        name="conditioner"
                                                    />
                                                }
                                                label="Conditioner"
                                            />
                                        </MenuItem>
                                        <MenuItem>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            category.hairAndScalpOils
                                                        }
                                                        onChange={handleChange}
                                                        name="hairAndScalpOils"
                                                    />
                                                }
                                                label="Hair & scalp oils"
                                            />
                                        </MenuItem>
                                        <MenuItem>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            category.hairColor
                                                        }
                                                        onChange={handleChange}
                                                        name="hairColor"
                                                    />
                                                }
                                                label="Hair color"
                                            />
                                        </MenuItem>
                                        <MenuItem>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            category.hairTreatments
                                                        }
                                                        onChange={handleChange}
                                                        name="hairTreatments"
                                                    />
                                                }
                                                label="Hair treatments"
                                            />
                                        </MenuItem>
                                    </TextField>
                                </FormControl>
                            ) : (
                                <FormControl
                                    sx={{
                                        ...(isVerticalScreen && {
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }),
                                    }}
                                    component="fieldset"
                                    variant="standard"
                                >
                                    <FormLabel component="legend">
                                        Choose category
                                    </FormLabel>
                                    <FormGroup
                                        sx={{
                                            ...(isVerticalScreen && {
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }),
                                        }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={category.shampoo}
                                                    onChange={handleChange}
                                                    name="shampoo"
                                                />
                                            }
                                            label="Shampoo"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={
                                                        category.conditioner
                                                    }
                                                    onChange={handleChange}
                                                    name="conditioner"
                                                />
                                            }
                                            label="Conditioner"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={
                                                        category.hairAndScalpOils
                                                    }
                                                    onChange={handleChange}
                                                    name="hairAndScalpOils"
                                                />
                                            }
                                            label="Hair & scalp oils"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={category.hairColor}
                                                    onChange={handleChange}
                                                    name="hairColor"
                                                />
                                            }
                                            label="Hair color"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={
                                                        category.hairTreatments
                                                    }
                                                    onChange={handleChange}
                                                    name="hairTreatments"
                                                />
                                            }
                                            label="Hair treatments"
                                        />
                                    </FormGroup>
                                </FormControl>
                            )}

                            <FormControl
                                sx={{
                                    minWidth: "33.3333%",

                                    ...(isSmallScreen && {
                                        minWidth: "100%",
                                    }),
                                }}
                            >
                                <TextField
                                    labelid="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    // autowidth
                                    label="Order products"
                                    select
                                    value={orderBy}
                                    onChange={(e) => setOrderBy(e.target.value)}
                                    sx={{
                                        "& label.Mui-focused": {
                                            color: "rgb(165, 54, 91)",
                                        },
                                        "& .MuiInput-underline:after": {
                                            borderBottomColor:
                                                "rgb(165, 54, 91)",
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
                                    <MenuItem value={"A-Z"}>A-Z</MenuItem>
                                    <MenuItem value={"Z-A"}>Z-A</MenuItem>
                                    <MenuItem value={"Lower"}>
                                        Lower price
                                    </MenuItem>
                                    <MenuItem value={"Higher"}>
                                        Higher price
                                    </MenuItem>
                                </TextField>
                            </FormControl>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleClearFilters}
                                sx={{
                                    border: "solid 1px rgb(165, 54, 91)",
                                    color: "rgb(165, 54, 91)",
                                    height: "56px",
                                    "&:hover": {
                                        border: "solid 1px rgb(165, 54, 91)",
                                        color: "rgb(165, 54, 91)",
                                    },

                                    ...(isVerticalScreen && {
                                        minWidth: "33.3333%",
                                    }),

                                    ...(isSmallScreen && {
                                        minWidth: "100%",
                                    }),
                                }}
                            >
                                Clear Filters
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                minWidth: "80%",
                                // gap: 4,
                            }}
                        >
                            <Box className={style.clientContainer}>
                                {Array.isArray(products) &&
                                    (currentProducts.length > 0 ? (
                                        currentProducts?.map((product) => (
                                            <div
                                                key={product.id}
                                                className={
                                                    style.productContainerClient
                                                }
                                            >
                                                {location.pathname.startsWith(
                                                    "/dashboard"
                                                ) ? (
                                                    <DashboardProduct
                                                        id={product.id}
                                                        title={product.title}
                                                        image={product.image}
                                                        description={
                                                            product.description
                                                        }
                                                        price={product.price}
                                                        category={
                                                            product.category
                                                        }
                                                        isActive={
                                                            product.isActive
                                                        }
                                                    />
                                                ) : (
                                                    <Button
                                                        sx={{
                                                            borderRadius:
                                                                "10px",
                                                            padding:
                                                                "20px 0px 20px 0px",
                                                            backgroundColor:
                                                                "white",
                                                            boxShadow:
                                                                "0 2px 5px rgba(0, 0, 0, 0.07)",

                                                            ...(isPhoneScreen && {
                                                                padding: 0,
                                                            }),
                                                        }}
                                                        disabled={
                                                            !product.isActive
                                                        }
                                                        onClick={() =>
                                                            navigate(
                                                                `/products/${product.id}`
                                                            )
                                                        }
                                                    >
                                                        <DashboardProduct
                                                            id={product.id}
                                                            title={
                                                                product.title
                                                            }
                                                            image={
                                                                product.image
                                                            }
                                                            description={
                                                                product.description
                                                            }
                                                            price={
                                                                product.price
                                                            }
                                                            category={
                                                                product.category
                                                            }
                                                            isActive={
                                                                product.isActive
                                                            }
                                                        />
                                                    </Button>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                minWidth: "100%",
                                                height: "100%",
                                                // backgroundColor: "#e3e3e35b",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    fontSize: "3rem",
                                                    fontWeight: "700",
                                                    color: "gray",
                                                    minWidth: "40%",
                                                    height: "15%",
                                                    borderRadius: "10px",
                                                    backgroundColor:
                                                        "#cacaca5b",
                                                }}
                                            >
                                                No products to show
                                            </Typography>
                                        </Box>
                                    ))}
                            </Box>
                            <Pagination
                                currentPage={currentPage}
                                allProducts={products ? products.length : 0}
                                paginate={setCurrentPage}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ProductBoard;
