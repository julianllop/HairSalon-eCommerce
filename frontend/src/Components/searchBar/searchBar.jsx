import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions/productActions";
import style from "./searchBar.module.css";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Divider, InputBase, Paper, useMediaQuery } from "@mui/material";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [title, setName] = useState("");
    const [input, setInput] = useState(title);

    const isSmallScreen = useMediaQuery("(max-width:350px)");

    function handleInputChange(event) {
        setInput(setName(event.target.value));
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getByName(title));
        setInput("");
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit(event);
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "start",
                alignContent: "center",
                minWidth: "40%",
                // paddingRight: "10px",
                ...(isSmallScreen && {
                    padding: 0,
                }),
            }}
        >
            <Paper
                component="form"
                sx={{
                    background: "transparent",
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    minWidth: "100%",
                    height: "50px",
                    border: "solid 1px rgb(165, 54, 91)",
                    borderRadius: "50px",
                    paddingLeft: "10px",

                    ...(isSmallScreen && {
                        minWidth: "30%",
                    }),
                }}
            >
                <InputBase
                    sx={{
                        ml: 1,
                        flex: 1,
                        color: "rgb(165, 54, 91)",
                        fontSize: "clamp(15px, 4vw, 1rem)",
                    }}
                    variant="standard"
                    placeholder="Search:"
                    color="primary"
                    inputProps={{ "aria-label": "search a product" }}
                    onChange={handleInputChange}
                    value={input}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                    component="button"
                    type="submit"
                    sx={{ p: "10px", color: "rgb(165, 54, 91)" }}
                    aria-label="search"
                    onClick={handleSubmit}
                    onKeyPress={handleKeyPress}
                >
                    <SearchIcon
                    // sx={{
                    //     fontSize: "clamp(15px, 4vw, 1rem)",
                    // }}
                    />
                </IconButton>
            </Paper>
        </Box>
    );
}
