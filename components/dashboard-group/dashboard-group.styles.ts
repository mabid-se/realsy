import { createUseStyles } from "react-jss";
import Colors from "styles/colors";

export const dashboardGroupStyles = {
    dashboardGroup: {
        maxWidth: "100%",
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        boxShadow: Colors.defaultShadow,
        marginBottom: 30,

        "& h2": {
            color: "#144659",
            fontFamily: "poppins",
            fontSize: 18,
            margin: 0,
            padding: "16px 22px",
        },

        "& .dashboard-group-body": { padding: 15 },

        "&.interior-scroll": {
            "& .dashboard-group-body": { maxHeight: 390, overflowY: "scroll" },
        },

        "&.no-padding": { "& .dashboard-group-body": { padding: 0 } },

        "&.no-border": {
            border: "none",
            boxShadow: "none",
            overflow: "visible",
            "& h2": { borderRadius: "5px 5px 0 0" },
        },
    },
};

export const useDashboardGroupStyles = createUseStyles(dashboardGroupStyles);
