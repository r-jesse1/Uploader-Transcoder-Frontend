
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { 
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
  Input, 
  Col
} from "reactstrap";

import ErrorHandler from "../components/ErrorHandler";
import VideoStack from "../components/VideoStack";


export default function Home(args) {

    const [homeData, setHomeData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const [sort, setSort] = useState("name")
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [search, setSearch] = useState("")


    const toggle = () => setDropdownOpen((prevState) => !prevState);
    useEffect(() => {
        const URL = process.env.REACT_APP_URL + "/video/public?sort=" + sort + "&search=" + search
        console.log(URL)
            fetch(URL)
              .then(response => {
                console.log(response)
                if (!response.ok) {
                  setError(true)
                  setMessage(response)
                  return Promise.reject(error);
                }
                return response.json()
              })
              .then(data => {
                setHomeData(_ => data.data)
                console.log(sort)
                console.log(data.data)
                setLoading(false)
        
              })
              .catch(error => {
                setLoading(false)
        
              })
          }, [sort, search]) //end useEffect
        
          if (error) {
            return (
              <ErrorHandler error={message.status} />
            )
          }
          if (loading) return (
            <Spinner>
              Loading...
            </Spinner>
          )


          const changeValueSecondary = (val) => {
            setSort(val)
        }


          
    return(
        <div className="align">
            <h1>Public Videos</h1>
            <Input
            placeholder="Search"
            onChange={(query) => setSearch(query.target.value)}
          />
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
        <DropdownToggle caret>Sort by</DropdownToggle>
        <DropdownMenu {...args}>
          <DropdownItem >Some Action</DropdownItem>
            <DropdownItem onClick={() => changeValueSecondary("name")}> 
            Name
            </DropdownItem>
            <DropdownItem onClick={() => changeValueSecondary("size")}>
            Size
            </DropdownItem>
            <DropdownItem onClick={() => changeValueSecondary("owner")}>
            Uploader
            </DropdownItem>
            <DropdownItem onClick={() => changeValueSecondary("length")}>
            Length
            </DropdownItem>
            <DropdownItem onClick={() => changeValueSecondary("uploadDate")}>
            Upload Date
            </DropdownItem>




        </DropdownMenu>
      </Dropdown>


            <VideoStack data={homeData}/>
    </div>
    )
}