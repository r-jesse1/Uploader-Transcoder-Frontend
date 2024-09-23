import React from 'react';
import { Navigate } from 'react-router-dom';


function ErrorHandler(props) {

  if (props.error === 404)
    return (
      <div>
        <h1>404 Page not found.</h1>
        <h3>We couldn't find a video with that id!</h3>
      </div>
    )

  else if (props.error === 401)
    return (
      <Navigate to={"/login"}
        state={{
          id: props.id
        }} />

    )

  else if (props.error === 429)
    return (
      <div>
        <h1>429 Rate limit exceeded</h1>
        <h3>Please try again soon.</h3>
      </div>
    )

  else if (props.error === 400)
    return (
      <div>
        <h1>400 Invalid search parameters.</h1>
      </div>

    )
    
  else
    return (
      <h1>An unexpected error occurred.</h1>
    )
}
export default ErrorHandler;