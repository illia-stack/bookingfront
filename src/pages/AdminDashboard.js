import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get("https://bookingback.onrender.com/api/admin/users", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => setUsers(res.data))
        .catch(err => console.error(err));
    }, []);

    const exportBookings = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "https://bookingback.onrender.com/api/admin/export-bookings",
                {
                    responseType: "blob", // sehr wichtig für Excel
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const url = window.URL.createObjectURL(response.data);
            const a = document.createElement("a");
            a.href = url;
            a.download = "booking-report.xlsx";
            a.click();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Export failed:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="center">Admin Dashboard</h1>
            <br></br>
            <p> Administrator dashbord is currently disabled for infrastructure restrictions</p>
            <Link to="/">
                Back to Home
            </Link>
            <br></br>
            <button className="primary-btn btn-full" onClick={exportBookings}>
                Report service requires further infrastucture extensions
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