import React, { Fragment } from "react";
import PropTypes from "prop-types";
import HeadSection from "../components/HomePage/HeadSection";
import FeatureSection from "../components/HomePage/FeatureSection";
import Footer from "../components/HomePage/Footer";

function Home() {
    return (
        <Fragment>
            <HeadSection />
            <FeatureSection />
            <Footer />
        </Fragment>
    );
}

Home.propTypes = {
    selectHome: PropTypes.func.isRequired,
};

export default Home;
