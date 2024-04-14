import { useForm } from "@inertiajs/react";
import { Button, Group, Space, Stack, TextInput } from "@mantine/core";
import React from "react";

interface IProps {
    onSubmit?: (data: any) => void;
}

function ChangePasswordForm({ onSubmit }: IProps) {
    const form = useForm({
        password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit && onSubmit(form);
    };

    return (
        <form onSubmit={submitForm}>
            <Stack gap="md">
                <TextInput label="Old Password" />
                <TextInput label="New Password" />
                <TextInput label="Confirm New Password" />
                <Space m="md" />
                <Group justify="end">
                    <Button type="submit" variant="outline" color="red.5">
                        Change Password
                    </Button>
                </Group>
            </Stack>
        </form>
    );
}

export default ChangePasswordForm;
