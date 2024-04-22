import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, router } from "@inertiajs/react";
import {
    Anchor,
    Badge,
    Card,
    Group,
    Select,
    TextInput,
    Title,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

function History() {
    const [filter, setFilter] = useState<string>("all");
    const [search, setSearch] = useState<string>("");
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getData = (page = 1) => {
        setLoading(true);
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("filter", filter);
        params.append("q", search);

        axios.get(route("history.get") + "?" + params).then((response) => {
            setData(response.data.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (search.length > 3 && search != "") {
                getData(1);
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [search]);

    useEffect(() => {
        getData(1);
    }, [filter]);

    return (
        <DashboardLayout>
            <Card>
                <Card.Section pb={"sm"}>
                    <Title order={4}>Payment History</Title>
                </Card.Section>
                <Card.Section pt="sm">
                    <Group justify="space-between">
                        <TextInput
                            placeholder="Search for username..."
                            leftSection={<IconSearch size={18} />}
                            onChange={(e) => setSearch(e.currentTarget.value)}
                        />
                        <Select
                            label="Status"
                            data={[
                                { label: "All", value: "all" },
                                {
                                    label: "Success",
                                    value: "success",
                                },
                                {
                                    label: "Pending",
                                    value: "pending",
                                },
                            ]}
                            value={filter}
                            onChange={(e) => setFilter(e || "all")}
                        />
                    </Group>
                    <DataTable
                        data={data ? data.data : []}
                        pagination
                        paginationServer
                        paginationTotalRows={data?.total || 0}
                        progressPending={loading}
                        paginationPerPage={data?.per_page || 15}
                        paginationComponentOptions={{
                            noRowsPerPage: true,
                        }}
                        onChangePage={(page) => {
                            getData(page);
                        }}
                        columns={[
                            {
                                name: "Creator You Supported",
                                selector: (row: any) =>
                                    row.question.page.username,
                                cell: (row: any) => (
                                    <Anchor
                                        component={Link}
                                        href={`/@${row.question.page.username}`}
                                    >
                                        @{row.question.page.username}
                                    </Anchor>
                                ),
                            },
                            {
                                name: "Payment Time",
                                selector: (row: any) => row.created_at,
                                cell: (row: any) => (
                                    <span>
                                        {format(
                                            new Date(row.created_at),
                                            "dd-MM-yyy @ HH:mm",
                                        )}
                                    </span>
                                ),
                            },
                            {
                                name: "Payment Status",
                                selector: (row: any) => row.status,
                                cell: (row: any) => (
                                    <Badge
                                        variant="filled"
                                        color={
                                            row.status === "settlement" ||
                                            row.status === "capture"
                                                ? "tanya-pink"
                                                : "gray.5"
                                        }
                                    >
                                        {row.status === "settlement" ||
                                        row.status === "capture"
                                            ? "Success"
                                            : row.status}
                                    </Badge>
                                ),
                            },
                            {
                                name: "Amount",
                                selector: (row: any) =>
                                    "Rp " + row.amount.toLocaleString("ID-id"),
                            },
                        ]}
                    />
                </Card.Section>
            </Card>
        </DashboardLayout>
    );
}

export default History;
