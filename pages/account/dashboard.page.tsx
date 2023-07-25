import * as React from "react";
import { useAccountPageLayout } from "layout/account-page-layout";
import UserProfile from "api/user-profile";
import { Fragment } from "react";
import { useState } from "react";
import Listings from "api/listings";
import Documents from "api/documents";
import { useDashboardPageStyles } from "./dashboard.page.styles";
import { DashboardGroup } from "components/dashboard-group";
import ListingThumbnail from "components/listings/thumbnail";
import { ActivityRecordThumbnail } from "components/activity-record-thumbnail";
import { formatCurrency } from "util/format-currency";
import { DocumentThumbnail } from "components/document-thumbnail";
import UserCalendar from "components/user-calendar";
import { useNotificationsContext } from "contexts/notifications-context";
import { ApiClient } from "api/api-client";
import { ApiRoutes } from "api/api-routes";
import { UserDto } from "api/auth/user.dto";
import { UserActivityRecordDto } from "api/notifications/user-activity-record.dto";
import { ListingDto } from "api/listings/listing.dto";
import { UserDocumentDto } from "api/documents/user-document.dto";
import { AppPage } from "pages/app-page.type";
import { Button, Grid } from "@mui/material";

const styles = {
    btnStyles: {
        py: 1,
        width: "160px",
        color: "#ffffff",
        fontWeight: 600,
        textTransform: "capitalize",
        letterSpacing: 1,
        border: 2,
        background: "#144659",
        borderColor: "#144659",
        borderRadius: 3,
        "&:hover": { color: "#144659" },
    },
};
type UserDashboardPageProps = {
    userProfile: UserDto;
    activityRecords: UserActivityRecordDto[];
    listings: ListingDto[];
    savedListings: ListingDto[];
    documents: UserDocumentDto[];
};

