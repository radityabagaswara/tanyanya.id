import QuestionCard from "@/Components/dashboard/QuestionCard";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    ActionIcon,
    Card,
    Group,
    Modal,
    SimpleGrid,
    Stack,
    TextInput,
    Title,
    Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEye, IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

interface IProps {
    balance: number;
}

function SupportRecieved({ balance }: IProps) {
    const [data, setData] = useState<any>(null);
    const [search, setSearch] = useState<string>("");
    const [modalView, setModalView] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getData = (page = 1) => {
        setLoading(true);
        const param = new URLSearchParams();
        param.append("page", page.toString());
        param.append("q", search);

        axios.get(route("support.get") + "?" + param).then((res) => {
            setData(res.data.data);
            setLoading(false);
        });
    };

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

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (search.length > 3 && search != "") {
                getData(1);
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <DashboardLayout>
            <SimpleGrid mb={"md"} cols={{ base: 1, md: 3, xl: 4 }}>
                <Card>
                    <Card.Section>
                        <Stack>
                            <Title order={5}>Support Recieved</Title>
                            <Title order={2}>
                                Rp{" "}
                                {Number(balance)?.toLocaleString("ID-id") || 0}
                            </Title>
                        </Stack>
                    </Card.Section>
                </Card>
            </SimpleGrid>
            <Card>
                <Card.Section pb="sm">
                    <Title order={4}>Support Recieved</Title>
                </Card.Section>
                <Card.Section pt="sm">
                    <Group mb={"sm"}>
                        <TextInput
                            placeholder="Search for name..."
                            leftSection={<IconSearch size={18} />}
                            value={search}
                            onChange={(e) => setSearch(e.currentTarget.value)}
                        />
                    </Group>
                    <DataTable
                        pagination
                        paginationServer
                        progressPending={loading}
                        paginationTotalRows={data?.total || 10}
                        paginationPerPage={data?.per_page || 15}
                        paginationComponentOptions={{
                            noRowsPerPage: true,
                        }}
                        onChangePage={(page) => getData(page)}
                        columns={[
                            {
                                name: "Supporter",
                                selector: (row: any) =>
                                    row.question.sender.name,
                            },
                            {
                                name: "Amount",
                                selector: (row: any) =>
                                    "Rp " + row.amount.toLocaleString("ID-id"),
                            },
                            {
                                name: "Transaction Time",
                                selector: (row: any) =>
                                    format(
                                        new Date(row.created_at),
                                        "dd - MM - yyyy @ HH:mm",
                                    ),
                            },
                            {
                                name: "Action",
                                cell: (row: any) => (
                                    <Group>
                                        <Tooltip label="Show question">
                                            <ActionIcon
                                                variant="transparent"
                                                onClick={() =>
                                                    setModalView(row)
                                                }
                                            >
                                                <IconEye />
                                            </ActionIcon>
                                        </Tooltip>
                                    </Group>
                                ),
                            },
                        ]}
                        data={data ? data.data : []}
                    />
                </Card.Section>
            </Card>
            <Modal
                opened={modalView != null}
                onClose={() => setModalView(null)}
                p={0}
                size={"lg"}
                classNames={{ body: "p-0" }}
                withCloseButton={false}
            >
                <QuestionCard
                    id={modalView?.question?.id}
                    date={modalView?.question?.created_at || new Date()}
                    user={modalView?.question?.sender}
                    question={modalView?.question?.question}
                    onStream={streamQuestion}
                    donation={modalView}
                    showMenu={false}
                />
            </Modal>
        </DashboardLayout>
    );
}

export default SupportRecieved;
