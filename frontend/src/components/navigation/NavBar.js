import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Hidden,
    IconButton,
    withStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import NavigationDrawer from "./NavigationDrawer";
import { withRouter } from "react-router";
import axios from 'axios';

const styles = (theme) => ({
    appBar: {
        boxShadow: theme.shadows[6],
        backgroundColor: theme.palette.common.white,
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    menuButtonText: {
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.h6.fontWeight,
    },
    brandText: {
        fontFamily: "'Baloo Bhaijaan', cursive",
        fontWeight: 400,
    },
    noDecoration: {
        textDecoration: "none !important",
    },
});

function NavBar(props) {
    const {
        classes,
        handleMobileDrawerOpen,
        handleMobileDrawerClose,
        mobileDrawerOpen,
        selectedTab,
    } = props;

    const logoutUser = () => {
        axios.post("http://localhost:4000/api/auth/logout", {}, {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
          })
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        props.history.push("/");
    };

    const isUserLoggedIn = props.isAuthenticated();

    const menuItems = [
        {
            visibility: "public",
            link: "/",
            name: "Home",
            icon: <HomeIcon className="text-white" />,
        },
        {
            visibility: "public",
            link: "/register",
            name: "Register",
            icon: <HowToRegIcon className="text-white" />,
        },
        {
            visibility: "public",
            link: "/login",
            name: "Login",
            icon: <LockOpenIcon className="text-white" />,
        },
        {
            visibility: "private",
            link: "/selectquestion",
            name: "Question",
            icon: <QuestionAnswerIcon className="text-white" />,
        },
        {
            visibility: "private",
            onClick: logoutUser,
            name: "Logout",
            icon: <ExitToAppIcon className="text-white" />,
        },
    ];

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <div>
                        <Typography
                            variant="h4"
                            className={classes.brandText}
                            display="inline"
                            color="primary"
                        >
                            Peer
                        </Typography>
                        <Typography
                            variant="h4"
                            className={classes.brandText}
                            display="inline"
                            color="secondary"
                        >
                            Prep
                        </Typography>
                    </div>
                    <div>
                        <Hidden mdUp>
                            <IconButton
                                className={classes.menuButton}
                                onClick={handleMobileDrawerOpen}
                                aria-label="Open Navigation"
                            >
                                <MenuIcon color="primary" />
                            </IconButton>
                        </Hidden>
                        <Hidden smDown>
                            {menuItems.map((element) => {
                                if (!isUserLoggedIn && element.visibility === "private") {
                                    // Guard Clause for menu items that should be private to unlogged in user
                                    return <span />;
                                } else if (isUserLoggedIn && element.visibility === "public") {
                                    // Guard Clause for menu items that should not be shown to a logged in user
                                    return <span />;
                                }
                                if (element.link) {
                                    return (
                                        <Link
                                            key={element.name}
                                            to={element.link}
                                            className={classes.noDecoration}
                                            onClick={handleMobileDrawerClose}
                                        >
                                            <Button
                                                color="secondary"
                                                size="large"
                                                classes={{ text: classes.menuButtonText }}
                                            >
                                                {element.name}
                                            </Button>
                                        </Link>
                                    );
                                }
                                return (
                                    <Button
                                        color="secondary"
                                        size="large"
                                        onClick={element.onClick}
                                        classes={{ text: classes.menuButtonText }}
                                        key={element.name}
                                    >
                                        {element.name}
                                    </Button>
                                );
                            })}
                        </Hidden>
                    </div>
                </Toolbar>
            </AppBar>
            <NavigationDrawer
                menuItems={menuItems}
                anchor="right"
                open={mobileDrawerOpen}
                selectedItem={selectedTab}
                onClose={handleMobileDrawerClose}
            />
        </div>
    );
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    handleMobileDrawerOpen: PropTypes.func,
    handleMobileDrawerClose: PropTypes.func,
    mobileDrawerOpen: PropTypes.bool,
    selectedTab: PropTypes.string,
    openRegisterDialog: PropTypes.func.isRequired,
    openLoginDialog: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(withRouter(NavBar)));
