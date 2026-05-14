import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get(
            "https://bookingback.onrender.com/api/admin/users",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(res => {
            setUsers(res.data);
        })
        .catch(err => {
            console.error(err);
        });

    }, []);

    const exportBookings = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "https://bookingback.onrender.com/api/admin/export-bookings",
                {
                    responseType: "blob",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const a = document.createElement("a");

            a.href = url;
            a.download = "booking-report.xml";

            document.body.appendChild(a);

            a.click();

            a.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {

            console.error(
                "Export failed:",
                error
            );
        }
    };

    return (
        <div>

            <h1>Admin Dashboard</h1>

            <button onClick={exportBookings}>
                Export Bookings (XML)
            </button>

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
    );
}