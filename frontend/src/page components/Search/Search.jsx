import {React, useState} from 'react'
import "./search.css"
import {usesearch} from '../../hooks/search'

function Search() {

    const [searchtext, setSearch] = useState("")
    const {search, handleSearch} = usesearch()


    const handleSearchUser = async () => {
        if (searchtext.trim()) {
            await handleSearch(searchtext)
            setText("")
            handleSearch()
        }
    };

    return (
        <div className='search'>
            <input placeholder='Search' onChange={e=>setSearch(e.target.value)} value={searchtext}/>
            <button onClick={() => handleSearchUser}>Search</button>
            {search.map((value, index) => {
                <div key={index} className='search-listitem' onClick={() => setChat(value._id)}>
                <img src={value.profilepic}/>
                    <div className='search-listinf'>
                        <div className='searchlistinf-line1'>
                            <p>{value.fname} {value.lname}</p>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
    }

export default Search
