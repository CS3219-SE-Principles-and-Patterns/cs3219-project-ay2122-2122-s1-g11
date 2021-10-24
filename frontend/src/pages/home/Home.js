import React, { Fragment } from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import FeatureSection from "./FeatureSection";
import PricingSection from "./PricingSection";
import Footer from "./Footer";

function Home() {
    return (
        <Fragment>
            <HeadSection />
            <FeatureSection />
            <PricingSection />
            <Footer />
        </Fragment>
    );
}

Home.propTypes = {
    selectHome: PropTypes.func.isRequired,
};

export default Home;
