import React from "react";
import PropTypes from "prop-types";

export default function ArrowDownIcon(props) {
    return (
        <svg
            width="17"
            height="11"
            viewBox="0 0 17 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1.76801 3.63171C0.823065 2.68676 1.49232 1.07104 2.82867 1.07104H14.3139C15.6503 1.07104 16.3195 2.68676 15.3746 3.6317L9.63195 9.37432C9.04616 9.96011 8.09641 9.96011 7.51063 9.37432L1.76801 3.63171Z"
                stroke="#999999"
            />
        </svg>
    );
}

ArrowDownIcon.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

ArrowDownIcon.defaultProps = {
    className: "",
    style: {},
};
