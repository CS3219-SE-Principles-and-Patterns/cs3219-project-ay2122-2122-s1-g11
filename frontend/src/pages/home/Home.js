import React, { Fragment } from "react";
import PropTypes from "prop-types";
import HeadSection from "./HeadSection";
import FeatureSection from "./FeatureSection";
import PricingSection from "./PricingSection";

function Home() {
    return (
        <Fragment>
            <HeadSection />
            <FeatureSection />
            <PricingSection />
        </Fragment>
    );
}

Home.propTypes = {
    selectHome: PropTypes.func.isRequired,
};

export default Home;
