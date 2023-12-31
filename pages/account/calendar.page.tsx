import * as React from "react";
import { useAccountPageLayout } from "layout/account-page-layout";
import UserCalendar from "components/user-calendar";
import { useEffect } from "react";
import { useNotificationsContext } from "contexts/notifications-context";
import Head from "next/head";
import { AppInfo } from "app-info";
import { Breadcrumbs } from "layout/account-page-layout/breadcrumbs";
import { AppPage } from "pages/app-page.type";
import { Grid, Typography } from "@mui/material";

/**
 * The user calendar page
 */

const UserCalendarPage: AppPage = () => {
    const notificationsContext = useNotificationsContext();

    useEffect(() => {
        notificationsContext.clearNotificationsForContent("scheduled-event");
    }, []);

    return (
        <>
            <Head>
                <title>{AppInfo.name}: My Calendar</title>
            </Head>
            {/* <Breadcrumbs currentPageTitle={"My Calendar"} /> */}

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
                        My Calender
                    </Typography>
                </Grid>
                <Grid item mt={4}>
                    <UserCalendar />
                </Grid>
            </Grid>
        </>
    );
};

UserCalendarPage.defaultLayout = useAccountPageLayout;
UserCalendarPage.requiresAuth = true;

export default UserCalendarPage;
