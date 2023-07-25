import * as React from "react";
import { useActivityRecordThumbnailStyles } from "./activity-record-thumbnail.styles";
// import { Button, ButtonVariant } from "components/button";
import Uploads from "api/uploads";
import Colors from "styles/colors";
import { ApiRoutes } from "api/api-routes";
import { UserActivityRecordDto } from "api/notifications/user-activity-record.dto";
import { FC } from "react";
import { Button, Grid, Typography } from "@mui/material";

/**
 * A thumbnail view of a user activity record
 */

export type ActivityRecordThumbnailProps = {
    record: UserActivityRecordDto;
    theme?: "dark" | "light";
};

const defaultProps: Partial<ActivityRecordThumbnailProps> = {
    theme: "dark",
};

export const ActivityRecordThumbnail: FC<ActivityRecordThumbnailProps> = (
    props
) => {
    const styleClasses = useActivityRecordThumbnailStyles(props);

    let imageUrl = ApiRoutes.listingMainPhotoUrl(
        props.record.listing?.id ?? 0,
        { format: "thumbnail" }
    );
    let buttonText = "Details";

    if (props.record.typeCode === "chat") {
        imageUrl = Uploads.getUserProfilePhotoUrl(
            props.record.extra?.senderId,
            { format: "small" }
        );
        buttonText = "Reply";
    }

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item md={4}>
                    <Typography
                        variant="h3"
                        color="#144659"
                        fontWeight={700}
                        fontFamily="poppins !important"
                    >
                        {props.record.title}
                    </Typography>
                    <Typography
                        vairant="subtitle1"
                        mt={1}
                        color="#a9a9a9"
                        fontWeight={400}
                        fontFamily="poppins !important"
                    >
                        {props.record.body}
                    </Typography>
                    <Typography
                        vairant="subtitle1"
                        mt={2}
                        color="#144659"
                        fontWeight={700}
                        fontFamily="poppins !important"
                    >
                        {new Date(props.record.created_at).toLocaleDateString()}
                    </Typography>
                </Grid>
                <Grid item md={2}>
                    {props.theme === "dark" && (
                        <div>
                            {props.record.listing && (
                                <span>
                                    <img
                                        src={"/icon-location-yellow.svg"}
                                        style={{
                                            position: "relative",
                                            top: 2,
                                            marginRight: 5,
                                        }}
                                        alt={""}
                                    />
                                    {props.record.listing.address}{" "}
                                    {props.record.listing.city},{" "}
                                    {props.record.listing.state}
                                </span>
                            )}
                            {!props.record.listing && <span />}
                            <span>
                                <Button
                                    sx={{
                                        py: 1,
                                        px: 4,
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
                                    href={props.record.link}
                                >
                                    {buttonText}
                                </Button>
                            </span>
                        </div>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

ActivityRecordThumbnail.defaultProps = defaultProps;
