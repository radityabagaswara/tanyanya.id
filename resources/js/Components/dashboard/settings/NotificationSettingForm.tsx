import { useForm } from "@inertiajs/react";
import { Button, Group, Stack, Switch } from "@mantine/core";
import React from "react";

interface IProps {
    data?: any;
    onSubmit: (e: any) => void;
}

function NotificationSettingForm({ data, onSubmit }: IProps) {
    console.log(data);
    const form = useForm({
        new_question_notification: data?.new_question_notification || true,
    });

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit && onSubmit(form);
    };

    return (
        <form onSubmit={submitForm}>
            <Stack gap={"md"}>
                <Switch
                    label="Recieve new question notification"
                    checked={form.data.new_question_notification}
                    onChange={(e) =>
                        form.setData(
                            "new_question_notification",
                            e.currentTarget.checked,
                        )
                    }
                />
                <Group mt="md" justify="end">
                    <Button variant="outline" type="submit">
                        Save Notification Setting
                    </Button>
                </Group>
            </Stack>
        </form>
    );
}

export default NotificationSettingForm;
