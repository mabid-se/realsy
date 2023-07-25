import * as React from "react";
import { useAccountPageLayout } from "layout/account-page-layout";
import { ActivityRecordThumbnail } from "components/activity-record-thumbnail";
import { createUseStyles } from "react-jss";
import { Fragment, useEffect, useState } from "react";
import { useAuthContext } from "api/auth/auth-context";
import { UserActivityRecordDto } from "api/notifications/user-activity-record.dto";
import { AppPage } from "pages/app-page.type";
import { Breadcrumbs } from "layout/account-page-layout/breadcrumbs";
import { Logger } from "util/logging";
import { ApiRoutes } from "api/api-routes";
import { Loader } from "components/loader";
import { getApiClient } from "api/api-client";
import { Button, Grid, Paper, Typography } from "@mui/material";

const logger = Logger("account-activity-page");

/**
 * The user account activity page
 */

const useAccountActivityPageStyles = createUseStyles({
    userAccountActivityPage: {
        display: "grid",
        gridGap: 20,
        "@media (min-width: 1300px)": {
            gridTemplateColumns: "1fr 1fr",
        },
    },
});

const AccountActivityPage: AppPage = () => {
    const styleClasses = useAccountActivityPageStyles();
    const authContext = useAuthContext();
    const apiClient = getApiClient(authContext.apiToken);
    const [activityRecords, setActivityRecords] = useState<
        UserActivityRecordDto[]
    >([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setIsFetching(true);
            try {
                const activityRecordsResponse = await apiClient.get<
                    UserActivityRecordDto[]
                >(ApiRoutes.CurrentUserActivityRecords);
                setActivityRecords(activityRecordsResponse.data);
                logger.debug(
                    "Fetched account activity records",
                    activityRecordsResponse.data
                );
            } catch (e) {
                logger.error("Error fetching account activity", e);
            }
            setIsFetching(false);
        })();
    }, []);

    // we add a "you signed up" record which is not actually recorded in the database
    const fakeSignUpRecord: UserActivityRecordDto = {
        id: 0,
        title: "You joined Realsy!",
        created_at: new Date(authContext.currentUser?.created_at ?? ""),
        body: "Thanks for joining us at Realsy!",
        seen: true,
    };

    return (
        <>
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
                        Account Activity
                    </Typography>
                </Grid>
                <Grid item mt={4}>
                    <Paper elevation={6} sx={{ borderRadius: 4, p: 3 }}>
                        <Grid
                            container
                            justifyContent="space-between"
                            sx={{
                                backgroundColor: "#fafafa",
                                boxShadow: `0px 0px 4px rgba(0,0,0,0.25)`,
                                borderRadius: 4,
                                p: 3,
                            }}
                        >
                            <Grid item xs={12}>
                                {isFetching && <Loader />}

                                {!isFetching && (
                                    <div
                                    // className={
                                    //     styleClasses.userAccountActivityPage
                                    // }
                                    >
                                        {activityRecords
                                            .concat([fakeSignUpRecord])
                                            .map((record) => {
                                                return (
                                                    <Fragment key={record.id}>
                                                        <ActivityRecordThumbnail
                                                            record={record}
                                                        />
                                                    </Fragment>
                                                );
                                            })}
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            {/* <Breadcrumbs currentPageTitle={'Account Activity'}/> */}
        </>
    );
};

AccountActivityPage.defaultLayout = useAccountPageLayout;
AccountActivityPage.requiresAuth = true;

export default AccountActivityPage;
