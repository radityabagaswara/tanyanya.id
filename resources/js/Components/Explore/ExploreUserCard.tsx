import { Link } from "@inertiajs/react";
import { Avatar, Badge, Box, Card, Image, Stack, Text } from "@mantine/core";
import React from "react";

interface IProps {
    name: string;
    username: string;
    avatar: string;
    banner: string;
    description: string;
    category: string;
}

function ExploreUserCard({
    name,
    username,
    avatar,
    banner,
    description,
    category,
}: IProps) {
    return (
        <Link href={`/@${username}`}>
            <Card className={"hover:border-pink-500 transition-all"}>
                <Card.Section p={0} pos={"relative"}>
                    <Image
                        src={banner}
                        height={"auto"}
                        className="aspect-video"
                    />
                    <Avatar
                        src={avatar}
                        pos={"absolute"}
                        bottom={"-2rem"}
                        left={"1rem"}
                        size={"xl"}
                        className="border border-pink-500"
                    />
                </Card.Section>
                <Card.Section pt={"3rem"}>
                    <Stack gap={"xs"}>
                        <Box>
                            <Text fw={600}>{name}</Text>
                            <Text c="dimmed" size="sm">
                                @{username}
                            </Text>
                        </Box>
                        <Text c="dimmed">{description}</Text>
                        {category && <Badge variant="light">{category}</Badge>}
                    </Stack>
                </Card.Section>
            </Card>
        </Link>
    );
}

export default ExploreUserCard;
