import { useState } from "react";
import { Dropdown } from "primereact/dropdown";

export default function SelectedOption({
    datas,
    placeholder,
    className,
    onchange,
}) {
    const [selectedStatus, setSelectedStatus] = useState(null);
    const handleChange = (e) => {
        onchange(e);
        setSelectedStatus(e.target.value);
    };
    return (
        <div className="card">
            <Dropdown
                id="status"
                name="status"
                value={selectedStatus}
                onChange={handleChange}
                options={datas}
                placeholder={placeholder}
                className={className}
            />
        </div>
    );
}
