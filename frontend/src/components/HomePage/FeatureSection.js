import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, isWidthUp, withWidth } from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import MeassageIcon from "@material-ui/icons/Message";
import calculateSpacing from "./calculateSpacing";
import FeatureCard from "./FeatureCard";

const iconSize = 30;

const features = [
    {
        color: "#C51162",
        headline: "JavaScript Text Editor",
        text: "Peerprep supports a JavaScript Text Editor out of the box, allowing you to have a better experience coding on the platform.",
        icon: <CodeIcon style={{ fontSize: iconSize }} />,
        mdDelay: "200",
        smDelay: "200",
    },
    {
        color: "#0091EA",
        headline: "Chat System",
        text: "Chat with your peers while working on the challenge to understand the approach to take in solving the question.",
        icon: <MeassageIcon style={{ fontSize: iconSize }} />,
        mdDelay: "400",
        smDelay: "0",
    },
    {
        color: "#6200EA",
        headline: "Convinent",
        text: "Just register an account and start practicing with us right away!",
        icon: <CalendarTodayIcon style={{ fontSize: iconSize }} />,
        mdDelay: "200",
        smDelay: "200",
    },
];

function FeatureSection(props) {
    const { width } = props;
    return (
        <div style={{ backgroundColor: "#FFFFFF", paddingBottom: "80px" }}>
            <div className="container-fluid lg-p-top">
                <Typography variant="h3" align="center" className="lg-mg-bottom">
                    Features
                </Typography>
                <div className="container-fluid">
                    <Grid container spacing={calculateSpacing(width)}>
                        {features.map((element) => (
                            <Grid
                                item
                                xs={6}
                                md={4}
                                data-aos="zoom-in-up"
                                data-aos-delay={
                                    isWidthUp("md", width) ? element.mdDelay : element.smDelay
                                }
                                key={element.headline}
                            >
                                <FeatureCard
                                    Icon={element.icon}
                                    color={element.color}
                                    headline={element.headline}
                                    text={element.text}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </div>
    );
}

FeatureSection.propTypes = {
    width: PropTypes.string.isRequired,
};

export default withWidth()(FeatureSection);
