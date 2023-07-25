import React from "react";
import PropTypes from "prop-types";
import AccountSidebar from "layout/account-page-layout/sidebar";
import { useMainLayout as useMainLayout } from "layout/main-layout";
import { useAccountLayoutStyles } from "layout/account-page-layout/account-page-layout.styles";
import { Grid } from "@mui/material";

const AccountLayout = (props) => {
    const styleClasses = useAccountLayoutStyles();
    return (
        <>
            <Grid
                container
                direction="row"
                sx={{
                    marginTop: { lg: 8 },
                    backgroundImage: `url("/white-art-bg.png")`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom center",
                    backgorundRepeat: "no-repeat",
                }}
            >
                <Grid item md={3}>
                    <AccountSidebar userProfile={props.userProfile} />
                </Grid>
                <Grid item md={9}>
                    {props.children}
                </Grid>
            </Grid>
        </>
    );
};

/**
 * Props
 */
AccountLayout.propTypes = {
    userProfile: PropTypes.object.isRequired,
    noPadding: PropTypes.bool,
    hideFooter: PropTypes.bool,
};

AccountLayout.defaultProps = {
    userProfile: {},
    noPadding: false,
    hideFooter: true,
};

/**
 * Wraps a given page in the account page layout
 * @param page
 * @param globalContent
 * @returns {*}
 */
export const useAccountPageLayout = (page, { globalContent = {} } = {}) =>
    useMainLayout(
        <AccountLayout
            userProfile={page.props.userProfile}
            noPadding={page.props.noPadding}
            hideFooter={page.props.hideFooter}
        >
            {page}
        </AccountLayout>,
        { globalContent }
    );

export default AccountLayout;
