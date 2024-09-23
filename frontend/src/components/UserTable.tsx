import { useEffect, useState } from "react"

interface User {
    id: number;
    username: string;
    email: string;
    userAge: number;
}

const UserTable = () => {

    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/users');
            const data = await response.json();
            // console.log(data);
            setUsers(data);
        } catch (error) {
            console.log("Error fetching users", error);
        }
    };

    //making api call
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
                    <>
                        {users.map((user: User) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.userAge}</td>
                            </tr>
                        ))}
                    </>
                ) : (
                    <h1>No Users to show</h1>
                )}
            </tbody>
        </table>
    </>
  )
}

export default UserTable