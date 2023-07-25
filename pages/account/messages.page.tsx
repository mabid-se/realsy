import React, { useState } from "react";
import { useAccountPageLayout } from "layout/account-page-layout";
import Chat from "api/chat";
import Select from "components/form-fields/select";
import { UserChat } from "components/user-chat";
import { useAuthContext } from "api/auth/auth-context";
import { useMessagesPageStyles } from "pages/account/messages.page.styles";
import { useViewListingContext } from "contexts/view-listing-context";
import Head from "next/head";
import { AppInfo } from "app-info";
import { Breadcrumbs } from "layout/account-page-layout/breadcrumbs";
import { NextPageContext } from "next";
import { UserChatDto } from "api/chat/user-chat.dto";
import { AppPage } from "pages/app-page.type";
import { getCurrentApiToken } from "api/auth/auth-functions";
import { Grid, Typography } from "@mui/material";

/**
 * The user messages page
 */

export type UserMessagesPageProps = {
    chats: UserChatDto[];
};

const UserMessagesPage: AppPage<UserMessagesPageProps> = (props) => {
    const styleClasses = useMessagesPageStyles();
    const authContext = useAuthContext();
    const viewListingContext = useViewListingContext();
    const [activeChatId, setActiveChatId] = useState<number>(
        props.chats?.[0]?.id
    );

    if (props.chats.length < 1) {
        return (
            <>
                <Head>
                    <title>{AppInfo.name}: My Messages</title>
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
                            My Messages
                        </Typography>
                    </Grid>
                    <Grid item mt={4}>
                        <Typography
                            variant="h2"
                            color="#144659 !important"
                            fontWeight={400}
                            fontFamily="poppins !important"
                            textTransform="uppercase"
                        >
                            No Messages yet!
                        </Typography>
                    </Grid>
                </Grid>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{AppInfo.name}: My Messages</title>
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
                        My Messages
                    </Typography>
                </Grid>
            </Grid>

            <div className={styleClasses.messagesHeader}>
                <label>Select Chat</label>
                <div className={styleClasses.selectContainer}>
                    <Select
                        options={props.chats.map((chat) => {
                            const otherUser = chat.users?.filter(
                                (user) =>
                                    user.id !== authContext.currentUser?.id
                            )?.[0];
                            return {
                                value: chat.id,
                                label: `${chat.listing?.address} - ${
                                    otherUser.name
                                        ? otherUser.name
                                        : otherUser.email
                                }`,
                            };
                        })}
                        value={activeChatId}
                        onChange={(selected) => setActiveChatId(selected.value)}
                    />
                </div>

                {activeChatId && (
                    <button
                        className={styleClasses.openListingButton}
                        onClick={() => {
                            const activeChat = props.chats.filter(
                                (chat) => chat.id === activeChatId
                            )[0];
                            if (activeChat.listing) {
                                viewListingContext.showListing(
                                    activeChat.listing
                                );
                            }
                        }}
                    >
                        View Listing
                    </button>
                )}
            </div>

            <br />

            {activeChatId && (
                <div style={{ maxWidth: 500 }}>
                    <UserChat chatId={activeChatId} showChattingWith={true} />
                </div>
            )}
        </>
    );
};

UserMessagesPage.getInitialProps = async (context: NextPageContext) => {
    const chatsResponse = await Chat.getMyChats(getCurrentApiToken(context));
    return {
        chats: chatsResponse.chats,
    };
};

UserMessagesPage.defaultLayout = useAccountPageLayout;
export default UserMessagesPage;
