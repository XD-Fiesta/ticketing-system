import { usePage } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default () => {
    const { flash } = usePage().props;

    console.log(flash);
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (flash.error) {
            toast.error(flash.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [flash]);

    return (
        <div>
            <ToastContainer />
        </div>
    );
};
