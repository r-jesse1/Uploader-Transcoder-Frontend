

import { Input, Form, FormGroup, Button, Label, Progress } from 'reactstrap';
import { useState, useRef  } from "react"
import { useSearchParams } from "react-router-dom";
import io from 'socket.io-client';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';




    // useEffect(() => {
    //     socket.on("progress", (data) => {
    //         console.log(data)
    //         setProgress(data.progress)
    //     })
    // }, [socket])


        // const rawResponse = await fetch(url, {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        //   },
        //   body: JSON.stringify(body)
        // });
        //const content = await rawResponse.json();
        //socket = io.connect("http://localhost:3005")






export default function Transcode(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const initialProgressId = searchParams.get("p");
  const [title, setTitle] = useState("");
  const [privateCheck, setPrivateCheck] = useState(false);
  const [format, setFormat] = useState("mp4");
  const [resolution, setResolution] = useState("1920x1080");
  const [progress, setProgress] = useState(0);
  const socket = useRef(null);
  const progressInterval = useRef(null);
  const [progressID, setProgressID] = useState(initialProgressId);















  // Function to handle progress updates
  const handleProgress = (data) => {
      console.log(data);
      setProgress(data.progress);

      // Stop asking for progress if it reaches 100%
      if (data.progress >= 100) {
          clearInterval(progressInterval.current); // Stop the regular requests
          socket.current.disconnect(); // Disconnect the socket
      }
  };

  useEffect(() => {
      socket.current = io.connect(process.env.REACT_APP_SOCKETURL); // Assign socket connection to socket.current

      // Listen for progress updates from the server
      socket.current.on("progress", handleProgress);
      if (initialProgressId != null) {
        startProgressRequests(initialProgressId)
      }
      // Clean up when component unmounts
      return () => {
          clearInterval(progressInterval.current);
          socket.current.disconnect(); // Disconnect socket on unmount to prevent memory leaks
      };
  }, []);

  // Function to request progress at regular intervals
  const startProgressRequests = (progressId) => {
      progressInterval.current = setInterval(() => {
        console.log("requesting:", progressId);
          socket.current.emit("requestProgress", progressId); // Emit the progressId for progress requests
      }, 1000); // Adjust the interval as needed
  };

  async function transcodeRequest() {
      const url = process.env.REACT_APP_URL + "/video/transcode";
      const newProgressId = nanoid(); // Generate a new unique progress ID
      console.log("Generated progressId:", newProgressId);
      
      // Set the progress ID in state and URL
      setProgressID(newProgressId);
      setSearchParams({ id: id, p: newProgressId });

      const body = {
          id: id,
          name: title,
          private: privateCheck,
          fileType: format,
          resolution: resolution,
          progressID: newProgressId
      };

      // Emit the transcode request
      socket.current.emit("transcode", {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              authorization: `Bearer ${localStorage.getItem("authToken")}`
          },
          body: body
      });

      // Start progress requests only after the progress ID is set
      startProgressRequests(newProgressId);
      console.log("Generated progressId:", newProgressId);

  }
    return(
        <div>
    <h1>Transcode</h1>
    <Form>
  <FormGroup>

    <Input
      id="title"
      name="title"
      placeholder="New Title"
      type="text"
      value={title}
      onChange={text => setTitle(text.target.value)}
    />
  </FormGroup>

  <FormGroup>
    <Label for="fileType">
      File Extension
    </Label>
    <Input
      id="fileType"
      name="select"
      type="select"
      value={format}
      onChange={select => setFormat(select.target.value)}
    >
      <option>
        mp4
      </option>
      <option>
        avi
      </option>
      <option>
        mov
      </option>
    </Input>
  </FormGroup>
  
  <FormGroup>
    <Label for="resolution">
      Resolution
    </Label>
    <Input
      id="resolution"
      name="select"
      type="select"
      value={resolution}
      onChange={select => setResolution(select.target.value)}
    >
      <option>
        1920x1080
      </option>
      <option>
      1280x720
      </option>
      <option>
      854x480
      </option>
      <option>
      640x360
      </option>
    </Input>
  </FormGroup>

  <FormGroup check>
  <Label check>
      Private?
    </Label>
    <Input 
        type="checkbox" 
        id="private"
        value={privateCheck}
        onChange={_ => setPrivateCheck(!privateCheck)}
    />
    {' '}
  </FormGroup>
  <Button onClick={transcodeRequest}>
    Submit
  </Button>
</Form>
<Progress
  value={progress}
/>
</div>
    )
}