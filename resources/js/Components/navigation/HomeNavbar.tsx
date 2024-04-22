import { PageProps } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import {
    Group,
    Button,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
    Image,
    Avatar,
    Anchor,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface INavLink {
    label: string;
    href: string;
}

const navigation: INavLink[] = [
    {
        label: "Explore",
        href: route("explore"),
    },
];

export function HomeNavBar() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);
    const page: any = usePage().props;

    return (
        <Box className=" border-b border-gray-300 dark:border-gray-600 fixed top-0 w-full z-40 bg-white">
            <header className={"container mx-auto h-16 px-4"}>
                <Group justify="space-between" h="100%">
                    <Link href="/">
                        <Image
                            src={
                                "https://velcro.is3.cloudhost.id/tanyanyaid_logotext_md-08.png"
                            }
                            w={150}
                        />
                    </Link>
                    <Group h="100%" gap="sm" visibleFrom="sm">
                        {navigation.map((value, index) => {
                            return (
                                <Anchor
                                    key={index}
                                    component={Link}
                                    href={value.href}
                                >
                                    {value.label}
                                </Anchor>
                            );
                        })}
                        <Group visibleFrom="sm">
                            {page.auth.user ? (
                                <Button
                                    m={0}
                                    variant="transparent"
                                    leftSection={
                                        <Avatar
                                            color="tanya-pink"
                                            src={
                                                page.auth.user.profile_photo_url
                                            }
                                        >
                                            {page.auth.user.name[0]}
                                        </Avatar>
                                    }
                                    onClick={() => {
                                        router.visit("/dashboard");
                                    }}
                                ></Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        router.visit("/login");
                                    }}
                                >
                                    Login
                                </Button>
                            )}
                        </Group>
                    </Group>

                    <Burger
                        opened={drawerOpened}
                        onClick={toggleDrawer}
                        hiddenFrom="sm"
                    />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm" />

                    {navigation.map((value, index) => {
                        return (
                            <Anchor
                                key={index}
                                component={Link}
                                href={value.href}
                            >
                                {value.label}
                            </Anchor>
                        );
                    })}

                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        {page.auth.user ? (
                            <Button
                                variant="transparent"
                                leftSection={
                                    <Avatar color="tanya-pink">
                                        {page.auth.user.name.split("")[0]}
                                    </Avatar>
                                }
                            >
                                <div>{page.auth.user.name}</div>
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    router.visit("/login");
                                }}
                            >
                                Login
                            </Button>
                        )}
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
