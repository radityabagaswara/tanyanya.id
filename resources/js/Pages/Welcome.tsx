import AppLayout from "@/Layouts/AppLayout";
import { Broadcast } from "../echos";
import React, { useEffect } from "react";
import {
    Badge,
    Box,
    Button,
    Container,
    Group,
    Image,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { Link } from "@inertiajs/react";

import streamImage from "../assets/images/stream_demo.jpg";
import overlayDemoVideo from "../assets/videos/overlay_demo.webm";
import ExploreUserCard from "@/Components/Explore/ExploreUserCard";

interface IProps {
    creators: any;
}

function Welcome({ creators }: IProps) {
    return (
        <AppLayout>
            <Container size={"md"}>
                <Group w="100%" justify="center">
                    <Box maw={"50rem"}>
                        <Stack justify="center" align="center" mt={"2rem"}>
                            <Badge variant="light" size="lg">
                                Tanyanya.id
                            </Badge>
                            <Title ta={"center"} fz={"3rem"} fw={900}>
                                A place for your Q&A contents.
                            </Title>
                            <Title order={4} fw={400} c="dimmed" ta={"center"}>
                                Allow your fans to ask anonymous question for
                                your Q&A content. Simple for live streams with
                                overlay or download question as an image for
                                sharing on social media.
                            </Title>
                            <Button
                                size="md"
                                component={Link}
                                href={route("register")}
                            >
                                Start Getting Question
                            </Button>
                            <Image
                                maw={"600px"}
                                src={streamImage}
                                mt={"xl"}
                                radius={"lg"}
                            />
                        </Stack>
                        <Box mt={"5rem"}>
                            <Title
                                ta={"center"}
                                order={2}
                                fz={"2rem"}
                                fw={900}
                                pb={0}
                            >
                                Friendly Creators
                            </Title>
                            <Text mb="md" c="dimmed" ta={"center"} pt={0}>
                                This is some of our creators that already using
                                Tanyanya.id. You can ask them anything!
                            </Text>
                            <SimpleGrid
                                cols={{ base: 1, sm: 2, md: 3, xl: 3 }}
                                mt={"lg"}
                            >
                                {creators?.map((value: any, index: number) => {
                                    return (
                                        <ExploreUserCard
                                            key={index}
                                            name={value.user.name}
                                            avatar={
                                                value.user.profile_photo_url
                                            }
                                            category={value.category}
                                            banner={value.header_image_url}
                                            description={value.bio}
                                            username={value.username}
                                        />
                                    );
                                })}
                            </SimpleGrid>
                            <Group justify="center">
                                <Button
                                    mt={"lg"}
                                    variant="light"
                                    component={Link}
                                    href={route("explore")}
                                >
                                    Explore More Creator
                                </Button>
                            </Group>
                        </Box>
                        <Box mt={"5rem"}>
                            <Title
                                ta={"center"}
                                order={2}
                                fz={"2rem"}
                                fw={900}
                                pb={0}
                            >
                                Easy Overlay Integration
                            </Title>
                            <Text mb="md" c="dimmed" ta={"center"} pt={0}>
                                Customize your overlay to your liking or your
                                brand color. Just copy the link and paste it to
                                your streaming software. Voila! Your audience
                                can see the question in real-time.
                            </Text>
                            <Paper
                                className="overflow-hidden"
                                withBorder
                                radius="lg"
                            >
                                <video
                                    src={overlayDemoVideo}
                                    autoPlay
                                    muted
                                    loop
                                />
                            </Paper>
                        </Box>
                    </Box>
                </Group>
            </Container>
        </AppLayout>
    );
}

export default Welcome;
