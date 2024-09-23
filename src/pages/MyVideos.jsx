
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Row, Col, Container,
  Spinner
} from "reactstrap";

import ErrorHandler from "../components/ErrorHandler";
import VideoStack from "../components/VideoStack";

export default function MyVideos(args) {

    const [privateData, setPrivateData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")
    const URL = process.env.REACT_APP_URL + "/video/private"

    useEffect(() => {
            fetch(URL, 
            {
              method: 'GET',
              headers: {
                  'Accept': 'application/json',
                  "Authorization": `Bearer ${localStorage.getItem("authToken")}`
              }
            })
            
            
            
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
                setPrivateData(_ => data.data)
                setLoading(false)
        
              })
              .catch(error => {
                setLoading(false)
        
              })
          }, []) //end useEffect
        
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

    return(
        <div>
            <h1>My Videos</h1>
            <VideoStack data={privateData}/>
    </div>
    )
}