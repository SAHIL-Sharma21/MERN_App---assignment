import { useEffect, useState } from "react";

interface User {
    _id: string;
    username: string;
    email: string;
    userAge: number;
}

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/users');
            const data: User[] = await response.json();
            setUsers(data);
        } catch (error) {
            console.log("Error fetching users", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.userAge}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}><h1>No Users to show</h1></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default UserTable;
