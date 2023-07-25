import Colors from "styles/colors";
import { createUseStyles } from "react-jss";

export const mainHeaderStyles = {
    //  ---| Mine |---
    mainAppbar: {
        elevation: 6,
        paddingY: 2,
        background: "#ffffff",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },

    mainLogo: {
        width: "auto",
        "& svg": {
            height: 25,
            width: "auto",
            fill: Colors.mediumBlue,
            transition: Colors.defaultTransitionTime,
        },
        "&:hover svg": {
            fill: Colors.lightBlue,
        },
        "&.nolink:hover svg": {
            fill: Colors.mediumBlue,
        },
    },

    navBtn: {
        color: "#A9A9A9",
        fontSize: 15,
        fontWeight: "400",
        textTransform: "capitalize",
        letterSpacing: 1,
        "&:hover": {
            color: "#144659",
            fontWeight: "700",
            background: "transparent",
            textDecoration: "underline",
            "text-underline-offset": "0.6em",
            "text-decoration-thickness": "0.1em",
        },
    },

    activeNavBtn: {
        fontSize: 15,
        textTransform: "capitalize",
        letterSpacing: 1,
        color: "#144659",
        fontWeight: "700",
        textDecoration: "underline",
        "text-underline-offset": "0.6em",
        "text-decoration-thickness": "0.1em",
        "&:hover": {
            color: "#144659",
            background: "transparent",
            textDecoration: "underline",
            "text-underline-offset": "0.6em",
            "text-decoration-thickness": "0.1em",
        },
    },
};

export const useMainHeaderStyles = createUseStyles(mainHeaderStyles);
