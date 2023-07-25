import Colors from "styles/colors";
import Fonts from "styles/fonts";
import Dimensions from "styles/dimensions";
import { createUseStyles } from "react-jss";
import { HeroSectionProps } from "components/hero-section/hero-section";

export const heroSectionStyles = {
    heroSection: {
        padding: "0 15px",
        backgroundImage: `url("/hero-sect-gif.gif")`,
        backgroundSize: "cover",
        backgroundPosition: "bottom center",
        backgorundRepeat: "no-repeat",
        textAlign: "center",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        margin: (props: HeroSectionProps) =>
            `0 ${props.fullWidth === false ? Dimensions.defaultPageMargin : 0}`,
    },

    heading: {
        color: "#144659 !important",
        fontSize: "50px !important",
        fontWeight: 700,
        marginTop: -20,
        marginBottom: 50,
    },

    [`@media (min-width: ${Dimensions.breakpointMedium})`]: {
        heading: {
            fontSize: "52px !important",
        },
    },
};

export const useHeroSectionStyles = createUseStyles(heroSectionStyles);
