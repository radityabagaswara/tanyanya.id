import "./bootstrap";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

const theme = createTheme({
    colors: {
        "tanya-pink": [
            "#FF7DB6",
            "#FF669F",
            "#FF4E88",
            "#FB4983",
            "#D8416F",
            "#B5375A",
            "#912D45",
            "#6E2331",
            "#4B192C",
            "#280F18",
        ],
    },
    primaryColor: "tanya-pink",
    primaryShade: 3,

    fontFamily: "Inter, sans-serif",
    defaultRadius: "md",
    focusRing: "never",
    components: {
        Card: {
            defaultProps: {
                bg: "white",
                withBorder: true,
            },
        },
        CardSection: {
            defaultProps: {
                p: "lg",
            },
        },
    },
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <MantineProvider theme={theme}>
                <Notifications />
                <App {...props} />
            </MantineProvider>
        );
    },
    progress: {
        color: "#FB4983",
    },
});
