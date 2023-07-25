import React from "react";
import Link from "next/link";
import RealsyLogo from "components/icons/realsy-logo";
import { ChatLauncher } from "components/chat-launcher";
import { arrayOf, shape, string } from "prop-types";
import { useMainFooterStyles } from "layout/main-layout/main-footer/main-footer.styles";
import { Box, Container, Grid, Typography } from "@mui/material";

const MainFooter = (props) => {
    const styleClasses = useMainFooterStyles();

    return (
        <>
            <Box className={styleClasses.footerCont}>
                <Container>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={4}
                    >
                        <Grid
                            item
                            md={4}
                            textAlign={{ xs: "center", sm: "left" }}
                        >
                            <Grid
                                container
                                direction="column"
                                justifyContent={{
                                    xs: "center",
                                    sm: "flex-start",
                                }}
                                alignItems={{ xs: "center", sm: "flex-start" }}
                                spacing={2}
                                sx={{ paddingLeft: { xs: 2, md: 8 } }}
                            >
                                <Grid item>
                                    <Link href={"/"}>
                                        <a>
                                            <RealsyLogo
                                                className={styleClasses.logo}
                                            />
                                        </a>
                                    </Link>
                                </Grid>

                                <Grid item mt={2}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent={{
                                            xs: "center",
                                            sm: "flex-start",
                                        }}
                                        alignItems="center"
                                        spacing={{ xs: 2, sm: 1 }}
                                    >
                                        <Grid item xs={3} md={2}>
                                            <a
                                                target={"_new"}
                                                href="https://linkedin.com/any_user"
                                            >
                                                <img
                                                    src="/icon-linkedin.png"
                                                    alt="linkedin"
                                                    style={{ width: "95%" }}
                                                />
                                            </a>
                                        </Grid>
                                        <Grid item xs={3} md={2}>
                                            <a
                                                target={"_new"}
                                                href="https://facebook.com/any_user"
                                            >
                                                <img
                                                    src="/icon-facebook.png"
                                                    alt="facebook"
                                                    style={{ width: "95%" }}
                                                />
                                            </a>
                                        </Grid>
                                        <Grid item xs={3} md={2}>
                                            <a
                                                target={"_new"}
                                                href="https://instagram.com/any_user"
                                            >
                                                <img
                                                    src="/icon-instagram.png"
                                                    alt="instagram"
                                                    style={{ width: "95%" }}
                                                />
                                            </a>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item mt={{ xs: 4, sm: 0 }} md={8}>
                            <Grid
                                container
                                direction="column"
                                justifyContent={{
                                    xs: "center",
                                    sm: "flex-start",
                                }}
                                alignItems={{
                                    xs: "center",
                                    sm: "flex-start",
                                }}
                                spacing={{ xs: 1, sm: 0 }}
                            >
                                <Grid item>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            color: "#ffffff",
                                            textTransform: "uppercase",
                                            fontWeight: 700,
                                            fontFamily: "Cinzel !important",
                                        }}
                                    >
                                        quick links
                                    </Typography>
                                </Grid>
                                <Grid item mt={{ xs: 4, sm: 2 }}>
                                    <Link href="/about">
                                        <>
                                            <Typography
                                                variant="h6"
                                                className={
                                                    styleClasses.linkItem
                                                }
                                                sx={{
                                                    display: {
                                                        xs: "block",
                                                        sm: "none",
                                                    },
                                                }}
                                            >
                                                About us
                                            </Typography>
                                            <Typography
                                                variant="subtitle1"
                                                className={
                                                    styleClasses.linkItem
                                                }
                                                sx={{
                                                    display: {
                                                        xs: "none",
                                                        sm: "block",
                                                    },
                                                }}
                                            >
                                                About us
                                            </Typography>
                                        </>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/">
                                        <>
                                            <Typography
                                                variant="h6"
                                                className={
                                                    styleClasses.linkItem
                                                }
                                                sx={{
                                                    display: {
                                                        xs: "block",
                                                        sm: "none",
                                                    },
                                                }}
                                            >
                                                Contact us
                                            </Typography>
                                            <Typography
                                                variant="subtitle1"
                                                className={
                                                    styleClasses.linkItem
                                                }
                                                sx={{
                                                    display: {
                                                        xs: "none",
                                                        sm: "block",
                                                    },
                                                }}
                                            >
                                                Contact us
                                            </Typography>
                                        </>
                                    </Link>
                                </Grid>

                                <Grid item>
                                    <Link href="/">
                                        <>
                                            <Typography
                                                variant="h6"
                                                className={
                                                    styleClasses.linkItem
                                                }
                                                sx={{
                                                    display: {
                                                        xs: "block",
                                                        sm: "none",
                                                    },
                                                }}
                                            >
                                                Terms & Conditions
                                            </Typography>
                                            <Typography
                                                variant="subtitle1"
                                                className={
                                                    styleClasses.linkItem
                                                }
                                                sx={{
                                                    display: {
                                                        xs: "none",
                                                        sm: "block",
                                                    },
                                                }}
                                            >
                                                Terms & Conditions
                                            </Typography>
                                        </>
                                    </Link>
                                </Grid>

                                <Grid item>
                                    <Link href="/">
                                        <>
                                            <Typography
                                                variant="h6"
                                                className={
                                                    styleClasses.linkItem
                                                }
                                                sx={{
                                                    display: {
                                                        xs: "block",
                                                        sm: "none",
                                                    },
                                                }}
                                            >
                                                Privacy Policy
                                            </Typography>
                                            <Typography
                                                variant="subtitle1"
                                                className={
                                                    styleClasses.linkItem
                                                }
                                                sx={{
                                                    display: {
                                                        xs: "none",
                                                        sm: "block",
                                                    },
                                                }}
                                            >
                                                Privacy Policy
                                            </Typography>
                                        </>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <ChatLauncher promptText={props.chatButtonText} />
        </>
    );
};

MainFooter.propTypes = {
    menuItems: arrayOf(
        shape({
            text: string.isRequired,
            url: string.isRequired,
        })
    ),
    socialMenuItems: arrayOf(
        shape({
            type: string.isRequired,
            slug: string,
        })
    ),
    chatButtonText: string,
};

MainFooter.defaultProps = {
    menuItems: [],
    socialMenuItems: [],
    chatButtonText: "Chat with Us!",
};

export default MainFooter;
