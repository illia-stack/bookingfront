import { useEffect, useState } from "react";
import { getUsers, exportBookings } from "../api/api";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
        .then(res => setUsers(res.data))
        .catch(err => {
            console.error("Failed to load users:", err);
        });
    }, []);

    const handleExport = async () => {
    try {
        const res = await exportBookings();
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "booking-report.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error(err);
    }
    };

    return (
        <div className="container">
            <h1 className="center">Admin Dashboard</h1>

            <button className="primary-btn btn-full" onClick={handleExport}>
                Export Bookings (Excel)
            </button>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}