import Fonts from "styles/fonts";
import Colors from "styles/colors";

export const rawStyles = {
    wrapper: {
        "& p": {
            marginBottom: 5,
        },
    },
    userGuide: {},
    form: {},
    addressInputs: {},
    cityStateZipInputs: {},
    amountInputs: {},

    nav: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridGap: 30,

        "& p": {
            color: "#1e1e1e",
            fontWeight: 700,
            visibility: "hidden",
            textAlign: "center",
            // fontFamily: Fonts.mainSerifFont,
            fontFamily: "poppins",
        },

        "&.mobile-only": {
            display: "block",
            marginBottom: 30,
            "& p": { visibility: "visible" },
        },

        "& span": {
            display: "inline-block",
            // margin: "0 8px",
            margin: "0 12px",
            // color: "#ccc",
            color: "#a9a9a9",
        },
    },

    activeStep: {
        display: "inline-block",
        // backgroundColor: Colors.mediumBlue,
        color: "#144659 !important",
        fontWeight: 700,
        width: 16,
        height: 10,
        padding: "0 5px 18px",
        borderRadius: "50%",
    },

    "@media (min-width: 900px)": {
        // make inputs inline
        addressInputs: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: 20,
        },
        cityStateZipInputs: {
            display: "grid",
            gridTemplateColumns: "1fr 60px 150px",
            gridGap: 20,
        },
        amountInputs: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: 20,
        },
    },

    "@media (min-width: 1200px)": {
        // move user guide section to side
        wrapper: {
            display: "grid",
            gridTemplateColumns: "750px 1fr",
            gridGap: 30,
        },
        userGuide: { gridColumn: 2, gridRow: 1 },
        form: { gridColumn: 1, gridRow: 1 },
        nav: {
            "& p": { visibility: "visible" },
            "&.mobile-only": { display: "none" },
        },
    },
};
