import FlashMessage from "@/Components/FlashMessage";
import { DashboardSidebar } from "@/Components/navigation/DashboardSidebar";
import { usePage } from "@inertiajs/react";
import {
    ActionIcon,
    AppShell,
    Avatar,
    Burger,
    Code,
    Group,
    Image,
    LoadingOverlay,
    Space,
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";

interface Props {
    children: React.ReactNode;
    title?: string;
    loading?: boolean;
}

const DashboardLayout = ({ children, title, loading }: Props) => {
    const [isMobile, setIsMobile] = useState(false);
    const [opened, { open, close, toggle }] = useDisclosure();
    const { width } = useViewportSize();
    const { errors, success, auth }: any = usePage().props;

    useEffect(() => {
        if (width <= 768) {
            setIsMobile(true);
            close();
        } else {
            setIsMobile(false);
        }
    }, [width]);

    useEffect(() => {
        if (errors.error) {
            notifications.show({
                message: errors.error,
                color: "red",
                title: "There was an error while processing your request!",
            });
        }

        if (success) {
            notifications.show({
                title: success.title as string,
                message: success.message as string,
                color: "green",
            });
        }
    }, [errors, success]);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 250,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <FlashMessage />

            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="sm"
                            size="sm"
                        />
                        <Group align="center" justify="space-between">
                            <Image
                                src={
                                    "https://velcro.is3.cloudhost.id/tanyanyaid_logotext_md-08.png"
                                }
                                w={150}
                            />
                            <Code fw={700}>v3.1.2</Code>
                        </Group>
                    </Group>
                    <Avatar
                        component="button"
                        radius={"xl"}
                        src={auth?.user?.profile_photo_url}
                    />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <DashboardSidebar />
            </AppShell.Navbar>
            <AppShell.Main className="bg-neutral-50">{children}</AppShell.Main>
        </AppShell>
    );
};

export default DashboardLayout;
