import React from "react";
import { useState } from "react";
import { Input, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
const Cognito = require("@aws-sdk/client-cognito-identity-provider");


export default function Register() {

  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [usernameValue, setUsernameValue] = useState("")
  const [responseMessage, setResponseMessage] = useState("")
  const navigate = useNavigate();
  const clientId = "5keiclttbbi3a8cp46fc6ek60r";

async function register() {
    
    try {
    console.log("Signing up user");
    const client = new Cognito.CognitoIdentityProviderClient({ region: 'ap-southeast-2' });
    const command = new Cognito.SignUpCommand({
      ClientId: clientId,
      Username: usernameValue,
      Password: passwordValue,
      UserAttributes: [{ Name: "email", Value: emailValue }],
    });
    const res = await client.send(command);
    console.log(res);
    navigate(`/confirm?user=${usernameValue}`)
    //setResponseMessage(res.message)
  }
  catch (err) {
    setResponseMessage(err.message)
    console.log(err)
  }
  }




















//     const REGISTER_URL = process.env.REACT_APP_URL + "/users/register"

//     fetch(REGISTER_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         email: emailValue,
//         password: passwordValue
//       })
//     }
//     )
//       .then(response => response.json())
//       .then(responseData => {
//         setResponseMessage(responseData.message)
//       })
//       .catch(error => console.log(error))
//   }






  function handleKeyDown(input) {
    if (input.key === 'Enter') {
      register()
    }
  }

  return (
    <div>
      <Form>
        <h3>Register</h3>
        <FormGroup>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            value={emailValue}
            onChange={email => setEmailValue(email.target.value)}
            onKeyDown={handleKeyDown}
          />
        </FormGroup>
        <FormGroup>
          <Input
            id="username"
            name="username"
            placeholder="Username"
            type="username"
            value={usernameValue}
            onChange={user => setUsernameValue(user.target.value)}
            onKeyDown={handleKeyDown}
          />
        </FormGroup>
        <FormGroup>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            value={passwordValue}
            onChange={password => setPasswordValue(password.target.value)}
            onKeyDown={handleKeyDown}
          />
        </FormGroup>
        <FormGroup>
          <Button onClick={register}>Create Account</Button>
        </FormGroup>
        <h6>Already have an account? <Link to="/login">Login</Link></h6>
      </Form>
      <h5 className="errorMessage">
        {responseMessage}
      </h5>
    </div>
  )
}