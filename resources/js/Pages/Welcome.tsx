import AppLayout from "@/Layouts/AppLayout";
import { Broadcast } from "../echos";
import React, { useEffect } from "react";
import { Badge, Box, Button, Group, Stack, Title } from "@mantine/core";
import { Link } from "@inertiajs/react";

function Welcome() {
    return (
        <AppLayout>
            <Group w="100%" justify="center">
                <Box maw={"50rem"}>
                    <Stack justify="center" align="center" mt={"5rem"}>
                        <Badge variant="light" size="lg">
                            Tanyanya.id v0.1.2
                        </Badge>
                        <Title ta={"center"} fz={"3rem"} fw={900}>
                            A place for your Q&A contents.
                        </Title>
                        <Title order={4} fw={400} c="dimmed" ta={"center"}>
                            Allow your fans to ask anonymous question for your
                            Q&A content. Simple for live streams with overlay or
                            download question as an image for sharing on social
                            media.
                        </Title>
                        <Button
                            size="md"
                            component={Link}
                            href={route("register")}
                        >
                            Start Getting Question
                        </Button>
                    </Stack>
                </Box>
            </Group>
        </AppLayout>
    );
}

export default Welcome;
