import { usePage } from "@inertiajs/react";
import { notifications } from "@mantine/notifications";
import React, { useEffect } from "react";

const FlashMessage = () => {
    const { flash }: any = usePage().props;

    useEffect(() => {
        if (flash.success) {
            notifications.show({
                title: flash.success.title,
                message: flash.success.message,
                color: "green",
            });
        }

        if (flash.error) {
            notifications.show({
                title: flash.error.title,
                message: flash.error.message,
                color: "red",
            });
        }
    }, [flash]);

    return <></>;
};

export default FlashMessage;
