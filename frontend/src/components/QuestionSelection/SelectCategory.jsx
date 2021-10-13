import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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
    console.log(categories);

    return (
        <div>
            <h2>Please select the category that you want to practice on</h2>
            {categoryArray}
        </div>
    );
};

export default SelectCategory;
