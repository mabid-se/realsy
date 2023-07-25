import React, { FC, useState } from "react";
import { formatCurrency } from "util/format-currency";
import { useSavingsSliderStyles } from "./savings-slider.styles";
import Listings from "api/listings";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const reviewData = [
    {
        id: 1,
        perName: "Riley Walker",
        reviewStatement:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt vero voluptate aspernatur aperiam fuga architecto ipsam? Provident quam quae minus accusamus dicta, dignissimos error non, pariatur architecto optio velit facere!",
    },
    {
        id: 2,
        perName: "Ivan Robinson",
        reviewStatement:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt vero voluptate aspernatur aperiam fuga architecto ipsam? Provident quam quae minus accusamus dicta, dignissimos error non, pariatur architecto optio velit facere!",
    },
    {
        id: 3,
        perName: "Seth Thomas",
        reviewStatement:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt vero voluptate aspernatur aperiam fuga architecto ipsam? Provident quam quae minus accusamus dicta, dignissimos error non, pariatur architecto optio velit facere!",
    },
    {
        id: 4,
        perName: "Dave Williams",
        reviewStatement:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt vero voluptate aspernatur aperiam fuga architecto ipsam? Provident quam quae minus accusamus dicta, dignissimos error non, pariatur architecto optio velit facere!",
    },
    {
        id: 5,
        perName: "Wade Harris",
        reviewStatement:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt vero voluptate aspernatur aperiam fuga architecto ipsam? Provident quam quae minus accusamus dicta, dignissimos error non, pariatur architecto optio velit facere!",
    },
];

