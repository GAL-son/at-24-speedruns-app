import { useState, useEffect } from "react";
import { Form } from "react-router-dom";

import './css/search.css'
import List from "./list";
import searchItem from "./searchItem";

export default function Search(params) {
    const {isDropdown, dropdownDataSource, dropdownItem} = params

    const [searchData, setSeatchData] = useState([])
    const [searchLoading, setSearchLoading] = useState(true)
    const [searchError, setSearchError] = useState(false)

    const [dropdownActive, setDropdownActive] = useState(false)
    const [searchFocused, setSearchFocused] = useState(false)
    const [searchInput, setSearchInput] = useState("")

    const handleFocus = (e) => setSearchFocused(true);
    const handleBlur = (e) => setSearchFocused(false);

    useEffect(() => {
        if(!searchError) {
            setSearchLoading(false)
        }
        
    }, [searchData])
    
    const handleChange = (e) => {
        setSearchLoading(true)
        dropdownDataSource()
            .then(data => {
                setSeatchData(data)
            }).catch(err => {
                console.error(err)
                setSearchError(true)
            })
        const newVal = e.target.value
        setSearchInput(newVal)

        if(newVal != "") {
            setDropdownActive(true)
        } else {
            setDropdownActive(false)
        }
    }

    const searchFilter = (item) => {
        if(item+2 > searchInput.length) return true
    }

    return(
        <div className="search">    
            <Form id="search-form" role='search' className="d-flex">
                <input  autocomplete="off" className="form-control" type="search" placeholder="Search games..." aria-label="Search" id="q" value={searchInput} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
            </Form>

            {isDropdown && dropdownActive && searchFocused && 
            <div className="dropdown d-flex flex-row flex-wrap">
                <div className="text-center">SEARCH </div>
                {(!searchLoading) && 
                    <List content={searchData} Item={dropdownItem}/>
                }
                {(searchError) && 
                    <div className="text-center">SEARCH FAILED</div>
                }
            </div>}
        </div>
    )
}