import React from "react";
import Button from "@material-ui/core/Button";

const SelectCategory = ({ onSelect }) => {
    return (
        <div>
            <Button variant="outlined" onClick={onSelect} value="string">
                String
            </Button>
            <Button variant="outlined" color="primary" onClick={onSelect} value="array">
                Array
            </Button>
            <Button variant="outlined" color="secondary" onClick={onSelect} value="others">
                Others
            </Button>
        </div>
    );
};

export default SelectCategory;
