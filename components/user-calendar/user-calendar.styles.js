import Colors from "styles/colors";
import Fonts from "styles/fonts";
import { createUseStyles } from "react-jss";

export const userCalendarStyles = {
    wrapper: {},
    calendar: {
        // every "piece" of the calendar is a button
        "& button": {
            background: "none",
            border: "none",
            outline: "none",
        },
        // the current month label
        "& .react-calendar__navigation__label": {
            fontFamily: "poppins",
            fontSize: "32px",
            color: Colors.mediumBlue,
            width: "auto",
            cursor: "pointer",
        },
        // the previous/next month arrows
        "& .react-calendar__navigation__arrow": {
            fontSize: "64px",
            color: Colors.mediumBlue,
            cursor: "pointer",
        },
        // the weekday labels
        "& .react-calendar__month-view__weekdays": {
            background: "#e6e6e6",
            color: "#4d4d4d",
            fontWight: 700,
            fontFamily: "poppins",
            textAlign: "center",
            padding: 10,
            "& abbr": { textDecoration: "none" },
        },
        // the "day" buttons
        "& .react-calendar__month-view__days__day": {
            boxSizing: "border-box",
            paddingTop: 20,
            paddingBottom: 20,
            color: "#444",
            fontWight: 700,
            fontFamily: "poppins",
            "&:focus": { outline: "none" },
            ".condensed &": { paddingTop: 10, paddingBottom: 10 },
        },
        // the "today" date
        "& .react-calendar__tile--now": {
            "& abbr": {
                backgroundColor: Colors.mediumBlue,
                color: "#ffffff",
                width: 37,
                height: 37,
                borderRadius: "50%",
                display: "inline-block",
            },
        },
        // "neighbouring month" days (in view, but outside of current month)
        "& .react-calendar__month-view__days__day--neighboringMonth": {
            color: "#ccc",
        },
    },
    sidebar: {},

    calendarEventDotContainer: {
        position: "relative",
        width: "100%",
        height: "100%",
        textAlign: "center",
        cursor: "pointer",
    },

    calendarEventDot: {
        width: 10,
        height: 10,
        backgroundColor: Colors.pink,
        borderRadius: "50%",
        cursor: "pointer",
        textAlign: "center",
        top: -26,
        right: "15%",
        position: "absolute",
        zIndex: 99,
    },

    filterSelect: { marginBottom: 20 },

    "@media (min-width: 1100px)": {
        wrapper: {
            "&.with-sidebar": {
                display: "grid",
                gridTemplateColumns: "65% 35%",
            },
        },
        calendar: {
            padding: 40,
            // the "day" buttons
            "& .react-calendar__month-view__days__day": {
                paddingTop: 30,
                paddingBottom: 30,
                ".condensed &": {
                    paddingTop: 15,
                    paddingBottom: 15,
                },
            },
            // the "today" date
            "& .react-calendar__tile--now": { "& abbr": { padding: 10 } },
        },
        sidebar: { paddingLeft: 30 },
    },
};

export const useUserCalendarStyles = createUseStyles(userCalendarStyles);
