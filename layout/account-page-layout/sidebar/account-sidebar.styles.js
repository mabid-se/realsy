import Colors from "styles/colors";
import Fonts from "styles/fonts";
import { createUseStyles } from "react-jss";

export const accountSidebarStyles = {
    mainSidebar: {
        // width: "inherit",
        width: "100% !important",
        // position: "fixed",
        overflow: "hidden",
    },
    accountSidebar: {
        // width: "100%",
        position: "fixed",
        // overflow: "hidden",
        backgroundColor: Colors.offWhite,
        boxShadow: Colors.defaultShadow,

        "& .profile-snapshot": {
            backgroundColor: Colors.mediumBlue,
            color: "#fff",

            "& h1": {
                color: "#fff",
                fontSize: 32,
                fontWeight: "bold",
                padding: 0,
                "& a": { textDecoration: "none" },
            },

            "& a": { color: "#fff" },
        },

        "& ul": {
            "& li": {
                listStyle: "none",
                marginTop: 20,

                "& a": {
                    display: "block",
                    color: "#717161",
                    fontSize: "18px",
                    fontWeight: 400,
                    textDecoration: "none",
                    fontFamily: "poppins",
                    "&:hover": {
                        color: "#144659",
                        "& svg": { fill: "#144659" },
                    },

                    "& svg": {
                        fill: "#a9a9a9",
                        height: 16,
                        width: "auto",
                    },

                    "@media (max-width: 760px)": { fontSize: "17px" },
                },

                "&.active": {
                    "& a": {
                        borderRight: "5px solid #144659",
                        color: "#144659",
                        fontWeight: 700,
                        "& svg": { fill: "#144659 !important" },
                    },
                },
            },
        },

        "@media (max-width: 600px)": { display: "none" },
        "@media (min-width: 900px)": { height: "90vh" },
        "@media (min-width: 1200px)": { height: "90vh" },
        "@media (min-width: 1536px)": { height: "94vh" },
    },

    userPhoto: {
        borderRadius: "50%",
        border: "2px solid #fff",
        backgroundColor: "#fff",
        width: 95,
        height: 95,
        margin: "0 auto 0",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },

    notification: {
        float: "right",
        fontSize: 16,
        color: "#fff",
        backgroundColor: Colors.pink,
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginRight: -25,
        marginTop: -34,
        padding: "7px 18px 7px 20px",
    },
};

export const useAccountSidebarStyles = createUseStyles(accountSidebarStyles);
