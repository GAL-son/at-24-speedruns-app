import { useState, useEffect } from "react";
import { Form } from "react-router-dom";

import './css/search.css'
import List from "./list";
import searchItem from "./searchItem";

export default function Search(params) {
    const {
        searchHint,
        searchFilter,
        isDropdown, 
        dropdownDataSource, 
        dropdownItem,
        dropdownLimit,
        submitAction,        
    } = params

    const [searchData, setSearchData] = useState([])
    
    const [searchLoading, setSearchLoading] = useState(true)
    const [searchError, setSearchError] = useState(false)
    const [searchFound, setSearchFound] = useState(true)

    const [dropdownActive, setDropdownActive] = useState(false)
    const [searchFocused, setSearchFocused] = useState(false)
    const [searchInput, setSearchInput] = useState("")

    const handleFocus = (e) => setSearchFocused(true);
    const handleBlur = (e) => setSearchFocused(false);

    useEffect(() => {
        if(!searchError) {
            if(searchData.length > 0) {
                setSearchFound(true)
            } else {
                setSearchFound(false)
            }
            setSearchLoading(false)
        }
        
    }, [searchData])
    
    
    const handleChange = (e) => {
        setSearchLoading(true)
        const newVal = e.target.value      
          
        dropdownDataSource()
            .then(data => {
                setTimeout(() => {
                    const filter = getSearchFilter(newVal)
                    // console.log(data.filter(filter).slice(0))
                    setSearchData(data.filter(filter).slice())
                }, 1000)
            }).catch(err => {
                console.error(err)
                setSearchError(true)
            })
        
        setSearchInput(newVal)

        if(newVal != "") {
            setDropdownActive(true)
        } else {
            setDropdownActive(false)
        }
    }

    const getSearchFilter = (q) => {
        // console.log(searchFilter)
        if(searchFilter === undefined) {
            return (x) => {return true};
        } else {
            return searchFilter(q)
        }
    }

    const getFilteredData = (data) => {
        
        const fdata = data.filter(getSearchFilter())
        return fdata;
    }

    const getLimit = () => {
        if(dropdownLimit === undefined) {
            return searchData.length
        } else {
            return dropdownLimit;
        }
    }

    return(
        <div className="search">    
            <Form id="search-form" role='search' className="d-flex">
                <input  autocomplete="off" className="form-control" type="search" placeholder={searchHint} aria-label="Search" id="q" value={searchInput} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
            </Form>

            {isDropdown && dropdownActive &&
            <div onMouseOver={() => {setSearchFocused(true)}} className="dropdown bg">
                <div className="text-center">SEARCH </div>
                {(searchLoading) && 
                    <div className="loading d-flex flex-column justify-content-center align-items-center">
                        SEARCHING
                    </div>
                }
                {(searchError) && 
                    <div className="text-center">SEARCH FAILED</div>
                }

                {/* {
                   <div className="dropdown-items d-flex flex-row flex-wrap">
                        <List content={searchData} Item={dropdownItem}/>
                   </div>    
                }                */}
                {(searchFound ? 
                <div className="dropdown-items d-flex flex-row flex-wrap">
                    <List content={searchData} Item={dropdownItem}/>
                </div> 
                :
                (!searchLoading ) &&<div className="bg-secondary w-100 h-100 text-center">NOT FOUND</div>)}
                
            </div>}
        </div>
    )
}