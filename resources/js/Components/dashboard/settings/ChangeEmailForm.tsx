import { useForm } from "@inertiajs/react";
import { Button, Group, Space, Stack, TextInput } from "@mantine/core";
import React from "react";

interface IProps {
    onSubmit?: (data: any) => void;
}

function ChangeEmailForm({ onSubmit }: IProps) {
    const form = useForm({
        email: "",
    });

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit && onSubmit(form);
    };

    return (
        <form onSubmit={submitForm}>
            <Stack>
                <TextInput label="New Email" placeholder="john@doe.com" />

                <Space m="md" />
                <Group justify="end">
                    <Button variant="outline" type="submit" color="red.5">
                        Change Email
                    </Button>
                </Group>
            </Stack>
        </form>
    );
}

export default ChangeEmailForm;
