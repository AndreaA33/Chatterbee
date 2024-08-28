import React, { useState, useCallback, useEffect} from 'react';
import { useSearchContext } from '../context/context';

export const usesearch = () => {

    const [search, setSearch] = useState([]);

    const { Searchtxt } = useSearchContext()

    const handleSearch = useCallback(async () => {
        try {
            const res = await fetch('/api/users/getuser', {
                method: "POST",  
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: Searchtxt }) 
            });

            if (!res.ok) {
                throw new Error("Failed to retrieve user data");
            }

            const data = await res.json(); 
            setSearch(data);

        } catch (error) {
            console.error("Search error:", error.message);
            console.log(error.message)
        }
    },[Searchtxt])

    useEffect(() => {
        handleSearch(); 
    }, [handleSearch]);

    return { search  };
};
