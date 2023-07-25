import * as React from "react";
import Listings from "api/listings";
import { useAccountPageLayout } from "layout/account-page-layout";
import ListingThumbnail from "components/listings/thumbnail";
import { Fragment } from "react";
// import { Button } from "components/button";
import { createUseStyles } from "react-jss";
import { useState } from "react";
import redirect from "util/redirect";
import Head from "next/head";
import { AppInfo } from "app-info";
import { Breadcrumbs } from "layout/account-page-layout/breadcrumbs";
import { ListingDto } from "api/listings/listing.dto";
import { AppPage } from "pages/app-page.type";
import { Button, Divider, Grid, Typography } from "@mui/material";

const useUserListingsPageStyles = createUseStyles({
    listingGrid: {
        display: "grid",
        gridGap: 20,
        "@media (min-width: 1024px)": {
            gridTemplateColumns: "300px 300px",
        },
        "@media (min-width: 1200px)": {
            gridTemplateColumns: "320px 320px 320px",
        },
    },
});

/**
 * The user "my listings" page
 */

type UserListingsPageProps = {
    listings: ListingDto[];
};

const UserListingsPage: AppPage<UserListingsPageProps> = (props) => {
    const styleClasses = useUserListingsPageStyles();

    const pendingListings = props.listings.filter(
        (listing) =>
            listing.status === "pending_realsy" || listing.status === null
    );
    const activeListings = props.listings.filter(
        (listing) => listing.status === "active"
    );
    const closedListings = props.listings.filter(
        (listing) => listing.status === "closed"
    );

    if (props.listings.length === 0) {
        /**
         * No listings
         */
        return (
            <Fragment>
                <Head>
                    <title>{AppInfo.name}: My Listings</title>
                </Head>
                <Grid container direction="column" p={{ md: 4, xl: 6 }}>
                    <Grid item borderBottom={2} borderColor="#144659" pb={2}>
                        <Typography
                            variant="h3"
                            sx={{
                                color: "#144659",
                                fontWeight: 700,
                                fontFamily: "poppins !important",
                            }}
                        >
                            My Listings
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
                            You haven't listed yet!
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
                            List now!
                        </Button>
                    </Grid>
                </Grid>
            </Fragment>
        );
    } else {
        return (
            <>
                <Head>
                    <title>{AppInfo.name}: My Listings</title>
                </Head>
                <Grid
                    container
                    direction="column"
                    p={{ md: 4, xl: 6 }}
                    spacing={4}
                >
                    <Grid item borderBottom={2} borderColor="#144659" pb={2}>
                        <Typography
                            variant="h3"
                            sx={{
                                color: "#144659",
                                fontWeight: 700,
                                fontFamily: "poppins !important",
                            }}
                        >
                            My Listings
                        </Typography>
                    </Grid>
                    <Grid item>
                        {pendingListings.length > 0 && (
                            <>
                                <h2>Pending Listings</h2>
                                <div className={styleClasses.listingGrid}>
                                    {pendingListings.map((listing) => (
                                        <div key={listing.id}>
                                            <ListingThumbnail
                                                listing={listing}
                                                linkToFullPage={true}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        {activeListings.length > 0 && (
                            <>
                                <h2>Active Listings</h2>
                                <div className={styleClasses.listingGrid}>
                                    {activeListings.map((listing) => (
                                        <div key={listing.id}>
                                            <ListingThumbnail
                                                listing={listing}
                                                linkToFullPage={true}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                        {closedListings.length > 0 && (
                            <>
                                <h2>Closed Listings</h2>
                                <div className={styleClasses.listingGrid}>
                                    {props.listings &&
                                        props.listings
                                            .filter(
                                                (listing) =>
                                                    listing.status === "closed"
                                            )
                                            .map((listing) => (
                                                <div key={listing.id}>
                                                    <ListingThumbnail
                                                        listing={listing}
                                                        linkToFullPage={true}
                                                    />
                                                </div>
                                            ))}
                                </div>
                            </>
                        )}
                    </Grid>
                </Grid>
                <Breadcrumbs currentPageTitle={"My Listings"} />
            </>
        );
    }
};

UserListingsPage.getInitialProps = async (context) => {
    const listingsResult = await Listings.getOwnedListings();
    if (listingsResult.listings.length === 1) {
        // go to single listing view if user has only one listing
        redirect(
            "/account/listings/" + listingsResult.listings[0].id,
            context.res
        );
    }
    return {
        listings: listingsResult.listings || [],
    };
};

UserListingsPage.defaultLayout = useAccountPageLayout;
UserListingsPage.requiresAuth = true;

export default UserListingsPage;
