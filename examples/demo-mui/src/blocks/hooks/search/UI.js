import { Box, Container, IconButton, TextField, Typography } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { useSearch } from "@spax/history";
import React, { useState } from "react";
export default function UI(props) {
    const [search, setSearch] = useSearch();
    const [newKey, setNewKey] = useState("");
    const [newValue, setNewValue] = useState("");
    function handleAdd() {
        setSearch({
            ...search,
            [newKey]: newValue,
        });
        setNewKey("");
        setNewValue("");
    }
    return (React.createElement(Container, null,
        React.createElement(Typography, { variant: "h1" }, props.description),
        Object.entries(search).map(([key, value]) => React.createElement(Box, { key: key },
            React.createElement(TextField, { label: key, value: value, onChange: (e) => setSearch({
                    ...search,
                    [key]: e.target.value,
                }) }),
            React.createElement(IconButton, { onClick: () => {
                    const { ...newSearch } = search;
                    delete newSearch[key];
                    setSearch(newSearch);
                } },
                React.createElement(Remove, null)))),
        React.createElement(Box, null,
            React.createElement(TextField, { label: "Key", value: newKey, onChange: (e) => setNewKey(e.target.value) }),
            React.createElement(TextField, { label: "Value", value: newValue, onChange: (e) => setNewValue(e.target.value) }),
            React.createElement(IconButton, { disabled: !(newKey && newValue), onClick: handleAdd },
                React.createElement(Add, null)))));
}
