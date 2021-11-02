import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const SelectCategory = ({ onSelect, categories }) => {
    const useStyles = makeStyles((theme) => ({
        margin: {
            margin: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    const categoryArray = categories.map((data, i) => {
        let color = "";
        if (i % 3 === 1) color = "primary";
        else if (i % 3 === 2) color = "secondary";

        return (
            <Button
                key={i}
                variant="contained"
                size="large"
                color={color}
                onClick={onSelect}
                className={classes.margin}
            >
                {data.category}
            </Button>
        );
    });

    return (
        <div>
            <h2>Please select the category that you want to practice on</h2>
            {/* Shows loading if the categories length is still 0, show the categories button otherwise */}
            {categories.length === 0 ? <CircularProgress /> : categoryArray}
        </div>
    );
};

export default SelectCategory;
