import React, { FC, useState } from "react";
import {
    SignInForm,
    SignInFormProps,
} from "api/auth/user-auth-form/sign-in-form";
// import { Button } from "components/button";
import RealsyLogo from "components/icons/realsy-logo";
import { ApiRoutes } from "api/api-routes";
import {
    RegisterForm,
    RegisterFormProps,
} from "api/auth/user-auth-form/register-form";
import { useUserAuthFormStyles } from "api/auth/user-auth-form/user-auth-form.styles";
import { Button, Grid, Typography } from "@mui/material";
import { style } from "@mui/system";

/**
 * A form for user sign-in or registration
 */

export type UserAuthFormProps = {
    onSignInRequested?: (credentials: {
        email: string;
        password: string;
    }) => any;
    onRegisterRequested?: (credentials: {
        email: string;
        password: string;
    }) => any;
    onPasswordResetRequested?: (email: string) => any;
    signInTabText?: string;
    registerTabText?: string;
    signInFacebookLabel?: string;
    signInFacebookUrl?: string;
    signInGoogleLabel?: string;
    signInGoogleUrl?: string;
    signInFormProps?: SignInFormProps;
    registerFormProps?: RegisterFormProps;
};

const defaultProps: Partial<UserAuthFormProps> = {
    signInTabText: "Sign In",
    registerTabText: "Create an Account",
    signInFacebookLabel: "Sign in with Facebook",
    signInFacebookUrl: ApiRoutes.BaseUrl + ApiRoutes.InitOauthFacebook,
    signInGoogleLabel: "Sign in with Google",
    signInGoogleUrl: ApiRoutes.BaseUrl + ApiRoutes.InitOauthGoogle,
    signInFormProps: SignInForm.defaultProps,
    registerFormProps: RegisterForm.defaultProps,
};

export const UserAuthForm: FC<UserAuthFormProps> = (props) => {
    const styleClasses = useUserAuthFormStyles();
    const [showRegister, setShowRegister] = useState(false);
    // const [isLoadingFacebook, setIsLoadingFacebook] = useState(false);
    // const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                data-testid={"sign-in-modal"}
                className={styleClasses.UserAuthForm}
                sx={{ p: 6 }}
            >
                <Grid item textAlign="center">
                    <RealsyLogo className={styleClasses.headerLogo} />
                </Grid>

                <Grid item mt={4}>
                    {!showRegister && (
                        <SignInForm
                            onSignInRequested={props.onSignInRequested}
                            {...props.signInFormProps}
                        />
                    )}
                    {showRegister && (
                        <div className={styleClasses.registerContainer}>
                            <RegisterForm
                                onRegisterRequested={props.onRegisterRequested}
                            />
                        </div>
                    )}
                </Grid>

                <Grid item textAlign="center" sx={{ mt: 3 }}>
                    <Typography
                        sx={{
                            color: "#1e1e1e",
                            fontSize: "18px",
                            fontWeight: 500,
                        }}
                    >
                        {!showRegister && (
                            <>
                                Don't have an account?&nbsp;
                                <span
                                    data-testid={"register-button"}
                                    onClick={() => setShowRegister(true)}
                                    style={{
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                    }}
                                >
                                    Sign Up
                                </span>
                            </>
                        )}
                        {showRegister && (
                            <>
                                Already have an account?&nbsp;
                                <span
                                    data-testid={"sign-in-button"}
                                    onClick={() => setShowRegister(false)}
                                    style={{
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                    }}
                                >
                                    Sign In
                                </span>
                            </>
                        )}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

UserAuthForm.defaultProps = defaultProps;
