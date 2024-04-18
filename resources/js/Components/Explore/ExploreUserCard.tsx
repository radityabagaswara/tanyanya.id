import { Link } from "@inertiajs/react";
import { Avatar, Badge, Card, Image, Stack, Text } from "@mantine/core";
import React from "react";

function ExploreUserCard() {
    return (
        <Link href="/@testuser">
            <Card>
                <Card.Section p={0} pos={"relative"}>
                    <Image
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                        height={"auto"}
                        className="aspect-video"
                    />
                    <Avatar
                        src="https://trakteer.id/storage/images/avatar/ava-etJ3DKYN3YeMxhqNMMPZyfZgI5tiec6O1676126414.JPG"
                        pos={"absolute"}
                        bottom={"-2rem"}
                        left={"1rem"}
                        size={"xl"}
                        className="border border-pink-500"
                    />
                </Card.Section>
                <Card.Section pt={"3rem"}>
                    <Stack gap={"xs"}>
                        <Text fw={600}>Erika Su</Text>
                        <Text c="dimmed">
                            Lorem ipsum dolor sit amet, qui minim labore
                            adipisicing minim sint cillum sint consectetur
                            cupidatat.
                        </Text>
                        <Badge variant="light">Cosplay</Badge>
                    </Stack>
                </Card.Section>
            </Card>
        </Link>
    );
}

export default ExploreUserCard;
