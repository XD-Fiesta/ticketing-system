import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect } from "react";
import { CustomerService } from "./CustomerService";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

export default function Ticket() {
    const [customers, setCustomers] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => {
        CustomerService.getCustomersMedium().then((data) => setCustomers(data));
    }, []);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-start">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Keyword Search"
                        className="pl-5"
                        style={{ borderRadius: 10, fontWeight: 400 }}
                    />
                </IconField>
            </div>
        );
    };

    return (
        <DashboardLayout>
            <Head title="Ticket" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* <div className="min-w-full inline-block align-middle">
                            <div className="border rounded-lg divide-y divide-gray-200">
                                <div className="py-3 px-4">
                                    <div className="relative max-w-xs flex">
                                        <label className="sr-only">
                                            Search
                                        </label>
                                        <TextInput
                                            type="text"
                                            name="table-with-pagination-search"
                                            id="table-with-pagination-search"
                                            className="p-3 ps-10 block w-full border-gray-200 rounded-md text-sm focus:border-sky-500 focus:ring-sky-500"
                                            placeholder="Search for items"
                                        />
                                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                                            <svg
                                                className="h-3.5 w-3.5 text-gray-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="py-3 px-4 pe-0"
                                                ></th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                                >
                                                    Age
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                                >
                                                    Address
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                                                >
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            <tr>
                                                <td className="py-3 ps-4">1</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                    John Brown
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    45
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    New York No. 1 Lake Park
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex justify-end">
                                                    <a
                                                        className="text-emerald-500 hover:text-emerald-700"
                                                        href="#"
                                                    >
                                                        Confirm
                                                    </a>
                                                    &nbsp; | &nbsp;
                                                    <a
                                                        className="text-red-500 hover:text-red-700"
                                                        href="#"
                                                    >
                                                        Delete
                                                    </a>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="py-3 ps-4">
                                                    <div className="flex items-center h-5">
                                                        2
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                    Jim Green
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    27
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    London No. 1 Lake Park
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex justify-end">
                                                    <a
                                                        className="text-emerald-500 hover:text-emerald-700"
                                                        href="#"
                                                    >
                                                        Confirm
                                                    </a>
                                                    &nbsp; | &nbsp;
                                                    <a
                                                        className="text-red-500 hover:text-red-700"
                                                        href="#"
                                                    >
                                                        Delete
                                                    </a>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="py-3 ps-4">3</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                    Joe Black
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    31
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    Sidney No. 1 Lake Park
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex justify-end">
                                                    <a
                                                        className="text-emerald-500 hover:text-emerald-700"
                                                        href="#"
                                                    >
                                                        Confirm
                                                    </a>
                                                    &nbsp; | &nbsp;
                                                    <a
                                                        className="text-red-500 hover:text-red-700"
                                                        href="#"
                                                    >
                                                        Delete
                                                    </a>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="py-3 ps-4">4</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                    Edward King
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    16
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    LA No. 1 Lake Park
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex justify-end">
                                                    <a
                                                        className="text-emerald-500 hover:text-emerald-700"
                                                        href="#"
                                                    >
                                                        Confirm
                                                    </a>
                                                    &nbsp; | &nbsp;
                                                    <a
                                                        className="text-red-500 hover:text-red-700"
                                                        href="#"
                                                    >
                                                        Delete
                                                    </a>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="py-3 ps-4">5</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                    Jim Red
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    45
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                    Melbourne No. 1 Lake Park
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium flex justify-end">
                                                    <a
                                                        className="text-emerald-500 hover:text-emerald-700"
                                                        href="#"
                                                    >
                                                        Confirm
                                                    </a>
                                                    &nbsp; | &nbsp;
                                                    <a
                                                        className="text-red-500 hover:text-red-700"
                                                        href="#"
                                                    >
                                                        Delete
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="py-1 px-4">
                                    <nav className="flex items-center space-x-2">
                                        <a
                                            className="text-gray-400 hover:text-red-500 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                                            href="#"
                                        >
                                            <span aria-hidden="true">«</span>
                                            <span className="sr-only">
                                                Previous
                                            </span>
                                        </a>
                                        <a
                                            className="w-10 h-10 bg-sky-500 text-white p-4 inline-flex items-center text-sm font-medium rounded-full"
                                            href="#"
                                            aria-current="page"
                                        >
                                            1
                                        </a>
                                        <a
                                            className="w-10 h-10 text-gray-400 hover:text-red-500 p-4 inline-flex items-center text-sm font-medium rounded-full"
                                            href="#"
                                        >
                                            2
                                        </a>
                                        <a
                                            className="w-10 h-10 text-gray-400 hover:text-red-500 p-4 inline-flex items-center text-sm font-medium rounded-full"
                                            href="#"
                                        >
                                            3
                                        </a>
                                        <a
                                            className="text-gray-400 hover:text-red-500 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                                            href="#"
                                        >
                                            <span className="sr-only">
                                                Next
                                            </span>
                                            <span aria-hidden="true">»</span>
                                        </a>
                                    </nav>
                                </div>
                            </div>
                        </div> */}

                        <DataTable
                            value={customers}
                            paginator
                            rows={5}
                            tableStyle={{ minWidth: "50rem" }}
                            emptyMessage="No customers found."
                            header={renderHeader()}
                            filters={filters}
                        >
                            <Column
                                field="name"
                                header="Name"
                                style={{ width: "25%" }}
                            ></Column>
                            <Column
                                field="country.name"
                                header="Country"
                                style={{ width: "25%" }}
                            ></Column>
                            <Column
                                field="company"
                                header="Company"
                                style={{ width: "25%" }}
                            ></Column>
                            <Column
                                field="representative.name"
                                header="Representative"
                                style={{ width: "25%" }}
                            ></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
