import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    ActionIcon,
    Box,
    Button,
    Card,
    ColorInput,
    Grid,
    Group,
    Space,
    Stack,
    TextInput,
    Title,
    Tooltip,
    Overlay as OverlayComponent,
    InputLabel,
} from "@mantine/core";
import React, { useState } from "react";
import Overlay from "../Overlay";
import { router, useForm } from "@inertiajs/react";
import { modals } from "@mantine/modals";
import { IconCopy } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

function OverlaySetting({ page }: any) {
    const form = useForm({
        border_color: page?.border_color || "#FB4983",
        header_color: page?.header_color || "#FB4983",
        header_text_color: page?.header_text_color || "#fff",
        body_color: page?.body_color || "#fafafa",
        body_text_color: page?.body_text_color || "#000",
    });

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.put(route("dashboard.overlay.update"));
    };

    const [blur, setBlur] = useState<boolean>(true);

    const resetColor = () => {
        modals.openConfirmModal({
            title: "Reset Colors",
            children: "Are you sure you want to reset the colors?",
            confirmProps: {
                color: "red.5",
                type: "button",
            },
            cancelProps: { type: "button" },
            labels: {
                confirm: "Reset",
                cancel: "Cancel",
            },
            onConfirm: () => {
                router.post(route("dashboard.overlay.reset"), {});
            },
        });
    };

    const restKey = () => {
        modals.openConfirmModal({
            title: "Reset Overlay Key",
            children: "Are you sure you want to reset overlay key?",
            confirmProps: {
                color: "red.5",
                type: "button",
            },
            cancelProps: { type: "button" },
            labels: {
                confirm: "Reset",
                cancel: "Cancel",
            },
            onConfirm: () => {
                router.post(route("dashboard.overlay.key.reset"), {});
            },
        });
    };

    return (
        <DashboardLayout>
            <Grid gutter={"lg"}>
                <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
                    <Card>
                        <Card.Section pb={"sm"}>
                            <Title order={4}>Overlay Settings</Title>
                        </Card.Section>
                        <Card.Section pt="sm">
                            <form onSubmit={formSubmit}>
                                <Stack>
                                    <Group>
                                        <ColorInput
                                            flex={1}
                                            label="Border Color"
                                            value={form.data.border_color}
                                            error={form.errors.border_color}
                                            onChange={(e) =>
                                                form.setData("border_color", e)
                                            }
                                        />
                                    </Group>
                                    <Group>
                                        <ColorInput
                                            flex={1}
                                            label="Header Color"
                                            value={form.data.header_color}
                                            error={form.errors.header_color}
                                            onChange={(e) =>
                                                form.setData("header_color", e)
                                            }
                                        />
                                        <ColorInput
                                            flex={1}
                                            label="Header Text Color"
                                            value={form.data.header_text_color}
                                            error={
                                                form.errors.header_text_color
                                            }
                                            onChange={(e) =>
                                                form.setData(
                                                    "header_text_color",
                                                    e
                                                )
                                            }
                                        />
                                    </Group>
                                    <Group>
                                        <ColorInput
                                            flex={1}
                                            label="Body Color"
                                            value={form.data.body_color}
                                            error={form.errors.body_color}
                                            onChange={(e) =>
                                                form.setData("body_color", e)
                                            }
                                        />
                                        <ColorInput
                                            flex={1}
                                            label="Text Body Color"
                                            value={form.data.body_text_color}
                                            error={form.errors.body_text_color}
                                            onChange={(e) =>
                                                form.setData(
                                                    "body_text_color",
                                                    e
                                                )
                                            }
                                        />
                                    </Group>
                                </Stack>
                                <Group justify="space-between" mt={"md"}>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        color="red.5"
                                        onClick={resetColor}
                                    >
                                        Reset to Default
                                    </Button>
                                    <Button
                                        disabled={!form.isDirty}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </Group>
                            </form>
                        </Card.Section>
                    </Card>
                    <Space m={"md"} />
                    <Card>
                        <Card.Section pb={"sm"}>
                            <Title order={4}>Stream Overlay URL</Title>
                        </Card.Section>
                        <Card.Section pt="sm">
                            <Group align="end">
                                <Box flex={1}>
                                    <InputLabel>Overlay URL</InputLabel>
                                    <Box
                                        className="cursor-pointer"
                                        pos={"relative"}
                                        onClick={() => {
                                            setBlur((prev) => !prev);
                                        }}
                                    >
                                        <TextInput
                                            readOnly
                                            value={route(
                                                "overlay",
                                                page.overlay_key
                                            )}
                                        />
                                        {blur && (
                                            <OverlayComponent
                                                pos={"absolute"}
                                                color="#000"
                                                backgroundOpacity={0.1}
                                                blur={10}
                                            />
                                        )}
                                    </Box>
                                </Box>
                                <Tooltip label="Copy to clipboard">
                                    <ActionIcon
                                        mb="3px"
                                        variant="transparent"
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                route(
                                                    "overlay",
                                                    page.overlay_key
                                                )
                                            );
                                            notifications.show({
                                                title: "Copied to clipboard",
                                                message: "Overlay URL copied",
                                                color: "teal",
                                            });
                                        }}
                                    >
                                        <IconCopy />
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                            <Group justify="end" mt={"md"}>
                                <Button
                                    variant="outline"
                                    color="red.5"
                                    onClick={restKey}
                                >
                                    Reset Key
                                </Button>
                            </Group>
                        </Card.Section>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
                    <Box>
                        <Overlay
                            page={{ username: page.username }}
                            is_setting={true}
                            colors={form.data}
                        />
                    </Box>
                </Grid.Col>
            </Grid>
        </DashboardLayout>
    );
}

export default OverlaySetting;
