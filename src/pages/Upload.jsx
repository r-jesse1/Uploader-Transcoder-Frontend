

import { Input, Form, FormGroup, Button, Label, FormText } from 'reactstrap';
import { useState, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom";




export default function Upload(props) {
    const [title, setTitle] = useState("")
    const [privateCheck, setPrivateCheck] = useState(false)
    const [videoFile, setVideoFile] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
        console.log(`auth: ${localStorage.getItem("authToken")}`)
        if (localStorage.getItem("authToken") === null) {
            navigate("/login")
        }
    }, [] )





    function uploadFile() {
        const url = process.env.REACT_APP_URL + "/upload/"
    try {
        let data = new FormData();
        data.append('video', videoFile);
        data.append('name', title);
        data.append('private', privateCheck);
        console.log(data)
        console.log("data")
        fetch(url, {
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
                 "Authorization": `Bearer ${localStorage.getItem("authToken")}`
             },
             body: data
        }).then((response) =>  {
            console.log(response)
           return response.text();
        })
    }












    //     fetch(url, {
    //       method: "POST",
    //     //   headers: {
    //     //     "Content-Type": "multipart/form-data"
    //     //   },
    //       body: JSON.stringify({
    //         name: title,
    //         uploader: "guest",
    //         private: privateCheck,
    //         video: videoFile
    //       })
    //     // body: JSON.stringify({
    //     //          name: "hello"
    //     //                     })
    //     }
        
    //     )
    //       .then(response => {
    //         //console.log(response.data)
    //         if (!response.ok) {
    //           //setResponseMessage("Incorrect email or password")
    //           throw new Error(response)
    //         }
    //         else { console.log(response) }
    //       })
    // }

catch(err) {
    console.log("error found")
}
    }
        //   .then(responseData => {
        //     localStorage.setItem("authToken", responseData.bearerToken.token)
        //     localStorage.setItem("refreshToken", responseData.refreshToken.token)
        //     setResponseMessage(responseData.message)
        //     props.updateLog(true)
        //   })
        //   .then(_ => {
        //     if (responseMessage === "") {
    
        //       //Navigate only if an error has not occured
        //       setTimeout(() => {
        //         navigate(destination);
        //       }, 750)
        //     }
        //   })





    return(
        <div>
    <h1>Video Upload</h1>
    <Form>
  <FormGroup>
    {/* <Label for="title">
      Email
    </Label> */}
    <Input
      id="title"
      name="title"
      placeholder="Title"
      type="text"
      value={title}
      onChange={text => setTitle(text.target.value)}
    />
  </FormGroup>
 
  <FormGroup>
    {/* <Label for="exampleFile">
      Video Upload
    </Label> */}
    <Input
      id="video"
      name="video"
      type="file"
      onChange={file => setVideoFile(file.target.files[0])}
    />
    <FormText>
      Allowed files:
    </FormText>
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
  <Button onClick={uploadFile}>
    Submit
  </Button>
</Form>
</div>
    )
}