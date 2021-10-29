import React, { memo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import { withStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import "aos/dist/aos.css";

AOS.init({ once: true });

const styles = (theme) => ({
    wrapper: {
        backgroundColor: theme.palette.common.white,
        overflowX: "hidden",
    },
});

function NavBarManager(props) {
    const { classes } = props;
    const [selectedTab, setSelectedTab] = useState(null);
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

    const handleMobileDrawerOpen = useCallback(() => {
        setIsMobileDrawerOpen(true);
    }, [setIsMobileDrawerOpen]);

    const handleMobileDrawerClose = useCallback(() => {
        setIsMobileDrawerOpen(false);
    }, [setIsMobileDrawerOpen]);

    return (
        <div className={classes.wrapper}>
            <NavBar
                selectedTab={selectedTab}
                selectTab={setSelectedTab}
                mobileDrawerOpen={isMobileDrawerOpen}
                handleMobileDrawerOpen={handleMobileDrawerOpen}
                handleMobileDrawerClose={handleMobileDrawerClose}
            />
        </div>
    );
}

NavBarManager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(NavBarManager));
