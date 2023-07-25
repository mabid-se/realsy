import React, { FC } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { useHeroSectionStyles } from "./hero-section.styles";
import {
    // Button,
    ButtonVariant,
} from "components/button";
import { Box, Button, Grid, Typography } from "@mui/material";

/**
 * A "hero" section with a large full-width image behind text
 */

export type HeroSectionProps = {
    // backgroundImageUrl?: string;
    headline?: string;
    buttonUrl?: string;
    buttonText?: string;
    onButtonClicked?: () => any;
    showButton?: boolean;
    fullWidth?: boolean;
};

const defaultProps: HeroSectionProps = {
    showButton: true,
    fullWidth: true,
};

export const HeroSection: FC<HeroSectionProps> = (props) => {
    const styleClasses = useHeroSectionStyles(props);

    return (
        <>
            <Box
                className={styleClasses.heroSection}
                sx={{ height: { xs: "87vh", sm: "93vh" } }}
            >
                <Grid
                    container
                    direction="column"
                    justifyContent={{ xs: "center", sm: "flex-start" }}
                    alignItems={{ xs: "center", sm: "flex-start" }}
                    marginTop={6}
                    paddingY={2}
                    paddingX={{ xs: 4, md: 12, xl: 24 }}
                >
                    <Grid item textAlign={{ xs: "center", sm: "left" }}>
                        <Fade triggerOnce={true} duration={1300}>
                            <Slide triggerOnce={true} direction={"down"}>
                                <Typography
                                    variant="h1"
                                    color="#144659"
                                    fontWeight={800}
                                    textTransform="uppercase"
                                    textAlign={{
                                        xs: "center !important",
                                        sm: "left",
                                    }}
                                >
                                    {props.headline}
                                </Typography>
                            </Slide>
                        </Fade>
                    </Grid>
                    <Grid item textAlign={{ xs: "center", sm: "left" }}>
                        {props.showButton && (
                            <Fade triggerOnce={true} delay={1800}>
                                <p>
                                    <Button
                                        disableRipple
                                        href={props.buttonUrl}
                                        onClick={props.onButtonClicked}
                                        sx={{
                                            mt: 2,
                                            py: 1,
                                            px: 2,
                                            color: "#ffffff",
                                            fontWeight: 600,
                                            textTransform: "capitalize",
                                            letterSpacing: 1,
                                            background: "#144659",
                                            borderRadius: 3,
                                            "&:hover": {
                                                color: "#144659",
                                            },
                                        }}
                                    >
                                        get started
                                    </Button>
                                </p>
                            </Fade>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

HeroSection.defaultProps = defaultProps;
