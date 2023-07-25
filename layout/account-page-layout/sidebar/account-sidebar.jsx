import React from "react";
import Link from "next/link";
import CalendarIcon from "components/icons/calendar";
import DashboardIcon from "components/icons/dashboard";
import ListingsIcon from "components/icons/listings";
import SavedListingsIcon from "components/icons/saved-listing";
import DocumentIcon from "components/icons/document";
import AccountActivityIcon from "components/icons/account-activity";
import LogoutIcon from "components/icons/log-out";
import { useAuthContext } from "api/auth/auth-context";
import { useRouter } from "next/router";
import { useAccountSidebarStyles } from "layout/account-page-layout/sidebar/account-sidebar.styles";
import MessageIcon from "components/icons/message";
import Uploads from "api/uploads";
import { useNotificationsContext } from "contexts/notifications-context";
import { Fade } from "react-awesome-reveal";
import { AppRoute } from "pages/app-routes";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";

/**
 * The side bar for account pages
 */
const AccountSidebar = () => {
    const authContext = useAuthContext();
    const notificationsContext = useNotificationsContext();
    const router = useRouter();
    const styles = useAccountSidebarStyles();

    const listingsNotifications =
        notificationsContext.getNotificationsForSecondaryRelatedContent(
            "listing"
        );
    // we filter listing notifications to just offer notifications, as other "secondary related" notifications
    // are shown in the respective sidebar menu item
    const listingOfferNotifications = listingsNotifications.filter(
        (notification) => notification.contentType === "offer"
    );
    const chatNotifications =
        notificationsContext.getNotificationsForContentType("chat");
    const calendarNotifications =
        notificationsContext.getNotificationsForContentType("scheduled-event");

    return (
        <>
            <div className={styles.accountSidebar}>
                <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="stretch"
                >
                    {/* ---| Profile Snapshot |--- */}
                    <Grid
                        item
                        p={{ md: 1, lg: 2, xl: 3 }}
                        textAlign="center"
                        className="profile-snapshot"
                    >
                        <Grid container spacing={{ md: 1, xl: 2 }}>
                            <Grid item xs={12}>
                                <Link href={AppRoute.UserProfile}>
                                    <a>
                                        <div
                                            className={styles.userPhoto}
                                            style={{
                                                backgroundImage: `url(${Uploads.getUserProfilePhotoUrl(
                                                    authContext.currentUser?.id
                                                )}`,
                                            }}
                                        />
                                    </a>
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h3"
                                    fontFamily="Poppins !important"
                                    fontWeight={700}
                                    textAlign="center"
                                >
                                    <>
                                        <Link href={AppRoute.UserProfile}>
                                            <a
                                                style={{
                                                    textDecoration: "none",
                                                    marginRight: "15px",
                                                }}
                                            >
                                                {authContext.currentUser
                                                    ?.name || "My Profile"}
                                            </a>
                                        </Link>
                                        <Link href={AppRoute.UserProfile}>
                                            <img
                                                src="/edit-profile.png"
                                                alt="edit-profile"
                                                width="4%"
                                            />
                                        </Link>
                                    </>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* ---| Menu Item List |--- */}
                    <Grid item py={{ xl: 2 }}>
                        <ul>
                            <li
                                className={
                                    router.pathname.indexOf("dashboard") !== -1
                                        ? "active"
                                        : ""
                                }
                            >
                                <Link href={AppRoute.UserDashboard}>
                                    <a data-testid={"sidebar-link-dashboard"}>
                                        <Grid
                                            container
                                            direction="row"
                                            spacing={2}
                                        >
                                            <Grid item>
                                                <DashboardIcon />
                                            </Grid>
                                            <Grid item>Dashboard</Grid>
                                        </Grid>
                                    </a>
                                </Link>
                            </li>
                            <li
                                className={
                                    router.pathname.indexOf("listings") !==
                                        -1 &&
                                    router.pathname.indexOf("saved") === -1
                                        ? "active"
                                        : ""
                                }
                            >
                                <Link href={"/account/listings"}>
                                    <a data-testid={"sidebar-link-listings"}>
                                        <Grid
                                            container
                                            direction="row"
                                            spacing={2}
                                        >
                                            <Grid item>
                                                <ListingsIcon />
                                            </Grid>
                                            <Grid item>
                                                My Listings
                                                {listingOfferNotifications.length >
                                                    0 && (
                                                    <Fade>
                                                        <span
                                                            className={
                                                                styles.notification
                                                            }
                                                        >
                                                            {
                                                                listingOfferNotifications.length
                                                            }
                                                        </span>
                                                    </Fade>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </a>
                                </Link>
                            </li>
                            <li
                                className={
                                    router.pathname.indexOf(
                                        "saved-listings"
                                    ) !== -1
                                        ? "active"
                                        : ""
                                }
                            >
                                <Link href={"/account/saved-listings"}>
                                    <a
                                        data-testid={
                                            "sidebar-link-saved-listings"
                                        }
                                    >
                                        <Grid
                                            container
                                            direction="row"
                                            spacing={2}
                                        >
                                            <Grid item>
                                                <SavedListingsIcon />
                                            </Grid>
                                            <Grid item>Saved Listings</Grid>
                                        </Grid>
                                    </a>
                                </Link>
                            </li>
                            <li
                                className={
                                    router.pathname.indexOf("calendar") !== -1
                                        ? "active"
                                        : ""
                                }
                            >
                                <Link href={"/account/calendar"}>
                                    <a data-testid={"sidebar-link-calendar"}>
                                        <Grid
                                            container
                                            direction="row"
                                            spacing={2}
                                        >
                                            <Grid item>
                                                <CalendarIcon />
                                            </Grid>
                                            <Grid item>
                                                Calender
                                                {calendarNotifications.length >
                                                    0 && (
                                                    <Fade>
                                                        <span
                                                            className={
                                                                styles.notification
                                                            }
                                                        >
                                                            {
                                                                calendarNotifications.length
                                                            }
                                                        </span>
                                                    </Fade>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </a>
                                </Link>
                            </li>
                            <li
                                className={
                                    router.pathname.indexOf("documents") !== -1
                                        ? "active"
                                        : ""
                                }
                            >
                                <Link href={"/account/documents"}>
                                    <a data-testid={"sidebar-link-documents"}>
                                        <Grid
                                            container
                                            direction="row"
                                            spacing={2}
                                        >
                                            <Grid item>
                                                <DocumentIcon />
                                            </Grid>
                                            <Grid item> Documents</Grid>
                                        </Grid>
                                    </a>
                                </Link>
                            </li>
                            <li
                                className={
                                    router.pathname.indexOf("messages") !== -1
                                        ? "active"
                                        : ""
                                }
                            >
                                <Link href={"/account/messages"}>
                                    <a data-testid={"sidebar-link-messages"}>
                                        <Grid
                                            container
                                            direction="row"
                                            spacing={2}
                                        >
                                            <Grid item>
                                                <MessageIcon />
                                            </Grid>
                                            <Grid item>
                                                Messages
                                                {chatNotifications.length >
                                                    0 && (
                                                    <Fade>
                                                        <span
                                                            className={
                                                                styles.notification
                                                            }
                                                        >
                                                            {
                                                                chatNotifications.length
                                                            }
                                                        </span>
                                                    </Fade>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </a>
                                </Link>
                            </li>
                            <li
                                className={
                                    router.pathname.indexOf("activity") !== -1
                                        ? "active"
                                        : ""
                                }
                            >
                                <Link href={"/account/activity"}>
                                    <a data-testid={"sidebar-link-activity"}>
                                        <Grid
                                            container
                                            direction="row"
                                            spacing={2}
                                        >
                                            <Grid item>
                                                <AccountActivityIcon />
                                            </Grid>
                                            <Grid item>Account Activity</Grid>
                                        </Grid>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </Grid>

                    <Grid item sx={{ position: "absolute", bottom: 0 }}>
                        <Link href={"/account/activity"}>
                            <a data-testid={"sidebar-link-activity"}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item>
                                        <LogoutIcon />
                                    </Grid>
                                    <Grid item>Log Out</Grid>
                                </Grid>
                            </a>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default AccountSidebar;
