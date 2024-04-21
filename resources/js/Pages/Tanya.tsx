import useSnap from "@/Hooks/useSnaps";
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
    Modal,
    NumberInput,
    Space,
    Stack,
    Switch,
    Text,
    Textarea,
    Title,
    Tooltip,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import React, { useState } from "react";

function Tanya({ page }: any) {
    const { user }: any = usePage().props.auth;
    const [amount, setAmount] = useState(5000);
    const [modalPayment, setModalPayment] = useState<boolean>(false);
    const { snapEmbed } = useSnap();
    const [snapToken, setSnapToken] = useState("");
    const form = useForm({
        question: "",
        is_anonymous: !page.allow_anon_questions && user ? true : false,
    });

    const submitQuestion = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (page.allow_support_question)
            return modals.openConfirmModal({
                title: "Tanya",
                children: (
                    <Text>Choose how you want to send your question.</Text>
                ),
                labels: {
                    confirm: "Just send a question",
                    cancel: "Send question with support",
                },
                onConfirm: () => postQuestion(false),
                onCancel: () => postQuestion(true),
            });

        postQuestion(false);
    };

    const postSupportQuestion = () => {
        axios
            .post(route("question.new.support", page.id), {
                ...form.data,
                amount,
            })
            .then((res) => {
                if (!res.data.data?.snap_token) return;
                setModalPayment(false);
                setSnapToken(res.data.data.snap_token);
                setTimeout(() => {
                    snapEmbed(res.data.data.snap_token, "snap-embed", {
                        onSuccess: (result: any) => {
                            form.reset("question");
                            setSnapToken("");
                            setAmount(5000);
                            notifications.show({
                                title: "Success",
                                message: "Question sent successfully.",
                                color: "green.5",
                            });
                        },
                        onPending: (result: any) => {
                            notifications.show({
                                title: "Pending",
                                message: "Your payment is pending.",
                                color: "blue.5",
                            });
                        },
                        onClose: () => {
                            notifications.show({
                                title: "Canceled",
                                message: "Your payment is canceled.",
                                color: "red.5",
                            });
                        },
                    });
                }, 500);
            })
            .catch((err) => {
                notifications.show({
                    title: "Error",
                    message: "Something went wrong, please try again later.",
                    color: "red.5",
                });
            });
    };

    const postQuestion = (donation: boolean = false) => {
        if (!donation) {
            form.post(route("question.new", page.id), {
                onSuccess: () => form.reset("question"),
            });
        } else {
            setModalPayment(true);
        }
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
                            bottom={{ base: -60, md: -70, lg: -100 }}
                            w={"100%"}
                        >
                            <Group justify="center">
                                <Avatar
                                    h={{ base: 100, sm: 120, md: 150, lg: 200 }}
                                    w={{ base: 100, sm: 120, md: 150, lg: 200 }}
                                    src={page.user.profile_photo_url}
                                    radius={"100%"}
                                />
                            </Group>
                        </Box>
                    </Box>
                    <Title
                        order={4}
                        ta={"center"}
                        mt={{ base: 75, md: 90, lg: 110 }}
                    >
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
                                onDrop={(e) => e.preventDefault()}
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
                                        e.currentTarget.value,
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
                                                    e.currentTarget.checked,
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
                <Modal
                    opened={snapToken !== ""}
                    onClose={() => null}
                    closeOnEscape={false}
                    closeOnClickOutside={false}
                    withCloseButton={false}
                    classNames={{ body: "p-0" }}
                    radius={"lg"}
                    size={320}
                    centered
                >
                    <div className="w-[320px] h-[560px]">
                        <div id="snap-embed" className="w-full h-full"></div>
                    </div>
                </Modal>
            </Container>
            <Modal onClose={() => setModalPayment(false)} opened={modalPayment}>
                <Stack>
                    <Text>
                        How much would you like to donate to support{" "}
                        {page.user.name}?
                    </Text>
                    <NumberInput
                        placeholder="5000"
                        min={5000}
                        max={10000000}
                        description="Minimum support Rp 5.000"
                        hideControls
                        leftSection="Rp"
                        value={amount}
                        onChange={(value) => {
                            setAmount(Number(value));
                        }}
                    />
                    <Button mt={"md"} onClick={postSupportQuestion}>
                        Send Question With Support
                    </Button>
                </Stack>
            </Modal>
        </AppLayout>
    );
}

export default Tanya;
