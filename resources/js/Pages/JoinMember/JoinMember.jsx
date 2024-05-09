import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { Button } from "primereact/button";

export default function JoinMember() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        no_whatsapp: "",
    });

    const [isSuccessRegister, setIsSuccessRegister] = useState(true);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("join-member"), {
            onSuccess: () => {
                setIsSuccessRegister(true);
            },
        });
    };

    return (
        <GuestLayout backdropClassName="sm:py-5">
            <Head title="Register" />

            {isSuccessRegister ? (
                <div className="text-center">
                    <h3 className="text-xl font-extrabold inline-block text-white rounded-sm px-2 py-1 bg-green-600">
                        Sukses terdaftar
                    </h3>
                    <p className="text-base mt-3 mb-2">
                        Mohon menunggu hingga admin melakukan konfirmasi
                        terhadap akunmu, dan kode referal akan dikirim via email
                        📨
                    </p>
                    <Button
                        label="Kembali"
                        className="p-2 text-sm mt-2 font-normal font-sans"
                        severity="warning"
                        icon="pi pi-arrow-left"
                        onClick={() => router.replace(route("login"))}
                    />
                </div>
            ) : (
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            name="nama"
                            value={data.name}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="no-whatsapp"
                            value="No. Whatsapp"
                        />

                        <TextInput
                            id="no-whatsapp"
                            type="text"
                            name="no-whatsapp"
                            value={data.no_whatsapp}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("no_whatsapp", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.no_whatsapp}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route("login")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sudah punya akun?
                        </Link>

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Daftar
                        </PrimaryButton>
                    </div>
                </form>
            )}
        </GuestLayout>
    );
}
