import QuestionCard from "@/Components/dashboard/QuestionCard";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    Box,
    Grid,
    Group,
    Loader,
    Select,
    SimpleGrid,
    Text,
    Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface IProps {}

function Dashboard({}: IProps) {
    const [nextPage, setNextPage] = React.useState<boolean>(true);
    const [questions, setQuestions] = React.useState<any[]>([]);
    const [filter, setFilter] = React.useState<string>("all");
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [sort, setSort] = React.useState<string>("desc");

    const getQuestions = () => {
        const searchParams = new URLSearchParams();
        searchParams.append("page", currentPage.toString());
        searchParams.append("sort", sort);
        searchParams.append("filter", filter);

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
    }, [sort, currentPage, filter]);

    const streamQuestion = (question: string | number) => {
        axios.put(route("streamQuestion", question)).then((res) => {
            notifications.show({
                title: "Question streamed",
                message:
                    "Question has been streamed to the overlay. If you don't see it, please wait a moment or refresh the page and restream the question.",
                color: "teal",
            });
        });
    };

    const deleteQuestion = (question: string | number) => {
        modals.openConfirmModal({
            title: "Delete Question",
            children: (
                <Text>
                    Are you sure you want to delete this question? This action
                    cannot be undone.
                </Text>
            ),
            centered: true,
            labels: {
                confirm: "Delete Question",
                cancel: "Cancel",
            },
            confirmProps: { color: "red" },
            onConfirm: () => {
                axios.delete(route("deleteQuestion", question)).then((res) => {
                    setQuestions((prev) =>
                        prev.filter((q) => q.id !== question),
                    );
                    notifications.show({
                        title: "Question deleted",
                        message: "Question has been deleted successfully",
                        color: "green",
                    });
                });
            },
        });
    };

    return (
        <DashboardLayout>
            <Group justify="space-between" mb={"md"}>
                <Title order={4}>Questions</Title>
                <Group gap={"md"}>
                    <Select
                        leftSection={<Text size="sm">Sort by: </Text>}
                        leftSectionWidth={60}
                        value={sort}
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
                    <Select
                        leftSection={<Text size="sm">Filter by:</Text>}
                        leftSectionWidth={70}
                        value={filter}
                        onChange={(e) => {
                            if (!e) return;
                            setQuestions([]);
                            setCurrentPage(1);
                            setFilter(e);
                        }}
                        data={[
                            { label: "All", value: "all" },
                            { label: "Support", value: "support" },
                        ]}
                    />
                </Group>
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
                <div className="columns-1 md:columns-2 gap-6 space-y-6">
                    {questions.map((question, index) => {
                        return (
                            <QuestionCard
                                key={index}
                                id={question.id}
                                donation={question.payment}
                                user={question.sender}
                                question={question.question}
                                date={question.created_at}
                                onStream={streamQuestion}
                                onDelete={deleteQuestion}
                            />
                        );
                    })}
                </div>
            </InfiniteScroll>
        </DashboardLayout>
    );
}

export default Dashboard;
