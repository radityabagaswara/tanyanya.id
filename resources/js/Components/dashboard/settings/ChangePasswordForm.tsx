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
                <TextInput
                    type="password"
                    label="Old Password"
                    required
                    error={form.errors.password}
                    onChange={(e) =>
                        form.setData("password", e.currentTarget.value)
                    }
                />
                <TextInput
                    type="password"
                    label="New Password"
                    required
                    error={form.errors.new_password}
                    onChange={(e) =>
                        form.setData("new_password", e.currentTarget.value)
                    }
                />
                <TextInput
                    label="Confirm New Password"
                    type="password"
                    required
                    error={form.errors.new_password_confirmation}
                    onChange={(e) =>
                        form.setData(
                            "new_password_confirmation",
                            e.currentTarget.value,
                        )
                    }
                />
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
