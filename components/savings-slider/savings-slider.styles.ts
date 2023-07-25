import Fonts from "styles/fonts";
import Colors from "styles/colors";
import Dimensions from "styles/dimensions";
import { createUseStyles } from "react-jss";

export const savingsSliderStyles = {
    couldSaveContainer: {
        background: "url(/you-could-save-bg.png)",
        backgroundSize: "cover",
        backgroundRepear: "no-repeat",
    },
    largeContaienr: {
        background: "url(/lp-white-bg.png)",
        backgroundSize: "cover",
        backgroundRepear: "no-repeat",
    },

    rangeInput: {
        "-webkit-appearance": "none",
        appearance: "none",
        // width: "135%",
        width: "240px",
        height: 4,
        border: "none",
        borderRadius: 5,
        background: "#ffffff",
        outline: "none",
        padding: 0,
        margin: "49px 0 40px",

        "&::-webkit-slider-thumb": {
            "-webkit-appearance": "none",
            appearance: "none",
            width: 36,
            height: 41,
            border: 0,
            background: "url('/house-slider.png')",
            backgroundRepeat: "no-repeat",
            cursor: "pointer",
            "&:after": {
                content: "TEST",
                display: "block",
                backgroundColor: "#c00",
                color: "#f00",
                position: "absolute",
                width: 100,
                height: 100,
            },
        },
        "&::-moz-range-thumb": {
            "-webkit-appearance": "none",
            appearance: "none",
            width: 36,
            height: 41,
            border: 0,
            background: "url('/house-slider.png')",
            cursor: "pointer",
            "&:after": {
                content: "TEST",
                display: "block",
                backgroundColor: "#c00",
                color: "#f00",
                position: "absolute",
                width: 100,
                height: 100,
            },
        },
    },

    [`@media (min-width: ${Dimensions.breakpointSmall})`]: {
        savingsSlider: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            width: 750,
            maxWidth: "90%",
            marginTop: "-80px",
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
};

export const useSavingsSliderStyles = createUseStyles(savingsSliderStyles);
