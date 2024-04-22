import FlashMessage from "@/Components/FlashMessage";
import { DashboardSidebar } from "@/Components/navigation/DashboardSidebar";
import { Link, usePage } from "@inertiajs/react";
import {
    ActionIcon,
    Anchor,
    AppShell,
    Avatar,
    Burger,
    Button,
    Code,
    Group,
    Image,
    LoadingOverlay,
    Menu,
    Space,
    Text,
} from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconQuestionMark, IconSettings } from "@tabler/icons-react";
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
                            <Link href="/">
                                <Image
                                    src={
                                        "https://velcro.is3.cloudhost.id/tanyanyaid_logotext_md-08.png"
                                    }
                                    w={150}
                                />
                            </Link>
                            <Code fw={700}>v3.1.2</Code>
                        </Group>
                    </Group>
                    <Menu width={200}>
                        <Menu.Target>
                            <Avatar
                                component="button"
                                radius={"xl"}
                                src={auth?.user?.profile_photo_url}
                            />
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item>
                                <Text size="sm" c="dimmed">
                                    {auth?.user?.name}
                                </Text>
                            </Menu.Item>
                            <Menu.Divider my="sm" />
                            <Menu.Item>
                                <Button
                                    p={0}
                                    component={Link}
                                    href={route("page.index")}
                                    variant="transparent"
                                >
                                    Profile / Page Setting
                                </Button>
                            </Menu.Item>
                            <Menu.Item>
                                <Button
                                    p={0}
                                    component={Link}
                                    href={route("dashboard.setting")}
                                    variant="transparent"
                                >
                                    User Setting
                                </Button>
                            </Menu.Item>
                            <Menu.Divider my="sm" />
                            <Menu.Item>
                                <Link href={route("logout")} method="post">
                                    <Button
                                        p={0}
                                        color="red.5"
                                        variant="transparent"
                                    >
                                        Logout
                                    </Button>
                                </Link>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
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
