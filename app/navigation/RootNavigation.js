import React from "react";
import PropTypes from "prop-types";

export const navigationRef = React.createRef();

/**
 * Navigate to a specific screen.
 * @param {string} name - The name of the screen to navigate to.
 * @param {object} params - The parameters to pass to the screen (optional).
 */
export function navigate(name, params) {
    try {
        navigationRef.current?.navigate(name, params);
    } catch (error) {
        console.error(`Error navigating to ${name}: ${error.message}`);
        // Handle the error as needed
    }
}

/**
 * Navigate back to the previous screen.
 */
export function goBack() {
    try {
        navigationRef.current?.goBack();
    } catch (error) {
        console.error(`Error going back: ${error.message}`);
        // Handle the error as needed
    }
}

// PropTypes for better type checking
navigate.propTypes = {
    name: PropTypes.string.isRequired,
    params: PropTypes.object
};
