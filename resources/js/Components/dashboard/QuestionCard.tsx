import {
    ActionIcon,
    Avatar,
    Badge,
    Card,
    Divider,
    Group,
    Menu,
    Stack,
    Text,
    Tooltip,
} from "@mantine/core";
import React from "react";
import { format } from "date-fns";
import {
    IconBroadcast,
    IconDots,
    IconGift,
    IconReport,
    IconTrash,
} from "@tabler/icons-react";
import { Link } from "@inertiajs/react";
import { User } from "@/types";

interface IProps {
    user: User | null;
    question: any;
    id: number;
    date: string;
    donation?: any | null;
    showMenu?: boolean;
    onStream?: (id: string | number) => void;
    onDelete?: (id: string | number) => void;
}

function QuestionCard({
    user,
    question,
    id,
    date,
    onStream,
    onDelete,
    donation = null,
    showMenu = true,
}: IProps) {
    return (
        <Card className={donation && "border-base border-[3px]"}>
            <Card.Section pb={0}>
                <Group justify="space-between" align="start">
                    <Group>
                        <Avatar
                            size={"lg"}
                            src={
                                user?.profile_photo_url ||
                                "https://ui-avatars.com/api/?name=?&color=7F9CF5&background=EBF4FF"
                            }
                        />
                        <Stack gap={0}>
                            <Text p={0}>{user?.name || "Anonymous"}</Text>
                            <Text p={0} c="dimmed" size="xs">
                                {format(new Date(date), "dd MMM yyy @ hh:mm a")}
                            </Text>
                        </Stack>
                    </Group>
                    {showMenu && (
                        <Menu>
                            <Menu.Target>
                                <ActionIcon variant="subtle">
                                    <IconDots />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item
                                    leftSection={<IconReport />}
                                    component={Link}
                                    href="#"
                                    color="tanya-pink.3"
                                >
                                    Report Question
                                </Menu.Item>
                                <Divider my={"sm"} />
                                <Menu.Item
                                    leftSection={<IconTrash />}
                                    component={"button"}
                                    color="red"
                                    onClick={() => {
                                        onDelete && onDelete(id);
                                    }}
                                >
                                    Delete Question
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    )}
                </Group>
            </Card.Section>

            <Card.Section pt={"sm"} pb={"sm"}>
                <Text>{question}</Text>
                {donation ? (
                    <Badge
                        size="lg"
                        mt={"md"}
                        leftSection={<IconGift size={18} />}
                    >
                        Rp {donation.amount.toLocaleString("id-ID")}
                    </Badge>
                ) : null}
            </Card.Section>

            <Divider />

            <Card.Section>
                <Group justify="end">
                    <Tooltip label="Send question to overlay">
                        <ActionIcon
                            variant="subtle"
                            onClick={() => {
                                onStream && onStream(id);
                            }}
                        >
                            <IconBroadcast />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Card.Section>
        </Card>
    );
}

export default QuestionCard;
