import React, { useEffect, useState } from "react";

const useSnap = () => {
    const [snap, setSnap] = useState<any>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `${import.meta.env.VITE_MIDTRANS_API_URL}/snap/snap.js`;
        script.setAttribute(
            "data-client-key",
            import.meta.env.VITE_MIDTRANS_CLIENT_KEY,
        );
        script.onload = () => {
            setSnap((window as any).snap); // Add type assertion here
        };
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const snapEmbed = (snap_token: any, embedId: any, action: any) => {
        if (snap) {
            snap.embed(snap_token, {
                embedId,
                onSuccess: function (result: any) {
                    console.log("success", result);
                    action.onSuccess(result);
                },
                onPending: function (result: any) {
                    console.log("pending", result);
                    action.onPending(result);
                },
                onClose: function () {
                    action.onClose();
                },
            });
        }
    };

    return { snapEmbed };
};

export default useSnap;
