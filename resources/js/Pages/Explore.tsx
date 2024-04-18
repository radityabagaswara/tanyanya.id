import AppLayout from "@/Layouts/AppLayout";
import {
    ActionIcon,
    Badge,
    Container,
    Group,
    Menu,
    SimpleGrid,
    TextInput,
} from "@mantine/core";
import { IconSearch, IconSortAscendingLetters } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import ExploreUserCard from "../Components/Explore/ExploreUserCard";

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

interface IProps {
    data: any;
}

function Explore({ data }: IProps) {
    console.log(data);
    return (
        <AppLayout>
            <Container>
                <Group gap={"md"}>
                    <TextInput
                        flex={1}
                        placeholder="Search for creators..."
                        size="md"
                        radius={"lg"}
                        leftSection={<IconSearch />}
                    />
                    <Menu>
                        <Menu.Target>
                            <ActionIcon
                                title="Sort by"
                                size={"lg"}
                                variant="outline"
                            >
                                <IconSortAscendingLetters />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item>Tanyanya Picks</Menu.Item>
                            <Menu.Item>Most Popular</Menu.Item>
                            <Menu.Item>Trending</Menu.Item>
                            <Menu.Item>New Creator</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
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
                                    variant={
                                        index == 0 ? "light" : "transparent"
                                    }
                                    component="button"
                                    className="cursor-pointer hover:bg-gray-100"
                                >
                                    {value}
                                </Badge>
                            </Carousel.Slide>
                        );
                    })}
                </Carousel>

                <SimpleGrid cols={{ base: 1, sm: 2, md: 3, xl: 3 }} mt={"lg"}>
                    <ExploreUserCard />
                </SimpleGrid>
            </Container>
        </AppLayout>
    );
}

export default Explore;
