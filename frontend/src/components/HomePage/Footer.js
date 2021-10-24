import React from "react";

const Footer = () => {
    return (
        <div
            style={{
                height: "50px",
                backgroundColor: "black",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h4>
                The landing page template is referenced from{" "}
                <a
                    href="https://reactsaastemplate.com"
                    target="_blank"
                    style={{ color: "aqua" }}
                    rel="noreferrer"
                >
                    https://reactsaastemplate.com
                </a>
            </h4>
        </div>
    );
};

export default Footer;
