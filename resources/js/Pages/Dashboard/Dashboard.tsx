import QuestionCard from "@/Components/dashboard/QuestionCard";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    Grid,
    Group,
    Loader,
    Select,
    SimpleGrid,
    Text,
    Title,
} from "@mantine/core";
import axios from "axios";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface IProps {}

function Dashboard({}: IProps) {
    const [nextPage, setNextPage] = React.useState<boolean>(true);
    const [questions, setQuestions] = React.useState<any[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [sort, setSort] = React.useState<string>("desc");

    const getQuestions = () => {
        //url builder
        const searchParams = new URLSearchParams();
        searchParams.append("page", currentPage.toString());
        searchParams.append("sort", sort);

        axios
            .get(route("dashboard.getQuestions") + "?" + searchParams)
            .then((res) => {
                setQuestions((prev) => [...prev, ...res.data.data.data]);
                if (res.data.data.next_page_url) setNextPage(true);
                else setNextPage(false);
            });
    };

    useEffect(() => {
        getQuestions();
    }, [sort, currentPage]);

    const streamQuestion = (question: string | number) => {
        axios.put(route("streamQuestion", question)).then((res) => {
            console.log(res);
        });
    };

    return (
        <DashboardLayout>
            <Group justify="space-between" mb={"md"}>
                <Title order={4}>Questions</Title>
                <Select
                    leftSection={<Text size="sm">Sort by: </Text>}
                    leftSectionWidth={60}
                    defaultValue={"desc"}
                    onChange={(e) => {
                        if (!e) return;
                        setQuestions([]);
                        setCurrentPage(1);
                        setSort(e);
                    }}
                    placeholder="Sort by..."
                    data={[
                        { label: "Newest", value: "desc" },
                        { label: "Oldest", value: "asc" },
                    ]}
                />
            </Group>
            <InfiniteScroll
                dataLength={questions.length}
                hasMore={nextPage}
                next={() => setCurrentPage((prev) => prev + 1)}
                loader={
                    <Group mt={"md"} justify="center">
                        <Loader />
                    </Group>
                }
                endMessage={
                    <Text ta={"center"} c={"dimmed"} mt={"md"}>
                        No more questions 🥲
                    </Text>
                }
            >
                <SimpleGrid cols={{ base: 1, md: 2 }}>
                    {questions.map((question, index) => {
                        return (
                            <QuestionCard
                                key={index}
                                id={question.id}
                                user={question.sender}
                                question={question.question}
                                date={question.created_at}
                                onStream={streamQuestion}
                            />
                        );
                    })}
                </SimpleGrid>
            </InfiniteScroll>
        </DashboardLayout>
    );
}

export default Dashboard;