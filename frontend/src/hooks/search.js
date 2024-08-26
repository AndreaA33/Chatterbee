import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const usesearch = () => {
    const [search, setSearch] = useState([]);

    const handleSearch = async (searchtext) => {
        try {
            const res = await fetch('/api/users/getuser', {
                method: "POST",  
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: searchtext }) 
            });

            if (!res.ok) {
                throw new Error("Failed to retrieve user data");
            }

            const data = await res.json(); 
            toast.success(data)
            setSearch(data);

        } catch (error) {
            console.error("Search error:", error.message);
            console.log(error.message)
        }
    };

    return { search, handleSearch };
};
