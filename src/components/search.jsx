import { useState } from "react";
import { Form } from "react-router-dom";

import './css/search.css'
import List from "./list";
import searchItem from "./searchItem";

export default function Search(params) {
    const {isDropdown, dropdownDataSource, dropdownItem} = params

    const [dropdownActive, setDropdownActive] = useState(false)
    const [searchInput, setSearchInput] = useState("")

    const handleChange = (e) => {
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
                <input  autocomplete="off" className="form-control" type="search" placeholder="Search games..." aria-label="Search" id="q" value={searchInput} onChange={handleChange}/>
            </Form>

            {isDropdown && dropdownActive && 
            <div className="dropdown d-flex flex-row flex-wrap">
                <div className="text-center">SEARCH RESULT</div>
                <List content={dropdownDataSource.filter(searchFilter)} Item={searchItem}/>
            </div>}
        </div>
    )
}