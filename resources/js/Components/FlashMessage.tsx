import { usePage } from "@inertiajs/react";
import { notifications } from "@mantine/notifications";
import React, { useEffect } from "react";

const FlashMessage = () => {
    const { flash, errors }: any = usePage().props;

    useEffect(() => {
        if (flash.success) {
            notifications.show({
                title: flash.success.title,
                message: flash.success.message,
                color: "green.5",
            });
        }

        if (flash.error) {
            notifications.show({
                title: flash.error.title,
                message: flash.error.message,
                color: "red.5",
            });
        }

        if (errors && errors.title && errors.message) {
            notifications.show({
                title: errors.title,
                message: errors.message,
                color: "red.5",
            });
        }
    }, [flash]);

    return <></>;
};

export default FlashMessage;
