import AppLayout from "@/Layouts/AppLayout";
import { ActionIcon, Badge, Group, TextInput } from "@mantine/core";
import {
    IconSearch,
    IconSortAZ,
    IconSortAscending,
    IconSortAscending2,
    IconSortAscendingLetters,
} from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import React from "react";
import { Link } from "@inertiajs/react";

const categories = [
    "All",
    "Gaming",
    "Music",
    "Lifestyle",
    "Art and Animation",
    "Community",
    "Education",
    "Food",
    "Streamer",
    "Sience and Tech",
    "Podcast",
    "News",
    "Other",
];

function Explore() {
    return (
        <AppLayout>
            <Group gap={"md"}>
                <TextInput
                    flex={1}
                    placeholder="Search for creators..."
                    size="md"
                    radius={"lg"}
                    leftSection={<IconSearch />}
                />
                <ActionIcon title="Sort by" size={"lg"} variant="outline">
                    <IconSortAscendingLetters />
                </ActionIcon>
            </Group>
            <Carousel
                dragFree
                draggable
                slideGap={"sm"}
                align={"start"}
                slidesToScroll={3}
                mt={"md"}
                controlsOffset={"xs"}
                slideSize={"5%"}
                px={"3rem"}
                className="cursor-grab"
            >
                {categories.map((value, index) => {
                    return (
                        <Carousel.Slide key={index}>
                            <Badge
                                size="lg"
                                variant={index == 0 ? "light" : "transparent"}
                                component="button"
                                className="cursor-pointer hover:bg-gray-100"
                            >
                                {value}
                            </Badge>
                        </Carousel.Slide>
                    );
                })}
            </Carousel>
        </AppLayout>
    );
}

export default Explore;
