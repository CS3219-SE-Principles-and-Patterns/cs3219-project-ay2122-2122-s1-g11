import React from "react";
import Button from "@material-ui/core/Button";

const SelectDifficulty = ({ onSelect }) => {
    return (
        <div>
            <Button variant="outlined" onClick={onSelect} value="easy">
                Easy
            </Button>
            <Button variant="outlined" color="primary" onClick={onSelect} value="medium">
                Medium
            </Button>
            <Button variant="outlined" color="secondary" onClick={onSelect} value="hard">
                Hard
            </Button>
        </div>
    );
};

export default SelectDifficulty;
