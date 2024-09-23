import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import './App.css';
import Navibar from './components/nav';

import Home from "./pages/Home"
import Upload from './pages/Upload';
import Video from './pages/Video';
import MyVideos from './pages/MyVideos';
import Transcode from './pages/Transcode';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from "./pages/Register";
import Confirm from "./pages/Confirm";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';


export const UserContext = createContext(null);

function App() {

  // const client = new SSMClient({ region: "ap-southeast-2" });
  
  // Amplify.configure({
  //   Auth: {
  //     // REQUIRED - Amazon Cognito Identity Pool ID
  //     identityPoolId: 'YOUR_IDENTITY_POOL_ID',
  //     // REQUIRED - Amazon Cognito Region
  //     region: 'ap-southeast-2',
  //   },
  // });
  
  // async function fetchParameter() {
  //   try {
  //     const command = new GetParameterCommand({ Name: "/n11411911/assessment/backend-url" });
  //     const response = await client.send(command);
  //     console.log(response.Parameter.Value);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  
  // fetchParameter();





  // async function func() {
  //    try {
  //       let response = await client.send(
  //          new GetParameterCommand({
  //             Name: parameter_name
  //          })
  //       );
  
  //       console.log(response.Parameter.Value);
  //    } catch (error) {
  //       console.log(error);
  //    }
  // }
  
  // func();



  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      <Navibar className="Navibar" logstate={false} updateLog={false} />
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/video" element={<Video />} />
            <Route path="/myvideos" element={<MyVideos />} />
            <Route path="/transcode" element={<Transcode />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirm" element={<Confirm />} />

          </Routes>
        </header>

      </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}






























// function App() {
//   return (
//     <div className="App">
//       <header className="App-header"></header>
//       <div className="body">
//       <div className="content">
//       <div className="video-container">
//         {
//           //showVideo && selectedVideo && (
//             (
//             <video width='1920' height='1080' controls autoPlay='autoPlay' src="uwu.mp4">
//               video not supported
//             </video>
//           )
//         }
//       </div>

//       </div>
//       </div>

//     </div>
//   );
// }

// function App() {
//   return (
//     <body>
//   <Navibar/>   
//   <VideoCard image="https://placehold.co/600x400/png"/>  
//   {/* <Image src={require("/0plDROtvwgrM0FRL61ZQk.mp4.png")} rounded />  */}
// <input type="file" accept="video/*"/>
// <video controls autoplay></video>
// </body>
//   )
// }



export default App;
