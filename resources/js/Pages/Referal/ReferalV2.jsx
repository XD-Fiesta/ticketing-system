import { Head, router } from "@inertiajs/react";
import { Column } from "primereact/column";
import { useState, useEffect } from "react";
import Modal from "@/Components/Modal";
import Table from "@/Components/Table";
import DashboardLayout from "@/Layouts/DashboardLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";
import SelectedOption from "@/Components/SelectedOption";
import Checkbox from "@/Components/Checkbox";

export default function Referal({ errors, referals }) {
    const [data, setData] = useState(referals);
    const [visible, setVisible] = useState(false);

    const statusDropdown = ["Active", "Inactive", "Banned"];

    useEffect(() => {
        setData(referals);
    }, [referals]);

    const [values, setValues] = useState({
        nim: "",
        phone: "",
        code_referal: "",
        status: "",
        isUserCanLogin: false,
    });

    function createReferal(num) {
        const strNum = num.toString();
        if (num < 0) throw new Error("Input must be non-negative");
        return (
            "XD" +
            strNum[0] +
            strNum[1] +
            strNum[strNum.length - 2] +
            strNum[strNum.length - 1]
        );
    }

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;

        if (key == "isUserCanLogin") {
            setValues((values) => {
                return {
                    ...values,
                    isUserCanLogin: !values.isUserCanLogin,
                };
            });

            return;
        }

        setValues((values) => ({
            ...values,

            [key]: value,
        }));

        if (key == "nim") {
            if (value > 4) {
                setValues((values) => ({
                    ...values,
                    ["code_referal"]: createReferal(value),
                }));
            } else {
                setValues((values) => ({
                    ...values,
                    ["code_referal"]: "",
                }));
            }
        }
    }

    // create Data
    const modalAdd = () => {
        return (
            <>
                <PrimaryButton onClick={() => setVisible(true)}>
                    Add Referal
                </PrimaryButton>

                <Modal
                    show={visible}
                    onClose={() => setVisible(false)}
                    titleHeader="Add Referal"
                    className="mb-0"
                >
                    <form onSubmit={submit}>
                        <div className="max-h-[290px] overflow-auto">
                            <div className="px-4">
                                <div className="mb-3">
                                    <div className="col-span-full">
                                        <label
                                            htmlFor="nama_event"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            NIM
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                <input
                                                    type="number"
                                                    name="nim"
                                                    id="nim"
                                                    autoComplete="nim"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                                                    placeholder="NIM"
                                                    value={values.nim}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            {errors.nim && (
                                                <div className="mt-1 text-red-500 text-sm">
                                                    {errors.nim}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="col-span-full">
                                        <label
                                            htmlFor="code_referal"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Code Referal
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 ">
                                                <input
                                                    type="text"
                                                    name="code_referal"
                                                    id="code_referal"
                                                    readOnly
                                                    autoComplete="code_referal"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                                                    placeholder="Code Referal"
                                                    value={values.code_referal}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {errors.code_referal && (
                                                <div className="mt-1 text-red-500 text-sm">
                                                    {errors.code_referal}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="col-span-full">
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Phone
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    id="phone"
                                                    autoComplete="phone"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                                                    placeholder="Phone"
                                                    value={values.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {errors.phone && (
                                                <div className="mt-1 text-red-500 text-sm">
                                                    {errors.phone}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="col-span-full">
                                        <label
                                            htmlFor="status"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Status
                                        </label>
                                        <div>
                                            <SelectedOption
                                                onchange={(e) => {
                                                    handleChange(e);
                                                }}
                                                datas={statusDropdown}
                                                placeholder="Pilih Status"
                                                className="w-full border-1 h-9 focus-within:ring-1 focus-within:ring-inset focus-within:ring-indigo-600"
                                            />

                                            {errors.status && (
                                                <div className="mt-1 text-red-500 text-sm">
                                                    {errors.status}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="flex align-items-center">
                                        <Checkbox
                                            checked={values.isUserCanLogin}
                                            onChange={handleChange}
                                            id="isUserCanLogin"
                                            name="isUserCanLogin"
                                        />
                                        <label
                                            htmlFor="isUserCanLogin"
                                            className="block text-sm font-medium leading-6 ml-2 text-gray-900"
                                        >
                                            User can login?
                                        </label>
                                    </div>
                                </div>

                                {/* nama, email, password */}

                                {values.isUserCanLogin && (
                                    <div className="mb-3">
                                        <div className="col-span-full">
                                            <label
                                                htmlFor="nama_event"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Nama
                                            </label>
                                            <div className="mt-2">
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                    <input
                                                        type="number"
                                                        name="nim"
                                                        id="nim"
                                                        autoComplete="nim"
                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                                                        placeholder="NIM"
                                                        value={values.nim}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                {errors.nim && (
                                                    <div className="mt-1 text-red-500 text-sm">
                                                        {errors.nim}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <hr />

                        <div className="flex justify-content-end p-3">
                            <PrimaryButton>Submit</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </>
        );
    };

    const submit = (e) => {
        e.preventDefault();
        router.post(route("dashboard.referal.store"), values, {
            onSuccess: (eventData) => {
                setData((prevEvents) => [
                    ...prevEvents,
                    eventData.props.events,
                ]);
                setValues({
                    nim: "",
                    phone: "",
                    code_referal: "",
                    status: "",
                });
                setVisible(false);
            },
        });
    };
    // End Create Data

    return (
        <DashboardLayout>
            <Head title="Referal" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Table
                            datas={data}
                            modalAdd={modalAdd()}
                            rows={10}
                            emptyMessage="No members found."
                        >
                            <Column
                                field="keyId"
                                header="No"
                                style={{ width: "5%" }}
                            ></Column>
                            <Column
                                field="nim"
                                header="NIM"
                                style={{ width: "25%" }}
                            ></Column>
                            <Column
                                field="phone"
                                header="Phone"
                                style={{ width: "25%" }}
                            ></Column>
                            <Column
                                field="code_referal"
                                header="Code Referal"
                                style={{ width: "25%" }}
                            ></Column>
                            <Column
                                field="status"
                                header="Status"
                                style={{ width: "25%" }}
                            ></Column>
                            <Column
                                field="actions"
                                header="Actions"
                                body={(rowData) => (
                                    <div className="flex justify-content-end">
                                        <PrimaryButton className="mr-2">
                                            Edit
                                        </PrimaryButton>
                                        <DangerButton className="mr-2">
                                            Delete
                                        </DangerButton>
                                    </div>
                                )}
                                style={{ width: "15%" }}
                            ></Column>
                        </Table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
