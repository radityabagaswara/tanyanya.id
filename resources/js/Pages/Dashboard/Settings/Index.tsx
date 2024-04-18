import ChangeEmailForm from "@/Components/dashboard/settings/ChangeEmailForm";
import ChangePasswordForm from "@/Components/dashboard/settings/ChangePasswordForm";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Button, Card, Group, Space, TextInput, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import React from "react";

function SettingPage() {
    const changeEmail = (form: any) => {
        if (!form) return;

        modals.openConfirmModal({
            title: "Are you sure?",
            children:
                "Are you sure you want to change your email? You will need to verify your new email address.",
            labels: {
                confirm: "Change Email",
                cancel: "Cancel",
            },
            onConfirm: () => {},
        });
    };

    const changePassword = (form: any) => {
        if (!form) return;
        form.post(route("dashboard.setting.password"));
    };

    return (
        <DashboardLayout>
            <Card>
                <Card.Section pb="sm">
                    <Title order={4}>Change Email</Title>
                </Card.Section>
                <Card.Section pt="sm">
                    <ChangeEmailForm onSubmit={changeEmail} />
                </Card.Section>
            </Card>
            <Space m="md" />
            <Card>
                <Card.Section pb="sm">
                    <Title order={4}>Change Password</Title>
                </Card.Section>
                <Card.Section pt="sm">
                    <ChangePasswordForm onSubmit={changePassword} />
                </Card.Section>
            </Card>
            <Space m="md" />
            <Card>
                <Card.Section pb="sm">
                    <Title order={4}>Notifications</Title>
                </Card.Section>
                <Card.Section pt="sm"></Card.Section>
            </Card>
        </DashboardLayout>
    );
}

export default SettingPage;
