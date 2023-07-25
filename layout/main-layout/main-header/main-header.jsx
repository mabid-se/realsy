import React, { useState } from "react";
import Link from "next/link";

import RealsyLogo from "components/icons/realsy-logo";

import { useMainHeaderStyles } from "layout/main-layout/main-header/main-header.styles";
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Drawer,
    Grid,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { Close, Menu } from "@mui/icons-material";
import { AuthContext, useAuthContext } from "api/auth/auth-context";

const menuItems = [
    { text: "home", url: "/" },
    { text: "Sell", url: "/sell" },
    { text: "Buy", url: "/buy" },
    { text: "About", url: "/about" },
];

const MainHeader = (props) => {
    const styles = useMainHeaderStyles();

    const [activeRoute, setActiveRoute] = useState("/");
    const handleRoute = (event, route) => {
        setActiveRoute(route);
    };

    const authContext = useAuthContext();

    const drawerWidth = 240;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                py={12}
                px={4}
                sx={{
                    textTransform: "capitalize",
                    textAlign: "center",
                }}
            >
                <Grid item>
                    <IconButton
                        size="small"
                        onClose={handleDrawerToggle}
                        sx={{
                            position: "absolute",
                            top: 25,
                            right: 25,
                            color: "#4d4d4d",
                            border: 2,
                            borderRadius: "50%",
                        }}
                    >
                        <Close />
                    </IconButton>
                </Grid>
                <Grid item my={3}>
                    <Button
                        onClick=""
                        sx={{
                            py: 1,
                            px: 2,
                            color: "#ffffff",
                            fontSize: 13,
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            letterSpacing: 1,
                            background: "#144659",
                            borderRadius: 3,
                        }}
                    >
                        Sign In/Join
                    </Button>
                </Grid>
                {menuItems.map((item, index) => (
                    <Grid
                        item
                        py={2}
                        borderBottom={2}
                        borderColor="#4d4d4d"
                        fontWeight="bold"
                        key={index}
                    >
                        <Link
                            href={item.url}
                            onClick={(event) => handleRoute(event, item.url)}
                            smooth="true"
                            duration={750}
                        >
                            <Typography
                                variant="h5"
                                onClick={handleDrawerToggle}
                                color="#4D4D4D"
                            >
                                {item.text}
                            </Typography>
                        </Link>
                    </Grid>
                ))}

                <Grid item mt={8}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item xs={3}>
                            <Link onClick={handleDrawerToggle} href="">
                                <img
                                    src="/social/linkedIn.png"
                                    alt="linkedin"
                                    style={{ width: "90%" }}
                                />
                            </Link>
                        </Grid>
                        <Grid item xs={3}>
                            <Link onClick={handleDrawerToggle} href="">
                                <img
                                    src="/social/facebook.png"
                                    alt="facebook"
                                    style={{ width: "90%" }}
                                />
                            </Link>
                        </Grid>
                        <Grid item xs={3}>
                            <Link onClick={handleDrawerToggle} href="">
                                <img
                                    src="/social/instagram.png"
                                    alt="instagram"
                                    style={{ width: "90%" }}
                                />
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <>
            <Box>
                <CssBaseline />
                <AppBar className={styles.mainAppbar}>
                    <Toolbar>
                        {/* ---| Navbar for md and above breakpoints |--- */}
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            display={{ xs: "none", md: "flex" }}
                        >
                            <Grid
                                item
                                md={2}
                                px={{ md: 1, lg: 3 }}
                                textAlign="left"
                            >
                                <Link
                                    href="/"
                                    sx={{ mx: 3, cursor: "pointer" }}
                                >
                                    <a className={`${styles.mainLogo} nolink`}>
                                        <RealsyLogo />
                                    </a>
                                </Link>
                            </Grid>

                            <Grid
                                item
                                md={8}
                                px={{ md: 1, lg: 3 }}
                                textAlign="center"
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    {menuItems.map((item, index) => (
                                        <Grid item key={index}>
                                            <Link
                                                href={item.url}
                                                onClick={(event) =>
                                                    handleRoute(event, item.url)
                                                }
                                            >
                                                <Button
                                                    className={
                                                        activeRoute === item.url
                                                            ? styles.activeNavBtn
                                                            : styles.navBtn
                                                    }
                                                >
                                                    {item.text}
                                                </Button>
                                            </Link>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>

                            <Grid
                                item
                                md={2}
                                px={{ md: 1, lg: 3 }}
                                textAlign="right"
                            >
                                <Button
                                    disableRipple
                                    data-testid={"account-menu-button"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        authContext.showSignIn();
                                    }}
                                    sx={{
                                        py: 1,
                                        px: 2,
                                        color: "#ffffff",
                                        fontWeight: 600,
                                        textTransform: "capitalize",
                                        letterSpacing: 1,
                                        border: 2,
                                        background: "#144659",
                                        borderColor: "#144659",
                                        borderRadius: 3,
                                        "&:hover": { color: "#144659" },
                                    }}
                                >
                                    Sign In / Join
                                </Button>
                            </Grid>
                        </Grid>

                        {/* ---| Navbar for xs and sm breakpoints |--- */}
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            display={{ xs: "flex", md: "none" }}
                            px={2}
                        >
                            <Grid item textAlign="left">
                                <Link
                                    href="/"
                                    sx={{ mx: 3, cursor: "pointer" }}
                                >
                                    <a className={`${styles.mainLogo} nolink`}>
                                        <RealsyLogo />
                                    </a>
                                </Link>
                            </Grid>
                            <Grid item textAlign="right">
                                <IconButton
                                    aria-label="open drawer"
                                    onClick={handleDrawerToggle}
                                    size="large"
                                    sx={{
                                        flexGrow: 0,
                                        mr: 2,
                                        display: { md: "none" },
                                        "&:hover": {
                                            color: "white.900",
                                            borderRadius: 15,
                                            backgroundColor: "black.800",
                                        },
                                    }}
                                >
                                    <Menu />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                {/* ---| Drawer Menu for xs& sm breakpoints |--- */}
                <Box component="nav" sx={{ height: "auto" }}>
                    <Drawer
                        variant="temporary"
                        anchor="right"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keppMounter: true }}
                        sx={{
                            display: { xs: "block", md: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: drawerWidth,
                                backgroundColor: "black.800",
                                borderTopLeftRadius: 15,
                                borderBottomLeftRadius: 15,
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </Box>
        </>
    );
};

export default MainHeader;
