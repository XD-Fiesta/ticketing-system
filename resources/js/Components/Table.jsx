import { DataTable } from "primereact/datatable";
import { useState, useEffect } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

export default function Table({
    datas,
    modalAdd,
    rows,
    children,
    emptyMessage = "No rows found.",
}) {
    // nyimpen data
    const [data, setData] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    useEffect(() => {
        setData(datas);
    }, [datas]);

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
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
                {modalAdd}
            </div>
        );
    };

    return (
        <DataTable
            value={data}
            paginator
            rows={rows}
            tableStyle={{ minWidth: "50rem" }}
            emptyMessage={emptyMessage}
            header={renderHeader()}
            filters={filters}
        >
            {children}
        </DataTable>
    );
}