const UserDashboardPage: AppPage<UserDashboardPageProps> = (props) => {
    const styleClasses = useDashboardPageStyles();
    const notificationsContext = useNotificationsContext();
    const [hideAlert, setHideAlert] = useState(false);

    const notification = notificationsContext.notifications[0];
    const closedListings = props.listings.filter(
        (listing) => listing.status === "closed"
    );
    const activeListings = props.listings.filter(
        (listing) =>
            listing.status === "pending_realsy" ||
            listing.status === "active" ||
            listing.status === "sale_pending"
    );

    return (
        <Fragment>
            {notification && (
                <div
                    className={`${styleClasses.alert} ${
                        hideAlert ? "hidden" : ""
                    }`}
                    onClick={() =>
                        notificationsContext.openNotificationContent(
                            notification
                        )
                    }
                >
                    <button
                        className={styleClasses.alertHideButton}
                        onClick={(e) => {
                            e.preventDefault();
                            setHideAlert(true);
                            setTimeout(
                                () =>
                                    notificationsContext.dismissNotification(
                                        notification.id
                                    ),
                                500
                            );
                        }}
                        children={"x"}
                    />

                    <h3>{notification.heading}</h3>
                    <p>{notification.subheading}</p>
                </div>
            )}

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                p={{ md: 4, xl: 6 }}
                spacing={4}
            >
                <Grid item md={6}>
                    <DashboardGroup title={"Saved Homes"}>
                        {props.savedListings &&
                            props.savedListings.map((listing) => {
                                return (
                                    <div
                                        style={{ marginBottom: 10 }}
                                        key={listing.id}
                                    >
                                        <ListingThumbnail
                                            horizontalLayout={true}
                                            listing={listing}
                                            backgroundColor={"#fff"}
                                        />
                                    </div>
                                );
                            })}
                        {(!props.savedListings ||
                            props.savedListings.length < 1) && (
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                mb={2}
                            >
                                <Grid item>
                                    <p className={styleClasses.pTextStyles}>
                                        no saved homes yet
                                    </p>
                                </Grid>
                                <Grid item>
                                    <Button
                                        href="/buy"
                                        disableRipple
                                        sx={styles.btnStyles}
                                    >
                                        find some now!
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                    </DashboardGroup>
                </Grid>
                <Grid item md={6}>
                    <DashboardGroup title={"My Listings"}>
                        {props.listings &&
                            props.listings.map((listing) => {
                                return (
                                    <div
                                        style={{ marginBottom: 10 }}
                                        key={listing.id}
                                    >
                                        <ListingThumbnail
                                            horizontalLayout={true}
                                            listing={listing}
                                            backgroundColor={"#fff"}
                                        />
                                    </div>
                                );
                            })}
                        {(!props.listings || props.listings.length < 1) && (
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                mb={2}
                            >
                                <Grid item>
                                    <p className={styleClasses.pTextStyles}>
                                        no listings yet.
                                    </p>
                                </Grid>
                                <Grid item>
                                    <Button
                                        href="/account/listings/create"
                                        sx={styles.btnStyles}
                                    >
                                        Make one now!
                                    </Button>
                                </Grid>
                            </Grid>
                        )}
                    </DashboardGroup>
                </Grid>
                <Grid item md={6}>
                    <DashboardGroup title={"Account Activity"}>
                        {props.activityRecords &&
                            props.activityRecords.map((record) => {
                                return (
                                    <div
                                        style={{ margin: "10px 0" }}
                                        key={record.id}
                                    >
                                        <ActivityRecordThumbnail
                                            record={record}
                                            theme={"light"}
                                        />
                                    </div>
                                );
                            })}
                        {(!props.activityRecords ||
                            props.activityRecords.length < 1) && (
                            <p className={styleClasses.pTextStyles}>
                                None yet!
                            </p>
                        )}
                    </DashboardGroup>
                </Grid>
                <Grid item md={6}>
                    <DashboardGroup title={"Documents"}>
                        {props.documents?.map?.((document) => (
                            <div key={document.id} style={{ marginBottom: 10 }}>
                                <DocumentThumbnail document={document} />
                            </div>
                        ))}
                        {(!props.documents || props.documents.length < 1) && (
                            <p className={styleClasses.pTextStyles}>
                                No documents yet!
                            </p>
                        )}
                    </DashboardGroup>
                </Grid>
                <Grid item md={6}>
                    <DashboardGroup
                        title={"Savings Calculator"}
                        noPadding={true}
                    >
                        {props.listings.length < 1 && (
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                mb={2}
                            >
                                <Grid item>
                                    <p className={styleClasses.pTextStyles}>
                                        List a home to determine how much you'll
                                        save.
                                    </p>
                                </Grid>
                                <Grid item>
                                    <Button
                                        href="/account/listings/create"
                                        children={"List now!"}
                                        sx={styles.btnStyles}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        {props.listings.length >= 1 && (
                            <div className={styleClasses.savingsCard}>
                                <div>
                                    <span>You could save</span>
                                    <span>
                                        {formatCurrency(
                                            activeListings.reduce(
                                                (total, listing) =>
                                                    total +
                                                    Listings.calculateSavings(
                                                        listing.askingPrice
                                                    ),
                                                0
                                            ),
                                            { omitDecimal: true }
                                        )}
                                    </span>
                                    <span>On your current properties</span>
                                </div>
                                <div>
                                    <span>You have saved</span>
                                    <span>
                                        {formatCurrency(
                                            closedListings.reduce(
                                                (total, listing) =>
                                                    total +
                                                    Listings.calculateSavings(
                                                        listing.askingPrice
                                                    ),
                                                0
                                            ),
                                            { omitDecimal: true }
                                        )}
                                    </span>
                                    <span>Using Realsy so far</span>
                                </div>
                            </div>
                        )}
                    </DashboardGroup>
                </Grid>
                <Grid item md={6}>
                    <DashboardGroup title={"Calendar"} interiorScroll={false}>
                        <UserCalendar showSidebar={false} condensed={true} />
                    </DashboardGroup>
                </Grid>
            </Grid>
        </Fragment>
    );
};

UserDashboardPage.getInitialProps = async () => {
    const userProfileResult = await UserProfile.getProfile();
    const activityRecordsResult = await ApiClient.get(
        ApiRoutes.CurrentUserActivityRecords
    );
    const savedListingsResult = await Listings.getSaved();
    const listingsResult = await Listings.getOwnedListings();
    const documentsResponse = await ApiClient.get(ApiRoutes.UserDocuments);
    return {
        userProfile: userProfileResult.profile,
        activityRecords: activityRecordsResult.data,
        listings: listingsResult.listings,
        savedListings: savedListingsResult.listings,
        documents: documentsResponse.data,
    };
};

UserDashboardPage.defaultLayout = useAccountPageLayout;
UserDashboardPage.requiresAuth = true;

export default UserDashboardPage;
