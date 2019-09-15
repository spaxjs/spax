import { Box, Container, IconButton, TextField, Typography } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { useHash } from "@spax/history";
import React, { useState } from "react";
export default function UI(props) {
    const [hash, setHash] = useHash();
    const [newKey, setNewKey] = useState("");
    const [newValue, setNewValue] = useState("");
    function handleAdd() {
        setHash({
            ...hash,
            [newKey]: newValue,
        });
        setNewKey("");
        setNewValue("");
    }
    return (React.createElement(Container, null,
        React.createElement(Typography, { variant: "h1" }, props.description),
        Object.entries(hash).map(([key, value]) => React.createElement(Box, { key: key },
            React.createElement(TextField, { label: key, value: value, onChange: (e) => setHash({
                    ...hash,
                    [key]: e.target.value,
                }) }),
            React.createElement(IconButton, { onClick: () => {
                    const { ...newHash } = hash;
                    delete newHash[key];
                    setHash(newHash);
                } },
                React.createElement(Remove, null)))),
        React.createElement(Box, null,
            React.createElement(TextField, { label: "Key", value: newKey, onChange: (e) => setNewKey(e.target.value) }),
            React.createElement(TextField, { label: "Value", value: newValue, onChange: (e) => setNewValue(e.target.value) }),
            React.createElement(IconButton, { disabled: !(newKey && newValue), onClick: handleAdd },
                React.createElement(Add, null)))));
}
