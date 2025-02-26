import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  useEffect(() => {
    function getUrlParams(url) {
      let urlStr = url.split('?')[1];
      const urlSearchParams = new URLSearchParams(urlStr);
      const result = Object.fromEntries(urlSearchParams.entries());
      return result;
  }


      // Generate a Token by calling a method.
      // @param 1: appID
      // @param 2: serverSecret
      // @param 3: Room ID
      // @param 4: User ID
      // @param 5: Username
  const roomID = getUrlParams(window.location.href)['roomID'] || (Math.floor(Math.random() * 10000) + "");
  const userID = Math.floor(Math.random() * 10000) + "";
  const userName = "userName" + userID;
  const appID = Number(import.meta.env.VITE_APP_ID);
  const serverSecret = import.meta.env.VITE_SERVER_SECRET;
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

  
      // You can assign different roles based on url parameters.
      let role = getUrlParams(window.location.href)['role'] || 'Host';
      role = role === 'Host' ? ZegoUIKitPrebuilt.Host : ZegoUIKitPrebuilt.Audience;
      let config = {}
      if(role === 'Host'){
          config = {
           turnOnCameraWhenJoining: true,
           showMyCameraToggleButton: true,
           showAudioVideoSettingsButton: true,
           showScreenSharingButton: true,
           showTextChat: true,
           showUserList: true,
       }
      }
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
          container: document.querySelector("#root"),
          scenario: {
              mode: ZegoUIKitPrebuilt.LiveStreaming,
              config: {
                          role,
              },
          },
          sharedLinks: [{
              name: 'Join as an audience',
              url:
              window.location.protocol + '//' +
              window.location.host +
              window.location.pathname +
              '?roomID=' +
              roomID +
              '&role=Audience',
          }],
          ...config
          });

  },[])

  return (
    <>
     <div id="root"></div>
    </>
  )
}

export default App
