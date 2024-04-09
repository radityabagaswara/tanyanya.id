import AppLayout from "@/Layouts/AppLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import {
    AspectRatio,
    Avatar,
    Box,
    Button,
    Card,
    Container,
    Divider,
    Group,
    Image,
    Space,
    Switch,
    Text,
    Textarea,
    Title,
    Tooltip,
} from "@mantine/core";
import React from "react";

function Tanya({ page }: any) {
    const { user }: any = usePage().props.auth;
    const form = useForm({
        question: "",
        is_anonymous: !page.allow_anon_questions && user ? true : false,
    });

    const submitQuestion = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(route("question.new", page.id), {
            onSuccess: () => form.reset("question"),
        });
    };

    return (
        <AppLayout>
            <Button
                pos={"fixed"}
                style={{ zIndex: 500 }}
                bottom={10}
                size="sm"
                variant="light"
                radius={"lg"}
                right={10}
            >
                Create your own page
            </Button>
            <Container>
                <Box>
                    <Box pos={"relative"}>
                        <Box>
                            <AspectRatio w="100%" ratio={121 / 30}>
                                <Image
                                    src={page.header_image_url}
                                    w={"100%"}
                                    radius={"md"}
                                />
                            </AspectRatio>
                        </Box>
                        <Box
                            pos={"absolute"}
                            bottom={{ base: -60, md: -80 }}
                            w={"100%"}
                        >
                            <Group justify="center">
                                <Box h={{ base: 100, sm: 120, md: 150 }}>
                                    <Avatar
                                        w={"auto"}
                                        h={"100%"}
                                        src={page.user.profile_photo_url}
                                        radius={"100%"}
                                    />
                                </Box>
                            </Group>
                        </Box>
                    </Box>
                    <Title order={4} ta={"center"} mt={{ base: 75, md: 90 }}>
                        {page.user.name}
                    </Title>
                    <Text ta={"center"} c={"dimmed"}>
                        {page.bio}
                    </Text>
                </Box>
                <Space m={80} />
                <Card>
                    <form onSubmit={submitQuestion}>
                        <Card.Section pb="sm">
                            <Textarea
                                placeholder={
                                    !page.is_accepting_questions
                                        ? "This page is not accepting questions."
                                        : "Ask me anything!"
                                }
                                disabled={!page.is_accepting_questions}
                                size="md"
                                bg={"white"}
                                autosize
                                minRows={3}
                                maxLength={180}
                                variant="unstyled"
                                value={form.data.question}
                                onChange={(e) =>
                                    form.setData(
                                        "question",
                                        e.currentTarget.value
                                    )
                                }
                                styles={{
                                    input: {
                                        width: "100%",
                                        border: "none",
                                        outline: "none",
                                        boxShadow: "none",
                                    },
                                }}
                                error={form.errors.question}
                            />
                        </Card.Section>
                        <Text c="dimmed" ta={"right"} size="sm">
                            {form.data.question.length}/180
                        </Text>
                        <Divider my={"sm"} />
                        <Card.Section>
                            <Group justify="space-between">
                                <Tooltip
                                    label={
                                        !user
                                            ? "You must be Logged in to change this."
                                            : !page.is_accepting_questions
                                            ? "This page is not accepting questions."
                                            : !page.allow_anon_questions
                                            ? "This page does not allow anonymous questions."
                                            : "Change question visibility."
                                    }
                                >
                                    <Box>
                                        <Switch
                                            disabled={
                                                !user ||
                                                !page.allow_anon_questions ||
                                                !page.is_accepting_questions
                                            }
                                            label={
                                                form.data.is_anonymous
                                                    ? "Asking as Anonymous"
                                                    : "Asking as " +
                                                      user?.name.split(" ")[0]
                                            }
                                            title="your question will be anonymous"
                                            checked={form.data.is_anonymous}
                                            onChange={(e) =>
                                                form.setData(
                                                    "is_anonymous",
                                                    e.currentTarget.checked
                                                )
                                            }
                                        />
                                    </Box>
                                </Tooltip>
                                {user ? (
                                    <Button
                                        type="submit"
                                        disabled={!page.is_accepting_questions}
                                    >
                                        Tanya {page.user.name.split(" ")[0]}
                                    </Button>
                                ) : (
                                    <Button
                                        component={Link}
                                        href={route("login")}
                                        disabled={!page.is_accepting_questions}
                                    >
                                        Login to Ask
                                    </Button>
                                )}
                            </Group>
                        </Card.Section>
                    </form>
                </Card>
            </Container>
        </AppLayout>
    );
}

export default Tanya;
