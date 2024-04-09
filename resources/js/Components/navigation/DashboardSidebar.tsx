import { useState } from "react";
import { Group, Code, Image, NavLink, Box, ThemeIcon } from "@mantine/core";
import {
    IconSwitchHorizontal,
    IconLogout,
    IconLayoutDashboard,
    IconSettings2,
    IconCalendarStats,
} from "@tabler/icons-react";
import { Link } from "@inertiajs/react";
import { LinksGroupProps, NavbarLinksGroup } from "./NavbarLinkGroup";

const links: LinksGroupProps[] = [
    {
        label: "Dashboard",
        icon: IconLayoutDashboard,
        href: route("dashboard"),
    },
    {
        label: "Releases",
        icon: IconCalendarStats,
        links: [
            { label: "Upcoming releases", href: "/" },
            { label: "Previous releases", href: "/" },
            { label: "Releases schedule", href: "/" },
        ],
    },
];

export function DashboardSidebar() {
    const [active, setActive] = useState("Billing");

    return (
        <nav className={"min-h-screen"}>
            <NavbarLinksGroup links={links} />
        </nav>
    );
}
