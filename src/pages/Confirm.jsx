import React from "react";
import { useState } from "react";
import { Input, Form, FormGroup, Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
const Cognito = require("@aws-sdk/client-cognito-identity-provider");


export default function Confirm() {
    const [searchParams] = useSearchParams()
    const user = searchParams.get("user")
  const [confirmationCode, setConfirmationCode] = useState("")
  const [responseMessage, setResponseMessage] = useState("")
  const clientId = "5keiclttbbi3a8cp46fc6ek60r";
  const navigate = useNavigate();

async function confirm() {
    try {
        const client = new Cognito.CognitoIdentityProviderClient({ region: 'ap-southeast-2' });
        const command2 = new Cognito.ConfirmSignUpCommand({
          ClientId: clientId,
          Username: user,
          ConfirmationCode: confirmationCode,
        });
      
        const res = await client.send(command2);
        console.log(res);
        navigate("/login")
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
      confirm()
    }
  }

  return (
    <div>
      <Form>
        <h3>Enter email confirmation code</h3>
        <FormGroup>
          <Input
            id="confirmationCode"
            name="confirmationCode"
            placeholder="Confirmation code"
            type="confirmationCode"
            value={confirmationCode}
            onChange={confirmcode => setConfirmationCode(confirmcode.target.value)}
            onKeyDown={handleKeyDown}
          />
        </FormGroup>
        
        <FormGroup>
          <Button onClick={confirm}>Confirm Account</Button>
        </FormGroup>
      </Form>
      <h5 className="errorMessage">
        {responseMessage}
      </h5>
    </div>
  )
}