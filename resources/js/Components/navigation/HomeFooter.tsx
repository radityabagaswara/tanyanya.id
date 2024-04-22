import {
    Anchor,
    Box,
    Button,
    Container,
    Divider,
    Group,
    Image,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import React from "react";
import logoWhite from "../../assets/images/logo-white.png";
import { Link } from "@inertiajs/react";

function HomeFooter() {
    return (
        <Box bg={"tanya-pink"} component="footer">
            <Container py={"xl"}>
                <Title order={2} c="white" ta={"center"}>
                    Start Making Q&A Content Beautiful!
                </Title>
                <Text c="white" ta={"center"}>
                    Create your page now.
                </Text>
                <Group justify="center" mt={"lg"}>
                    <Button variant="white" size="md">
                        Get Started
                    </Button>
                </Group>
                <Divider my={"xl"} c={"dimmed"} />
                <Stack gap={"xs"} align="center">
                    <Image src={logoWhite} w={150} />
                    <Text fz={"sm"} c="white">
                        Copyright © {new Date().getFullYear()} Tanyanya.id All
                        Right Reserved.{" "}
                    </Text>
                    <Text fz={"sm"} c="white">
                        Made with ❤ by{" "}
                        <a href="https://raditya.tech" target="_blank">
                            Raditya Bagaswara
                        </a>
                    </Text>
                </Stack>
            </Container>
        </Box>
    );
}

export default HomeFooter;
