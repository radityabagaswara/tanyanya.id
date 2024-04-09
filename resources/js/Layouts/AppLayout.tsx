import FlashMessage from "@/Components/FlashMessage";
import { HomeNavBar } from "@/Components/navigation/HomeNavbar";
import { LoadingOverlay } from "@mantine/core";
import React from "react";

interface props {
    children: React.ReactNode;
    className?: string;
    withContainer?: boolean;
    loading?: boolean;
}

const AppLayout = ({
    children,
    withContainer = true,
    className,
    loading = false,
}: props) => {
    return (
        <>
            <LoadingOverlay visible={loading} />
            <HomeNavBar />
            <FlashMessage />
            <div className="bg-gray-50">
                <main
                    className={`py-20 min-h-screen ${
                        withContainer ? "container px-4 mx-auto" : ""
                    } ${className} `}
                >
                    {children}
                </main>
            </div>
        </>
    );
};

export default AppLayout;
