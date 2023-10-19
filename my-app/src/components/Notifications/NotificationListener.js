// import React, {useState, useEffect} from 'react'
// import {  toast } from 'react-toastify';
// import {  onMessageListener } from '../../firebaseConfig';

// const Notification = () => {
//   const [notification, setNotification] = useState({title: '', body: ''});
//   const notify = () =>  toast.info(<ToastDisplay/>); 
//   function ToastDisplay() {
//     const bodyLines = notification?.body.split('\n');

//     return (
//       <div>
//         <p><b>{notification?.title}</b></p>
//         {bodyLines.map((line, index) => (
//           <p key={index}>{line}</p>
//         ))}
//       </div>
//     );
//   }

//   useEffect(() => {
//     if (notification?.title ){
//      notify()
//     }
//   }, [notification])


//   onMessageListener()
//     .then((payload) => {
//       setNotification({title: payload?.notification?.title, body: payload?.notification?.body});     
//     })
//     .catch((err) => console.log('failed: ', err));

// }

// export default Notification