import { Broadcast } from "@/echos";
import { Box, Card, CardSection, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";

function Overlay({ page, stream_key }: any) {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
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
            broadcast.leave("overlay-channel." + stream_key);
        };
    }, []);

    return (
        <Card
            className=" border-[#FB4983] border-[8px]"
            classNames={{ section: "bg-gray-50" }}
            color="tanya-pink.3"
            w={500}
            radius={"lg"}
        >
            <Card.Section bg={"tanya-pink.3"} py={"md"}>
                <Title order={3} ta={"center"} c={"white"}>
                    {data ? data.sender.name : "Tanyanya"}
                </Title>
            </Card.Section>
            <Card.Section>
                <div className="prose max-w-prose">
                    {data ? data.question : "Waiting for question..."}
                </div>
            </Card.Section>
            <CardSection>
                <Text ta={"center"} size="sm" c="dimmed">
                    tanyanya.id/@{page.username}
                </Text>
            </CardSection>
        </Card>
    );
}

export default Overlay;
