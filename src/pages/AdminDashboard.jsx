import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("https://bookingback.onrender.com/api/admin/users", {
            withCredentials: true
        })
        .then(res => setUsers(res.data))
        .catch(err => {
            console.error("Failed to load users:", err);
        });
    }, []);

    const exportBookings = async () => {
        try {
            const response = await axios.get(
                "https://bookingback.onrender.com/api/admin/export-bookings",
                {
                    withCredentials: true,
                    responseType: "blob"
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = "booking-report.xlsx";
            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Export failed:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="center">Admin Dashboard</h1>

            <button className="primary-btn btn-full" onClick={exportBookings}>
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