const CarouselItem = (props) => {
    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                px={{ xs: 3, md: 18 }}
            >
                <Grid item px={{ xs: 2, sm: 0 }}>
                    <Typography
                        variant="h3"
                        color="##144659"
                        textAlign="center"
                        fontWeight={700}
                        fontFamily="poppins !important"
                    >
                        {props.data.perName}
                    </Typography>
                </Grid>
                <Grid item mt={2}>
                    <Typography
                        variant="subtitle1"
                        color="#4d4d4d !important"
                        fontWeight={500}
                        fontFamily="poppins !important"
                        lineHeight="normal"
                        textAlign="justify"
                    >
                        {props.data.reviewStatement}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export type SavingsSliderProps = {
    currentValueLabel?: string;
    couldSaveLabel?: string;
    couldSaveLabelAfter?: string;
    minHomeValue?: number;
    maxHomeValue?: number;
    homeValueStep?: number;
    initialHomeValue?: number;
    savingsCalculationStrategy?: (homeValue: number) => number;
};

export const SavingsSlider: FC<SavingsSliderProps> = ({
    currentValueLabel = "Your current home value",
    couldSaveLabel = "You could save",
    couldSaveLabelAfter = "Using Realsy instead of a traditional real estate agent",
    minHomeValue = 50000,
    maxHomeValue = 1000000,
    homeValueStep = 5000,
    initialHomeValue = 250000,
    savingsCalculationStrategy = (homeValue: number) =>
        Listings.calculateSavings(homeValue),
}) => {
    const styleClasses = useSavingsSliderStyles();
    const [homeValue, setHomeValue] = useState<number>(
        initialHomeValue ?? 250000
    );

    const [hoverCardOne, setHoverCardOne] = useState(false);
    const [hoverCardTwo, setHoverCardTwo] = useState(false);
    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    py: { xs: 6, md: 10 },
                    // backgroundColor: "#000000",
                }}
                className={styleClasses.couldSaveContainer}
            >
                <form>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ px: 4 }}
                    >
                        <Grid item>
                            <Typography
                                variant="h1"
                                sx={{
                                    color: "#ffffff !important",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                }}
                            >
                                {currentValueLabel}
                            </Typography>
                        </Grid>

                        <Grid item mt={1}>
                            <input
                                name={"home-value"}
                                type="range"
                                onChange={(e) =>
                                    setHomeValue(parseInt(e.target.value))
                                }
                                className={styleClasses.rangeInput}
                                value={homeValue}
                                min={minHomeValue}
                                max={maxHomeValue}
                                step={homeValueStep}
                            />
                        </Grid>

                        <Grid item>
                            <Typography
                                variant="h3"
                                sx={{
                                    marginTop: "-5px",
                                    color: "#ffffff !important",
                                    fontWeight: 600,
                                    fontFamily: "poppins !important",
                                }}
                            >
                                {formatCurrency(homeValue, {
                                    omitDecimal: true,
                                })}
                            </Typography>
                        </Grid>

                        <Grid item mt={4}>
                            <Typography
                                variant="h2"
                                sx={{
                                    color: "#ffffff !important",
                                    textTransform: "uppercase",
                                    fontWeight: 700,
                                }}
                            >
                                {couldSaveLabel}
                            </Typography>
                        </Grid>

                        <Grid item mt={3}>
                            <Typography
                                variant="h3"
                                sx={{
                                    color: "#ffffff !important",
                                    fontWeight: 600,
                                    fontFamily: "poppins !important",
                                }}
                            >
                                {formatCurrency(
                                    savingsCalculationStrategy(homeValue),
                                    { omitDecimal: true }
                                )}
                            </Typography>
                        </Grid>

                        <Grid item mt={2} px={{ xs: 4, md: 0 }}>
                            <Typography
                                variant="subtitle1"
                                color="#ffffff !important"
                                fontFamily="poppins !important"
                                fontWeight={400}
                            >
                                {couldSaveLabelAfter}
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <Box sx={{ width: "100%" }} className={styleClasses.largeContaienr}>
                <>
                    <Container>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                            py={{ xs: 6, md: 10 }}
                            px={{ xs: 4, md: 6, lg: 10, xl: 16 }}
                        >
                            <Grid item>
                                <Typography
                                    variant="h2"
                                    fontWeight={700}
                                    textTransform="uppercase"
                                >
                                    about us
                                </Typography>
                            </Grid>
                            <Grid item mt={{ md: 1 }}>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={500}
                                    color="#4d4d4d !important"
                                    fontFamily="poppins !important"
                                    textAlign="justify"
                                >
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Risus sed vulputate odio ut. Faucibus vitae
                                    aliquet nec ullamcorper sit amet risus
                                    nullam eget. Amet aliquam id diam maecenas
                                    ultricies mi eget mauris pharetra. Velit
                                    aliquet sagittis id consectetur purus ut
                                    faucibus pulvinar elementum. Diam vel quam
                                    elementum pulvinar etiam non quam lacus. Leo
                                    vel fringilla est ullamcorper eget nulla.
                                </Typography>
                            </Grid>

                            <Grid item mt={{ xs: 6, md: 8 }}>
                                <Typography
                                    variant="h2"
                                    fontWeight={700}
                                    textTransform="uppercase"
                                >
                                    Why Use Realsy
                                </Typography>
                            </Grid>
                            <Grid item mt={{ md: 1 }}>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={500}
                                    color="#4d4d4d !important"
                                    fontFamily="poppins !important"
                                    textAlign="justify"
                                >
                                    For far too long, organizations have worked
                                    to protect an old business model and
                                    outrageous commissions. Homie was started
                                    with a basic belief, that modern technology
                                    combined with a team approach to real estate
                                    could dramatically reduce costs and make the
                                    entire experience better.
                                </Typography>
                            </Grid>

                            <Grid item mt={{ xs: 2, md: 4 }}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={{ xs: 4, md: 8 }}
                                >
                                    <Grid item>
                                        <Paper
                                            elevation={8}
                                            onMouseEnter={() =>
                                                setHoverCardOne(true)
                                            }
                                            onMouseLeave={() =>
                                                setHoverCardOne(false)
                                            }
                                            sx={{
                                                borderRadius: 6,
                                                py: { xs: 4, md: 6 },
                                                px: 4,
                                                width: { md: "400px" },
                                                "&:hover": {
                                                    backgroundColor: "#144659",
                                                },
                                            }}
                                        >
                                            <Grid
                                                container
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="flex-start"
                                                spacing={{ xs: 1, md: 2 }}
                                            >
                                                <Grid item textAlign={"center"}>
                                                    {!hoverCardOne && (
                                                        <img
                                                            src="/vectorIcons/selling-realsy-g.png"
                                                            alt="selling-with-realsy"
                                                            style={{
                                                                width: "45%",
                                                            }}
                                                        />
                                                    )}
                                                    {hoverCardOne && (
                                                        <img
                                                            src="/vectorIcons/selling-realsy-w.png"
                                                            alt="selling-with-realsy"
                                                            style={{
                                                                width: "45%",
                                                            }}
                                                        />
                                                    )}
                                                </Grid>
                                                <Grid item mt={2}>
                                                    <Typography
                                                        variant="h3"
                                                        sx={{
                                                            fontWeight: 500,
                                                            textTransform:
                                                                "uppercase",
                                                            color: hoverCardOne
                                                                ? "#ffffff !important"
                                                                : "#144659 !important",
                                                        }}
                                                    >
                                                        selling with
                                                        <span
                                                            style={{
                                                                fontWeight: 700,
                                                            }}
                                                        >
                                                            &nbsp;realsy
                                                        </span>
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    mt={{ xs: 1, sm: 0 }}
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            textAlign: "left",
                                                            fontWeight: 500,
                                                            fontFamily:
                                                                "poppins !important",
                                                            color: hoverCardOne
                                                                ? "#ffffff !important"
                                                                : "#4d4d4d !important",
                                                        }}
                                                    >
                                                        <Grid
                                                            container
                                                            direction="column"
                                                            spacing={1}
                                                        >
                                                            <Grid item>
                                                                &#x2022;
                                                                <span
                                                                    style={{
                                                                        paddingLeft: 12,
                                                                    }}
                                                                >
                                                                    $1,500 flat
                                                                    fee
                                                                </span>
                                                            </Grid>
                                                            <Grid item>
                                                                &#x2022;
                                                                <span
                                                                    style={{
                                                                        paddingLeft: 12,
                                                                    }}
                                                                >
                                                                    Team of
                                                                    agents
                                                                </span>
                                                            </Grid>
                                                            <Grid item>
                                                                &#x2022;
                                                                <span
                                                                    style={{
                                                                        paddingLeft: 12,
                                                                    }}
                                                                >
                                                                    Streamlined
                                                                    listing and
                                                                    marketing
                                                                </span>
                                                            </Grid>
                                                        </Grid>
                                                    </Typography>
                                                </Grid>
                                                <Grid item mt={2}>
                                                    <Button
                                                        disableRipple
                                                        href={""}
                                                        onClick={""}
                                                        sx={{
                                                            py: 1,
                                                            px: 2,
                                                            fontWeight: 600,
                                                            textTransform:
                                                                "capitalize",
                                                            letterSpacing: 1,
                                                            borderRadius: 3,
                                                            "&:hover": {
                                                                background:
                                                                    hoverCardOne
                                                                        ? "#ffffff"
                                                                        : "#144659",
                                                            },
                                                            color: hoverCardOne
                                                                ? "#144659"
                                                                : "#ffffff",
                                                            background:
                                                                hoverCardOne
                                                                    ? "#ffffff"
                                                                    : "#144659",
                                                        }}
                                                    >
                                                        get started
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item>
                                        <Paper
                                            elevation={8}
                                            onMouseEnter={() =>
                                                setHoverCardTwo(true)
                                            }
                                            onMouseLeave={() =>
                                                setHoverCardTwo(false)
                                            }
                                            sx={{
                                                borderRadius: 6,
                                                py: { xs: 4, md: 6 },
                                                px: 4,
                                                width: { md: "400px" },
                                                "&:hover": {
                                                    backgroundColor: "#144659",
                                                },
                                            }}
                                        >
                                            <Grid
                                                container
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="flex-start"
                                                spacing={{ xs: 1, md: 2 }}
                                            >
                                                <Grid item textAlign={"center"}>
                                                    {!hoverCardTwo && (
                                                        <img
                                                            src="/vectorIcons/buying-realsy-g.png"
                                                            alt="buying-with-realsy"
                                                            style={{
                                                                width: "40%",
                                                            }}
                                                        />
                                                    )}
                                                    {hoverCardTwo && (
                                                        <img
                                                            src="/vectorIcons/buying-realsy-w.png"
                                                            alt="buying-with-realsy"
                                                            style={{
                                                                width: "40%",
                                                            }}
                                                        />
                                                    )}
                                                </Grid>
                                                <Grid item mt={2}>
                                                    <Typography
                                                        variant="h3"
                                                        sx={{
                                                            fontWeight: 500,
                                                            textTransform:
                                                                "uppercase",
                                                            color: hoverCardTwo
                                                                ? "#ffffff !important"
                                                                : "#144659 !important",
                                                        }}
                                                    >
                                                        buying with
                                                        <span
                                                            style={{
                                                                fontWeight: 700,
                                                            }}
                                                        >
                                                            &nbsp;realsy
                                                        </span>
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        variant="subtitle1"
                                                        sx={{
                                                            textAlign: "left",
                                                            fontWeight: 500,
                                                            fontFamily:
                                                                "poppins !important",
                                                            color: hoverCardTwo
                                                                ? "#ffffff !important"
                                                                : "#4d4d4d !important",
                                                        }}
                                                    >
                                                        <Grid
                                                            container
                                                            direction="column"
                                                            spacing={1}
                                                        >
                                                            <Grid item>
                                                                &#x2022;
                                                                <span
                                                                    style={{
                                                                        paddingLeft: 12,
                                                                    }}
                                                                >
                                                                    Up to
                                                                    $5,000*
                                                                    refund for
                                                                    closing
                                                                    costs
                                                                </span>
                                                            </Grid>
                                                            <Grid item>
                                                                &#x2022;
                                                                <span
                                                                    style={{
                                                                        paddingLeft: 12,
                                                                    }}
                                                                >
                                                                    Dedicated
                                                                    agent
                                                                </span>
                                                            </Grid>
                                                            <Grid item>
                                                                &#x2022;
                                                                <span
                                                                    style={{
                                                                        paddingLeft: 12,
                                                                    }}
                                                                >
                                                                    On-demand
                                                                    tours
                                                                </span>
                                                            </Grid>
                                                        </Grid>
                                                    </Typography>
                                                </Grid>
                                                <Grid item mt={2}>
                                                    <Button
                                                        disableRipple
                                                        href={""}
                                                        onClick={""}
                                                        sx={{
                                                            py: 1,
                                                            px: 2,
                                                            fontWeight: 600,
                                                            textTransform:
                                                                "capitalize",
                                                            letterSpacing: 1,
                                                            borderRadius: 3,
                                                            "&:hover": {
                                                                background:
                                                                    hoverCardTwo
                                                                        ? "#ffffff"
                                                                        : "#144659",
                                                            },
                                                            color: hoverCardTwo
                                                                ? "#144659"
                                                                : "#ffffff",
                                                            background:
                                                                hoverCardTwo
                                                                    ? "#ffffff"
                                                                    : "#144659",
                                                        }}
                                                    >
                                                        get started
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </>

                <>
                    <Box py={8}>
                        <Container>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                                px={{ xs: 0, md: 3 }}
                            >
                                <Grid item px={{ xs: 3, sm: 0 }}>
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            color: "#144659",
                                            fontWeight: "800",
                                            textAlign: "center",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        What our clients Say
                                    </Typography>
                                </Grid>

                                <Grid item mt={{ xs: 4, md: 10 }} width="100%">
                                    <Carousel
                                        autoPlay={true}
                                        stopAutoPlayOnHover={true}
                                        animation={"slide"}
                                        swipe={true}
                                        navButtonsAlwaysVisible={true}
                                        navButtonsProps={{
                                            style: {
                                                color: "#ffffff",
                                                fontSize: "22px",
                                                borderRadius: 5,
                                                backgroundColor: "#144659",
                                                display: {
                                                    xs: "none",
                                                    md: "block",
                                                },
                                            },
                                        }}
                                        indicatorIconButtonProps={{
                                            style: {
                                                marginTop: 30,
                                                padding: { xs: 3, sm: 5 },
                                                color: "#d9d9d9",
                                            },
                                        }}
                                        activeIndicatorIconButtonProps={{
                                            style: { color: "#144659" },
                                        }}
                                    >
                                        {reviewData.map((item) => (
                                            <>
                                                <CarouselItem data={item} />
                                            </>
                                        ))}
                                    </Carousel>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </>
            </Box>
        </>
    );
};
