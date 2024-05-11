import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import Table from "@/Components/Table";
import Modal from "@/Components/Modal";
import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";
import { Column } from "primereact/column";
import { useEffect } from "react";
import DangerButton from "@/Components/DangerButton";

export default function Event({ errors, events }) {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState(events);
    const [actionUpdate, setActionUpdate] = useState();
    const [editVisible, setEditVisible] = useState(false);

    useEffect(() => {
        setData(events);
    }, [events]);

    const [values, setValues] = useState({
        name_event: "",
        location_event: "",
        date_end: "",
        date_start: "",
        type_event: "",
        price: "",
        displayPrice: "",
        description: "",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    const numberFormat = (event) => {
        let input = event.target.value;
        let number = input.replace(/[^0-9]/g, "");
        let numericValue = parseFloat(number.replace(/\./g, ""));
        let formatted = number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        setValues((values) => ({
            ...values,
            displayPrice: formatted,
            price: numericValue,
        }));
    };

    // Delete Data
    const handleDelete = (rowData) => {
        router.delete(route("dashboard.event.delete", rowData.id), {
            onSuccess: (eventData) => {
                setData((prevEvents) => [
                    ...prevEvents,
                    eventData.props.events,
                ]);
            },
        });
    };

    // Update Data
    const submitUpdate = (e) => {
        e.preventDefault();

        router.put(route("dashboard.event.update", values.id_event), values, {
            onSuccess: (eventData) => {
                setData((prevEvents) => [
                    ...prevEvents,
                    eventData.props.events,
                ]);
                setValues({
                    name_event: "",
                    location_event: "",
                    date_end: "",
                    date_start: "",
                    type_event: "",
                    price: "",
                    displayPrice: "",
                    description: "",
                });
                setEditVisible(false);
            },
        });
    };

    const handleEdit = (rowData) => {
        let number = rowData.price;
        let formatted = number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        setValues({
            id_event: rowData.id,
            name_event: rowData.name_event,
            location_event: rowData.location_event,
            date_end: rowData.date_end,
            type_event: rowData.type,
            date_start: rowData.date_start,
            price: rowData.price,
            displayPrice: formatted,
            description: rowData.description,
        });
        setEditVisible(true);
    };

    const modalEdit = () => {
        return (
            <Modal
                show={editVisible}
                onClose={() => setEditVisible(false)}
                titleHeader="Edit Event"
                heightMax="920px"
            >
                <form onSubmit={submitUpdate}>
                    <div className="px-4">
                        <div className="mb-3">
                            <div className="col-span-full">
                                <label
                                    htmlFor="nama_event"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Name Event
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            name="name_event"
                                            id="name_event"
                                            autoComplete="name_event"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                                            placeholder="Name Event"
                                            value={values.name_event}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {errors.name_event && (
                                        <div className="mt-1 text-red-500">
                                            {errors.name_event}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="col-span-full">
                                <label
                                    htmlFor="type"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Type Event
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            name="type_event"
                                            id="type_event"
                                            autoComplete="type_event"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                                            placeholder="Example :  Earlybird"
                                            value={values.type_event}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {errors.type_event && (
                                        <div className="mt-1 text-red-500">
                                            {errors.type_event}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="col-span-full">
                                <label
                                    htmlFor="nama_event"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Price Event
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            autoComplete="price"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                                            placeholder="Rp 1.000.000"
                                            value={values.displayPrice}
                                            onChange={numberFormat}
                                        />
                                    </div>

                                    {errors.price && (
                                        <div className="mt-1 text-red-500">
                                            {errors.price}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="col-span-full">
                                <label
                                    htmlFor="location_event"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Location Event
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="text"
                                            name="location_event"
                                            id="location_event"
                                            autoComplete="location_event"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                                            placeholder="Location Event"
                                            value={values.location_event}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {errors.location_event && (
                                        <div className="mt-1 text-red-500">
                                            {errors.location_event}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="col-span-full">
                                <label
                                    htmlFor="date_start"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Date Start Event
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="datetime-local"
                                            name="date_start"
                                            id="date_start"
                                            autoComplete="date_start"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                                            placeholder="Date Event"
                                            value={values.date_start}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {errors.date_start && (
                                        <div className="mt-1 text-red-500">
                                            {errors.date_start}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="col-span-full">
                                <label
                                    htmlFor="date_end"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Date End Event
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input
                                            type="datetime-local"
                                            name="date_end"
                                            id="date_end"
                                            autoComplete="date_end"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                                            placeholder="Date Event"
                                            value={values.date_end}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {errors.date_end && (
                                        <div className="mt-1 text-red-500">
                                            {errors.date_end}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="about"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                About
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="3"
                                    value={values.description}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                ></textarea>

                                {errors.description && (
                                    <div className="mt-1 text-red-500">
                                        {errors.description}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="flex justify-content-end m-4">
                        <PrimaryButton>Submit</PrimaryButton>
                    </div>
                </form>
            </Modal>
        );
    };
    // End Update Data

    // create Data
    const modalAdd = () => {
        return (
            <>
                <PrimaryButton onClick={() => setVisible(true)}>
                    Add Event
                </PrimaryButton>

                <Modal
                    show={visible}
                    onClose={() => setVisible(false)}
                    titleHeader="Add Event"
                    heightMax="920px"
                >
                    <form onSubmit={submit}>
                        <div className="px-4">
                            <div className="mb-3">
                                <div className="col-span-full">
                                    <label
                                        htmlFor="nama_event"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Name Event
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input
                                                type="text"
                                                name="name_event"
                                                id="name_event"
                                                autoComplete="name_event"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                                                placeholder="Name Event"
                                                value={values.name_event}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {errors.name_event && (
                                            <div className="mt-1 text-red-500">
                                                {errors.name_event}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="col-span-full">
                                    <label
                                        htmlFor="type"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Type Event
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input
                                                type="text"
                                                name="type_event"
                                                id="type_event"
                                                autoComplete="type_event"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                                                placeholder="Example :  Earlybird"
                                                value={values.type_event}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {errors.type_event && (
                                            <div className="mt-1 text-red-500">
                                                {errors.type_event}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="col-span-full">
                                    <label
                                        htmlFor="nama_event"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Price Event
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input
                                                type="text"
                                                name="price"
                                                id="price"
                                                autoComplete="price"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                                                placeholder="Rp 1.000.000"
                                                value={values.displayPrice}
                                                onChange={numberFormat}
                                            />
                                        </div>

                                        {errors.price && (
                                            <div className="mt-1 text-red-500">
                                                {errors.price}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="col-span-full">
                                    <label
                                        htmlFor="location_event"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Location Event
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input
                                                type="text"
                                                name="location_event"
                                                id="location_event"
                                                autoComplete="location_event"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                                                placeholder="Location Event"
                                                value={values.location_event}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {errors.location_event && (
                                            <div className="mt-1 text-red-500">
                                                {errors.location_event}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="col-span-full">
                                    <label
                                        htmlFor="date_start"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Date Start Event
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input
                                                type="datetime-local"
                                                name="date_start"
                                                id="date_start"
                                                autoComplete="date_start"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                                                placeholder="Date Event"
                                                value={values.date_start}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {errors.date_start && (
                                            <div className="mt-1 text-red-500">
                                                {errors.date_start}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="col-span-full">
                                    <label
                                        htmlFor="date_end"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Date End Event
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input
                                                type="datetime-local"
                                                name="date_end"
                                                id="date_end"
                                                autoComplete="date_end"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                                                placeholder="Date Event"
                                                value={values.date_end}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {errors.date_end && (
                                            <div className="mt-1 text-red-500">
                                                {errors.date_end}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="about"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    About
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="3"
                                        value={values.description}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    ></textarea>

                                    {errors.description && (
                                        <div className="mt-1 text-red-500">
                                            {errors.description}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <hr className="my-4" />

                        <div className="flex justify-content-end m-4">
                            <PrimaryButton>Submit</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </>
        );
    };

    const submit = (e) => {
        e.preventDefault();

        router.post(route("dashboard.event.store"), values, {
            onSuccess: (eventData) => {
                setData((prevEvents) => [
                    ...prevEvents,
                    eventData.props.events,
                ]);
                setValues({
                    name_event: "",
                    location_event: "",
                    date_end: "",
                    date_start: "",
                    type_event: "",
                    price: "",
                    displayPrice: "",
                    description: "",
                });
                setVisible(false);
            },
        });
    };
    // End Create Data

    return (
        <DashboardLayout>
            <Head title="Event" />
            {modalEdit()}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Table datas={data} modalAdd={modalAdd()} rows={10}>
                            <Column
                                field="keyId"
                                header="No"
                                style={{ width: "5%" }}
                            ></Column>
                            <Column
                                field="name_event"
                                header="Name Event"
                                style={{ width: "25%" }}
                            ></Column>
                            <Column
                                field="location_event"
                                header="Location Event"
                                style={{ width: "25%" }}
                            ></Column>
                            <Column
                                field="description"
                                header="Description"
                                style={{ width: "25%" }}
                            ></Column>
                            <Column
                                field="date_end"
                                header="Date Event"
                                style={{ width: "25%" }}
                            ></Column>
                            <Column
                                field="actions"
                                header="Actions"
                                body={(rowData) => (
                                    <div className="flex justify-content-end">
                                        <PrimaryButton
                                            onClick={() => handleEdit(rowData)}
                                            className="mr-2"
                                        >
                                            Edit
                                        </PrimaryButton>
                                        <DangerButton
                                            onClick={() =>
                                                handleDelete(rowData)
                                            }
                                            className="mr-2"
                                        >
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
