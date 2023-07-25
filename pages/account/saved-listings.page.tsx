import * as React from "react";
import { useAccountPageLayout } from "layout/account-page-layout";
import ListingThumbnail from "components/listings/thumbnail";
import { Fragment } from "react";
// import { Button } from "components/button";
import Listings from "api/listings";
import { useSavedListingsPageStyles } from "./saved-listings.page.styles";
import { Breadcrumbs } from "layout/account-page-layout/breadcrumbs";
import Head from "next/head";
import { AppInfo } from "app-info";
import { ListingDto } from "api/listings/listing.dto";
import { AppPage } from "pages/app-page.type";
import { OfferDto } from "api/offers/offer.dto";
import { Button, Grid, Typography } from "@mui/material";

/**
 * The user saved listings page
 */

type SavedListingsPageProps = {
    offers: OfferDto[];
    listings: ListingDto[];
};

const SavedListingsPage: AppPage<SavedListingsPageProps> = (props) => {
    const styleClasses = useSavedListingsPageStyles();

    const pendingOffers = props.offers.filter((offer) =>
        ["pending_lister", "pending_realsy", "countered"].includes(offer.status)
    );
    const acceptedOffers = props.offers.filter(
        (offer) => offer.status === "accepted"
    );

    /**
     * Render
     */
    return (
        <>
            <Head>
                <title>{AppInfo.name}: Saved Listings</title>
            </Head>

            <div>
                {props.listings?.length === 0 && props.offers?.length === 0 && (
                    <Fragment>
                        <Grid container direction="column" p={{ md: 4, xl: 6 }}>
                            <Grid
                                item
                                borderBottom={2}
                                borderColor="#144659"
                                pb={2}
                            >
                                <Typography
                                    variant="h3"
                                    sx={{
                                        color: "#144659",
                                        fontWeight: 700,
                                        fontFamily: "poppins !important",
                                    }}
                                >
                                    Saved Listings
                                </Typography>
                            </Grid>
                            <Grid item mt={4}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "#999999 !important",
                                        fontWeight: 400,
                                        fontFamily: "poppins !important",
                                    }}
                                >
                                    No Saved listings yet!
                                </Typography>
                            </Grid>
                            <Grid item mt={4}>
                                <Button
                                    href={"/account/listings/create"}
                                    sx={{
                                        py: 1,
                                        width: "160px",
                                        color: "#ffffff",
                                        fontWeight: 600,
                                        fontFamily: "poppins",
                                        textTransform: "capitalize",
                                        letterSpacing: 1,
                                        border: 2,
                                        background: "#144659",
                                        borderColor: "#144659",
                                        borderRadius: 3,
                                        "&:hover": { color: "#144659" },
                                    }}
                                >
                                    find some now!
                                </Button>
                            </Grid>
                        </Grid>
                    </Fragment>
                )}

                {pendingOffers.length > 0 && (
                    <Fragment>
                        <h2>Pending Offers</h2>
                        <div className={styleClasses.thumbnails}>
                            {pendingOffers.map((offer) =>
                                offer.listing ? (
                                    <div key={offer.id}>
                                        <ListingThumbnail
                                            listing={offer.listing}
                                            linkToSection={"make-offer"}
                                        />
                                    </div>
                                ) : (
                                    <></>
                                )
                            )}
                        </div>
                    </Fragment>
                )}

                {acceptedOffers.length > 0 && (
                    <Fragment>
                        <h2>Accepted Offers</h2>
                        <div className={styleClasses.thumbnails}>
                            {acceptedOffers?.map((offer) =>
                                offer.listing ? (
                                    <div key={offer.id}>
                                        <ListingThumbnail
                                            listing={offer.listing}
                                            linkToSection={"make-offer"}
                                        />
                                    </div>
                                ) : (
                                    <></>
                                )
                            )}
                        </div>
                    </Fragment>
                )}

                {props.listings?.length > 0 && (
                    <Fragment>
                        <h2>Saved Listings</h2>
                        <div className={styleClasses.thumbnails}>
                            {props.listings?.map((listing) => {
                                return (
                                    <div key={listing.id}>
                                        <ListingThumbnail listing={listing} />
                                    </div>
                                );
                            })}
                        </div>
                    </Fragment>
                )}
            </div>
        </>
    );
};

SavedListingsPage.getInitialProps = async () => {
    const savedListingsResult = await Listings.getSaved();
    const offersResult = await Listings.getSentOffers();
    return {
        offers: offersResult.offers || [],
        listings: savedListingsResult.listings || [],
    };
};

SavedListingsPage.requiresAuth = true;
SavedListingsPage.defaultLayout = useAccountPageLayout;

export default SavedListingsPage;
