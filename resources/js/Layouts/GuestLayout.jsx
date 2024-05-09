import ApplicationLogo from "@/Components/ApplicationLogo";
import FlashMessage from "@/Components/FlashMessage";
import { Link } from "@inertiajs/react";

export default function Guest({ children, cardClassName, backdropClassName }) {
    return (
        <div
            className={`min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 ${backdropClassName}`}
        >
            <FlashMessage />
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-28" />
                </Link>
            </div>

            <div
                className={`w-full sm:max-w-md mt-6 px-4 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg ${cardClassName}`}
            >
                {children}
            </div>
        </div>
    );
}
