import { Broadcast } from "@/echos";
import {
    Badge,
    Box,
    Card,
    CardSection,
    Group,
    Text,
    Title,
} from "@mantine/core";
import { IconGift } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

interface IProps {
    page: any;
    stream_key?: string;
    is_setting?: boolean;
    colors?: IColors;
}

interface IColors {
    border_color: string;
    header_color: string;
    header_text_color: string;
    body_color: string;
    body_text_color: string;
}

function Overlay({
    page,
    stream_key,
    is_setting = false,
    colors = {
        border_color: "#FB4983",
        header_color: "#FB4983",
        header_text_color: "#fff",
        body_color: "#000",
        body_text_color: "#fafafa",
    },
}: IProps) {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (is_setting) return;
        const broadcast = Broadcast();
        const channel = broadcast.channel("overlay-channel." + stream_key);
        channel.listen("OverlayBroadcastEvent", (data: any) => {
            if (data) {
                if (data.overlay_data) {
                    setData(data.overlay_data);
                }
            }
        });
        return () => {
            if (is_setting) return;
            broadcast.leave("overlay-channel." + stream_key);
        };
    }, []);

    return (
        <Card
            style={{ borderColor: colors.border_color }}
            className={`border-[8px]`}
            color="tanya-pink.3"
            w={is_setting ? "100%" : 500}
            radius={"lg"}
        >
            <Card.Section bg={colors.header_color} py={"md"}>
                <Title order={3} ta={"center"} c={colors.header_text_color}>
                    {is_setting
                        ? "John Doe"
                        : data
                          ? data.sender.name
                          : "Tanyanya"}
                </Title>
            </Card.Section>
            <Card.Section bg={colors.body_color}>
                <div
                    className="prose max-w-prose"
                    style={{
                        color: colors.body_text_color,
                    }}
                >
                    {is_setting
                        ? "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum iste dicta nobis sit minus mollitia temporibus hic dolorem voluptas magnam deserunt, fugiat eos repudiandae quisquam delectus cupiditate cumque quae rerum?"
                        : data
                          ? data.question
                          : "Waiting for question..."}
                </div>

                <Group mt={"md"} justify="center">
                    {data?.payment && (
                        <Badge size="xl" leftSection={<IconGift size={18} />}>
                            Rp {data.payment.amount.toLocaleString("id-ID")}
                        </Badge>
                    )}
                </Group>
            </Card.Section>
            <CardSection bg={colors.body_color}>
                <Text ta={"center"} size="sm" c="dimmed">
                    tanyanya.id/@{page.username}
                </Text>
            </CardSection>
        </Card>
    );
}

export default Overlay;
