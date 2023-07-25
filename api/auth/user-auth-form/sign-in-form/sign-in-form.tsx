import React, { FC } from "react";
import { useState } from "react";
import { Button } from "components/button";
import { useSignInFormStyles } from "api/auth/user-auth-form/sign-in-form/sign-in-form.styles";
import { TextInput } from "components/form-fields/text-input";
import { isValidEmail } from "util/is-valid-email";
import { NotificationManager } from "react-notifications";
import Colors from "styles/colors";
import axios from "axios";
import { ApiRoutes } from "api/api-routes";
import {
    // Button,
    FormControl,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         "& .MuiOutlinedInput-root": {
//             borderRadius: 12,
//             backgroundColor: "#fafafa",
//             "& fieldset": {
//                 borderColor: "#E0E0E0",
//             },
//             "&:hover fieldset": {
//                 borderColor: "black.400",
//             },
//             "&.Mui-focused fieldset": {
//                 borderColor: "#4d4d4d",
//             },
//         },
//         "& .MuiInputLabel-root": {
//             color: "#4d4d4d !important",
//             paddingX: 1,
//         },
//     },
// }));

export type SignInFormProps = {
    onSignInRequested?: (credentials: {
        email: string;
        password: string;
    }) => any;
    emailLabel?: string;
    passwordLabel?: string;
    buttonText?: string;
    showSigningIn?: boolean;
    resetPasswordButtonLabel?: string;
};

const defaultProps: Partial<SignInFormProps> = {
    emailLabel: "Email",
    passwordLabel: "Password",
    buttonText: "Sign In",
    resetPasswordButtonLabel: "Reset",
};

export const SignInForm: FC<SignInFormProps> = (props) => {
    const styles = useSignInFormStyles();
    // const classes = useStyles();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showForgotPassword, setShowForgotPassword] =
        useState<boolean>(false);
    const [isResettingPassword, setIsResettingPassword] =
        useState<boolean>(false);

    return (
        <>
            <form
                data-testid={"sign-in-form"}
                onSubmit={(e) => {
                    e.preventDefault();
                    props.onSignInRequested?.({ email, password });
                }}
                style={{ width: "535px" }}
            >
                {/* <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Email
                </Typography>
                <TextField
                    label={props.emailLabel}
                    data-testid={"email-input"}
                    value={email}
                    type={"email"}
                    name={"email"}
                    placeholder="Email"
                    onChange={(newValue) => setEmail(newValue)}
                    fullWidth
                    sx={{ mt: 1 }}
                    className={classes.root}
                />

                <Typography variant="subtitle1" sx={{ mt: 3, fontWeight: 600 }}>
                    Password
                </Typography>
                <TextField
                    data-testid={"password-input"}
                    value={password}
                    type={"password"}
                    name={"password"}
                    placeholder="Password"
                    onChange={(newValue) => setPassword(newValue)}
                    fullWidth
                    className={classes.root}
                    sx={{ mt: 1 }}
                /> */}
                <TextInput
                    label={props.emailLabel}
                    data-testid={"email-input"}
                    value={email}
                    type={"email"}
                    name={"email"}
                    onChange={(newValue) => setEmail(newValue)}
                />
                <TextInput
                    label={props.passwordLabel}
                    data-testid={"password-input"}
                    value={password}
                    type="password"
                    name={"password"}
                    onChange={(newValue) => setPassword(newValue)}
                />

                <div style={{ textAlign: "center", marginTop: 4 }}>
                    <Button
                        disableRipple
                        data-testid={"submit-button"}
                        loading={props.showSigningIn}
                        type={"submit"}
                        sx={{
                            mt: 2,
                            py: 1,
                            px: 4,
                            color: "#ffffff",
                            fontWeight: 600,
                            textTransform: "capitalize",
                            letterSpacing: 1,
                            border: 2,
                            background: "#144659",
                            borderColor: "#144659",
                            borderRadius: 3,
                            "&:hover": {
                                color: "#144659",
                            },
                        }}
                    >
                        Sign In
                    </Button>
                </div>
            </form>

            <div style={{ textAlign: "right" }}>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        if (!isValidEmail(email)) {
                            NotificationManager.error(
                                "Please enter a valid email"
                            );
                            return;
                        }

                        setIsResettingPassword(true);

                        try {
                            await axios.post(
                                ApiRoutes.BaseUrl +
                                    ApiRoutes.UserForgotPassword,
                                {
                                    email,
                                }
                            );
                            NotificationManager.success(
                                "Please check your email",
                                "Password reset sent"
                            );
                        } catch (e) {
                            let message =
                                e.response.data.message?.[0]?.messages?.[0]
                                    ?.id === "Auth.form.error.user.not-exist"
                                    ? "No account exists for this email"
                                    : undefined;
                            NotificationManager.error(
                                message ?? "Failed password reset"
                            );
                        }

                        setIsResettingPassword(false);
                    }}
                >
                    <div className={styles.forgotPassword}>
                        <p style={{ fontSize: "13px" }}>
                            <button
                                type={"button"}
                                onClick={() => setShowForgotPassword(true)}
                                style={{
                                    color: "#1e1e1e",
                                    fontSize: "16px",
                                    background: "none",
                                    border: "none",
                                    outline: "none",
                                    cursor: "pointer",
                                    marginTop: 0,
                                    fontWeight: 500,
                                }}
                            >
                                Forgot Password?
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
};

SignInForm.defaultProps = defaultProps;
