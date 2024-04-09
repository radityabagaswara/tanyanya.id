import { useState } from "react";
import {
    Group,
    Box,
    Collapse,
    ThemeIcon,
    Text,
    UnstyledButton,
    rem,
    Stack,
    NavLink,
    Button,
} from "@mantine/core";
import {
    IconCalendarStats,
    IconChevronDown,
    IconChevronRight,
} from "@tabler/icons-react";
import { Link } from "@inertiajs/react";

export interface LinksGroupProps {
    icon: React.FC<any>;
    label: string;
    initiallyOpened?: boolean;
    links?: { label: string; href: string }[];
    href?: string;
}

export function LinksGroup({
    icon: Icon,
    label,
    initiallyOpened,
    links,
    href,
}: LinksGroupProps) {
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const items = (hasLinks ? links : []).map((link) => (
        <NavLink label={link.label} href={link.href} key={link.label} />
    ));
    const RenderOuter = ({ children }: { children: React.ReactNode }) => {
        if (href) {
            return <Link href={href}>{children}</Link>;
        } else {
            return <UnstyledButton>{children}</UnstyledButton>;
        }
    };

    return (
        <RenderOuter>
            <Button
                variant="white"
                justify="space-between"
                onClick={() => setOpened((o) => !o)}
                p={0}
                fullWidth
                rightSection={
                    hasLinks && (
                        <IconChevronDown
                            stroke={1.5}
                            style={{
                                width: rem(16),
                                height: rem(16),
                                transform: opened ? "rotate(-180deg)" : "none",
                            }}
                            className="transition-all"
                        />
                    )
                }
            >
                <Group justify="space-between" w="100%">
                    <Box style={{ display: "flex", alignItems: "center" }}>
                        <ThemeIcon variant="light" size={30}>
                            <Icon style={{ width: rem(18), height: rem(18) }} />
                        </ThemeIcon>
                        <Box ml="md">
                            <Text className="font-semibold">{label}</Text>
                        </Box>
                    </Box>
                </Group>
            </Button>
            {hasLinks ? (
                <Collapse
                    in={opened}
                    mt={"sm"}
                    ml={"sm"}
                    className="border-l"
                    pl="md"
                >
                    <Stack>{items}</Stack>
                </Collapse>
            ) : null}
        </RenderOuter>
    );
}

interface NavbarLinksGroupProps {
    links: LinksGroupProps[];
}

export function NavbarLinksGroup({ links }: NavbarLinksGroupProps) {
    return (
        <Box mih={220}>
            <Stack>
                {links.map((link, index) => {
                    return (
                        <LinksGroup
                            key={index}
                            icon={link.icon}
                            label={link.label}
                            links={link.links}
                            href={link.href}
                        />
                    );
                })}
            </Stack>
        </Box>
    );
}
