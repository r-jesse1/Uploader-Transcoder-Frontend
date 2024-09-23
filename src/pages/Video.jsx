import React from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {
  Row, Col, Container, Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Table,
  Button,
  Spinner
} from "reactstrap";
import ErrorHandler from "../components/ErrorHandler";


export default function Video() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")
  const [videoData, setVideoData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")
  let privateText = ""
  const navigate = useNavigate()
  const streamURL = `${process.env.REACT_APP_URL}/stream?id=${id}`
  
  const [open, setOpen] = useState('1');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };


  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/video/metadata?id=${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
   })
      .then(response => {
        if (!response.ok) {
          setError(true)
          setMessage(response)
          return Promise.reject(error);
        }
        return response.json()
      })
      .then(data => {
        console.log(data)
        setVideoData(_ => data.data)
        console.log(`status: ${videoData.resolution}`)
        setLoading(false)

      })
      .catch(error => {
        setLoading(false)

      })
  }, []) //end useEffect


  function deleteVideo() {
    fetch(`${process.env.REACT_APP_URL}/video/?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
   }).then(response => {
    if (!response.ok) {
      setMessage("Unauthorized")
      console.log(response.msg)
    }
    else {
    navigate("/")
    return response.json()
    }
})
  }

  function transcodeNavigate() {
    navigate(`/transcode?id=${id}`)
  }


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


if (videoData.private === 1) {
    privateText = "Private"
}
else {
    privateText = "Public"
}
  

  return (

    <Container className="container">
      <Row></Row>
      <Row></Row>
      <Row>

        <Col md="6">
          <video controls width="70%" className="videoPlayer" src={videoData.url}></video>
        </Col>

        <Col md="6">
          <h1>
            <Row className="Title">
              {videoData.name}
            </Row>
          </h1>

          <h5>
            <Row className="subheading">
              {videoData.resolution}p | {videoData.length}s | {videoData.fileType}
            </Row>
          </h5>

          <h3>
            <Row className="titleBody">
              Upload Date: {videoData.uploadDate}
            </Row>

            <Row className="subheading">
              ID: {videoData.ID}
            </Row>

            <Row className="titleBody">
            {privateText}
            </Row>

          </h3>

        </Col>
      </Row>
      <Row className = "my-auto">
      <Col md="2">
        <div></div>
        </Col>
        <Col md="1">
        <Button onClick={deleteVideo} style={{width: '6em'}}>
            Delete
        </Button>
        </Col>
        <Col md="1">
        <Button onClick={transcodeNavigate} style={{width: '6em'}}>
            Transcode
        </Button>
        </Col>
        <Col md="8">
        <div></div>
        </Col>
        <h5 className="errorMessage">{message}</h5>
      </Row>

      {/* <Row>
        <Col xs="10">
          <Accordion open={open} toggle={toggle}>
            <AccordionItem>
              <AccordionHeader targetId="1">Crew</AccordionHeader>
              <AccordionBody accordionId="1">
                <CreditTable credits={crew} />
              </AccordionBody>
            </AccordionItem>
          </Accordion>

          <Accordion open={open} toggle={toggle}>
            <AccordionItem>
              <AccordionHeader targetId="2">Actors</AccordionHeader>
              <AccordionBody accordionId="2">
                <CreditTable credits={actors} />
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </Col>
      </Row> */}

    </Container>
  )
}
