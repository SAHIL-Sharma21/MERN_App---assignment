import React, { ChangeEvent, FormEvent, useState } from "react";

interface User {
    username: string;
    email: string;
    userAge: number | string;  // Allow string initially for the empty value
}

interface UserFormProps {
    adduser: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ adduser }) => {
    const [formData, setFormData] = useState<User>({
        username: "",
        email: "",
        userAge: "",  // Initially set to an empty string
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "userAge" ? value : value  // Keep age as string for now
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userToSubmit = {
                ...formData,
                userAge: formData.userAge ? Number(formData.userAge) : 0  // Convert to number before sending
            };

            const response = await fetch("http://localhost:8080/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userToSubmit),
            });

            const result = await response.json();
            adduser(result);
        } catch (error) {
            console.log("Error submitting form", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="user-form">
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="number"
                    name="userAge"
                    value={formData.userAge.toString()}  // Display age as string
                    onChange={handleChange}
                    placeholder="Age"
                    required
                />
                <button type="submit">Add User</button>
            </form>
        </>
    );
};

export default UserForm;
