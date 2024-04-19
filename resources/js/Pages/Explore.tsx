import AppLayout from "@/Layouts/AppLayout";
import {
    ActionIcon,
    Badge,
    Container,
    Group,
    Loader,
    Menu,
    SimpleGrid,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { IconSearch, IconSortAscendingLetters } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import ExploreUserCard from "../Components/Explore/ExploreUserCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDebouncedValue } from "@mantine/hooks";
import { PageCategories } from "@/const/PageCategories";
import InfiniteScroll from "react-infinite-scroll-component";

interface IProps {}

const sorts = [
    {
        label: "Tanyanya Picks",
        value: "picks",
    },
    {
        label: "Most Popular",
        value: "popular",
    },
    {
        label: "Trending",
        value: "trending",
    },
    {
        label: "New Creator",
        value: "new",
    },
];

function Explore() {
    const categories = ["All", ...PageCategories];
    const [data, setData] = useState<any>(null);
    const [search, setSearch] = useState<string>("");
    const [sort, setSort] = useState<string>("trending");
    const [searchDebounce] = useDebouncedValue(search, 500);
    const [category, setCategory] = useState<string>("All");
    const [onLoading, setLoading] = useState<boolean>(true);

    const getData = (page = 1, newData = false) => {
        const query = new URLSearchParams({
            q: searchDebounce,
            category,
            sort,
            page: page.toString(),
        });
        axios.get("api/explore?" + query).then((res) => {
            setLoading(false);
            if (data && !newData) {
                const currentData = data.data;
                const newData = [...currentData, ...res.data.data.data];
                res.data.data.data = newData;
            }

            setData(res.data.data);
        });
    };

    useEffect(() => {
        setLoading(true);
        setData(null);
        getData(1, true);
    }, [searchDebounce, category, sort]);

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
                        onChange={(e) => setSearch(e.currentTarget.value)}
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
                            {sorts.map((value: any, index: number) => (
                                <Menu.Item
                                    key={index}
                                    onClick={() => setSort(value.value)}
                                >
                                    {value.label}
                                </Menu.Item>
                            ))}
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
                                    onClick={() => setCategory(value)}
                                    size="lg"
                                    variant={
                                        category === value
                                            ? "light"
                                            : "transparent"
                                    }
                                    component="button"
                                    className="cursor-pointer hover:bg-gray-100  transition-all"
                                >
                                    {value}
                                </Badge>
                            </Carousel.Slide>
                        );
                    })}
                </Carousel>
                <Title mt={"lg"} order={4}>
                    {sorts.find((x) => x.value === sort)?.label}
                </Title>

                {data && (
                    <InfiniteScroll
                        dataLength={data.data.length}
                        next={() => getData(data.current_page + 1)}
                        loader={
                            <Group justify="center" mt={"lg"}>
                                <Loader />
                            </Group>
                        }
                        hasMore={data.next_page_url !== null}
                        endMessage={
                            <Text c="dimmed" mt="lg" ta="center">
                                You've Reached The End :)
                            </Text>
                        }
                    >
                        <SimpleGrid
                            cols={{ base: 1, sm: 2, md: 3, xl: 3 }}
                            mt={"lg"}
                        >
                            {data.data.map((value: any, index: number) => {
                                return (
                                    <ExploreUserCard
                                        key={index}
                                        name={value.user.name}
                                        avatar={value.user.profile_photo_url}
                                        category={value.category}
                                        banner={value.header_image_url}
                                        description={value.bio}
                                        username={value.username}
                                    />
                                );
                            })}
                        </SimpleGrid>
                    </InfiniteScroll>
                )}
            </Container>
        </AppLayout>
    );
}

export default Explore;
