import React from "react";
import { Input, Form, FormGroup, Button } from 'reactstrap';
import { useState, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../App";
import { QRCodeCanvas } from 'qrcode.react';
const Cognito = require("@aws-sdk/client-cognito-identity-provider");
const appName = "Video Transcoder";

export default function Login(props) {
  const [userValue, setUserValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [session, setSession] = useState("");
  const [MFACode, setMFACode] = useState("");
  const [loginState, setLoginState] = useState("login"); // 'login', 'mfa_setup', 'mfa_verify'
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const clientId = "5keiclttbbi3a8cp46fc6ek60r";

  const client = new Cognito.CognitoIdentityProviderClient({
    region: "ap-southeast-2",
  });

  async function LoginUser() {
    console.log("Getting auth token");
    const command = new Cognito.InitiateAuthCommand({
      AuthFlow: Cognito.AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: userValue,
        PASSWORD: passwordValue,
      },
      ClientId: clientId,
    });

    try {
      const response = await client.send(command);
      console.log(response);

      if (response.ChallengeName === "SOFTWARE_TOKEN_MFA") {
        // MFA verification needed
        setSession(response.Session);
        setLoginState("mfa_verify");
        console.log("MFA required, session set:", response.Session);
      } else if (response.ChallengeName === "MFA_SETUP") {
        // MFA setup needed
        const setupCommand = new Cognito.AssociateSoftwareTokenCommand({
          Session: response.Session,
        });
        const setupResponse = await client.send(setupCommand);
        console.log(setupResponse);

        setSecretCode(setupResponse.SecretCode);
        setSession(setupResponse.Session);
        setLoginState("mfa_setup"); // Switch to MFA setup state
      } else {
        // Normal login flow
        localStorage.setItem("authToken", response.AuthenticationResult.IdToken);
        localStorage.setItem("user", userValue);
        setUser(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setResponseMessage("Incorrect user or password");
    }
  }

  async function verifyMFA() {
    const challengeResponseCommand = new Cognito.RespondToAuthChallengeCommand({
      ChallengeName: "SOFTWARE_TOKEN_MFA",
      Session: session,
      ChallengeResponses: {
        USERNAME: userValue,
        SOFTWARE_TOKEN_MFA_CODE: MFACode,
      },
      ClientId: clientId,
    });

    try {
      const challengeResponse = await client.send(challengeResponseCommand);
      console.log("MFA challenge completed:", challengeResponse);

      if (challengeResponse.AuthenticationResult) {
        localStorage.setItem("authToken", challengeResponse.AuthenticationResult.IdToken);
        localStorage.setItem("user", userValue);
        setUser(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during MFA challenge", error);
      setResponseMessage("MFA verification failed");
    }
  }

  async function verifyMFASetupToken() {
    const verifyCommand = new Cognito.VerifySoftwareTokenCommand({
      Session: session,
      UserCode: MFACode, // the MFA code user inputs
      FriendlyDeviceName: "My Device", // Optional: name for the user's device
    });
  
    try {
      const verifyResponse = await client.send(verifyCommand);
      console.log("MFA token verified:", verifyResponse);
      if (verifyResponse.Status === "SUCCESS") {
        // Now the MFA setup is complete, you may want to transition to login again
        setLoginState("login");
        setResponseMessage("MFA setup completed. Please log in again.");
      } else {
        setResponseMessage("MFA setup verification failed.");
      }
    } catch (error) {
      console.error("MFA setup verification error:", error);
      setResponseMessage("Error verifying MFA token.");
    }
  }



  function handleKeyDown(input) {
    if (input.key === "Enter") {
      if (loginState === "mfa_verify") {
        verifyMFA(); // Verify MFA if we're in the MFA verification state
      } else if (loginState === "login") {
        LoginUser(); // Otherwise, attempt to log in
      }
    }
  }

  return (
    <div>
      {/* Error message banner */}
      {location.state !== null && (
        <Button color="danger" outline disabled>
          You must log in before viewing this page.
        </Button>
      )}

      {loginState === "login" && (
        <Form>
          <h3>Login</h3>
          <FormGroup>
            <Input
              id="user"
              name="user"
              placeholder="Username"
              type="text"
              value={userValue}
              onChange={user => setUserValue(user.target.value)}
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
            <Button onClick={LoginUser}>Login</Button>
          </FormGroup>
          <h6>
            Not registered? <Link to="/register">Create an account</Link>
          </h6>
        </Form>
      )}

{loginState === "mfa_setup" && (
  <div>
    <h3>Scan this QR code with your MFA app:</h3>
    <QRCodeCanvas
      value={`otpauth://totp/${encodeURIComponent(appName)}:${encodeURIComponent(userValue)}?secret=${secretCode}&issuer=${encodeURIComponent(appName)}`}
    />
    <h5>Alternatively, enter this code in your MFA app:</h5>
    <h5>{secretCode}</h5>
    <FormGroup>
      <Input
        id="MFA"
        name="MFA"
        placeholder="Enter MFA Code"
        type="text"
        value={MFACode}
        onChange={e => setMFACode(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </FormGroup>
    <FormGroup>
      <Button onClick={verifyMFASetupToken}>Verify MFA Token</Button>
    </FormGroup>
  </div>
)}

      {loginState === "mfa_verify" && (
        <div>
          <h3>Enter MFA Code</h3>
          <FormGroup>
            <Input
              id="MFA"
              name="MFA"
              placeholder="Enter MFA Code"
              type="text"
              value={MFACode}
              onChange={e => setMFACode(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </FormGroup>
          <FormGroup>
            <Button onClick={verifyMFA}>Submit MFA Code</Button>
          </FormGroup>
        </div>
      )}

      <h5 className="errorMessage">{responseMessage}</h5>
    </div>
  );
}
