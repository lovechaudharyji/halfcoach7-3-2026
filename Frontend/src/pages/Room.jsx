

// // import { useRef, useState, useEffect } from "react";
// // import { useParams, useLocation, useNavigate } from "react-router-dom";
// // import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// // import { APP_ID } from "../Config";
// // import { VIDEOLOVE } from "../Config";
// // import { NavLink } from "react-router-dom";
// // import logo2 from "../assets/images/216925396.png";

// // const Room = () => {
// //   const { roomId } = useParams();
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const zpRef = useRef(null);
// //   const videoContainerRef = useRef(null);
// //   const [joined, setJoined] = useState(false);
// //   const [callType, setCallType] = useState("");

// //   const myMeeting = (type) => {
// //     const appID = APP_ID;
// //     const serverSecret = VIDEOLOVE;
// //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
// //       appID,
// //       serverSecret,
// //       roomId,
// //       Date.now().toString(),
// //       "Your Name"
// //     );

// //     const zp = ZegoUIKitPrebuilt.create(kitToken);
// //     zpRef.current = zp;

// //     zp.joinRoom({
// //       container: videoContainerRef.current,
// //       sharedLinks: [
// //         {
// //           name: "Video Call Link",
// //           url:
// //             window.location.protocol +
// //             "//" +
// //             window.location.host +
// //             window.location.pathname +
// //             "?type=" + encodeURIComponent(type),
// //         },
// //       ],
// //       scenario: {
// //         mode:
// //           type === "one-on-one"
// //             ? ZegoUIKitPrebuilt.OneONoneCall
// //             : ZegoUIKitPrebuilt.GroupCall,
// //       },
// //       maxUsers: type === "one-on-one" ? 2 : 10,
// //       onJoinRoom: () => {
// //         setJoined(true);
// //       },
// //       onLeaveRoom: () => {
// //         navigate("/");
// //       },
// //     });
// //   };

// //   useEffect(() => {
// //     const query = new URLSearchParams(location.search);
// //     const type = query.get("type");
// //     setCallType(type);
// //   }, [location.search]);

// //   useEffect(() => {
// //     if (callType) {
// //       myMeeting(callType);
// //     }

// //     return () => {
// //       if (zpRef.current) {
// //         zpRef.current.destroy();
// //       }
// //     };
// //   }, [callType, roomId, navigate]);

// //   return (
// //     <div
// //       className={`min-h-screen ${
// //         joined ? "w-full h-screen" : "flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-700 p-4"
// //       }`}
// //       style={{
// //         backgroundImage: `url(${logo2})`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //       }}
// //     >
// //       {!joined && (
// //         <>
// //           <header className="mb-6 text-white text-3xl font-bold animate-fadeIn">
// //             {callType === "one-on-one" ? "One-on-One Video Call" : "Group Video Call"}
// //           </header>
// //           <NavLink to="/about">
// //             <button className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition">
// //               Exit
// //             </button>
// //           </NavLink>
// //         </>
// //       )}
// //       <div
// //         ref={videoContainerRef}
// //         className={`${
// //           joined
// //             ? "w-full h-full"
// //             : "w-full max-w-6xl h-[80vh] mt-8 rounded-lg shadow-lg border border-gray-300 bg-gray-900"
// //         }`}
// //       />
// //     </div>
// //   );
// // };

// // export default Room;


// import { useRef, useState, useEffect } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { APP_ID, VIDEOLOVE } from "../Config";
// import { NavLink } from "react-router-dom";
// import logo2 from "../assets/images/216925396.png";

// const Room = () => {
//   const { roomId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const zpRef = useRef(null);
//   const videoContainerRef = useRef(null);
//   const [joined, setJoined] = useState(false);
//   const [callType, setCallType] = useState("");

//   const myMeeting = (type) => {
//     const appID = APP_ID;
//     const serverSecret = VIDEOLOVE;

//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       appID,
//       serverSecret,
//       roomId,
//       Date.now().toString(),
//       "User_" + Math.floor(Math.random() * 1000)
//     );

//     const zp = ZegoUIKitPrebuilt.create(kitToken);
//     zpRef.current = zp;

//     zp.joinRoom({
//       container: videoContainerRef.current,
//       sharedLinks: [
//         {
//           name: "Video Call Link",
//           url:
//             window.location.origin +
//             `/room/${roomId}?type=${encodeURIComponent(type)}`,
//         },
//       ],
//       scenario: {
//         mode:
//           type === "one-on-one"
//             ? ZegoUIKitPrebuilt.OneONoneCall
//             : ZegoUIKitPrebuilt.GroupCall,
//       },
//       maxUsers: type === "one-on-one" ? 2 : 10,
//       onJoinRoom: () => setJoined(true),
//       onLeaveRoom: () => navigate("/videocall"),
//     });
//   };

//   useEffect(() => {
//     const query = new URLSearchParams(location.search);
//     const type = query.get("type") || "group";
//     setCallType(type);
//   }, [location.search]);

//   useEffect(() => {
//     if (callType) {
//       myMeeting(callType);
//     }
//     return () => {
//       if (zpRef.current) {
//         zpRef.current.destroy();
//       }
//     };
//   }, [callType, roomId, navigate]);

//   return (
//     <div
//       className={`min-h-screen ${
//         joined
//           ? "w-full h-screen"
//           : "flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-700 p-4"
//       }`}
//       style={{
//         backgroundImage: `url(${logo2})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {!joined && (
//         <>
//           <header className="mb-6 text-white text-3xl font-bold animate-fadeIn">
//             {callType === "one-on-one" ? "One-on-One Video Call" : "Group Video Call"}
//           </header>
//           <NavLink to="/videocall">
//             <button className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition">
//               Exit
//             </button>
//           </NavLink>
//         </>
//       )}
//       <div
//         ref={videoContainerRef}
//         className={`${
//           joined
//             ? "w-full h-full"
//             : "w-full max-w-6xl h-[80vh] mt-8 rounded-lg shadow-lg border border-gray-300 bg-gray-900"
//         }`}
//       />
//     </div>
//   );
// };

// export default Room;


import { useRef, useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { APP_ID } from "../Config";
import { VIDEOLOVE } from "../Config";
import { NavLink } from "react-router-dom";
import logo2 from "../assets/images/216925396.png";

 const Room = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const zpRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [joined, setJoined] = useState(false);
  const [callType, setCallType] = useState("");

  const myMeeting = (type) => {
    const appID = APP_ID;
    const serverSecret = VIDEOLOVE;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Your Name"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zpRef.current = zp;

    zp.joinRoom({
      container: videoContainerRef.current,
      sharedLinks: [
        {
          name: "Video Call Link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?type=" + encodeURIComponent(type),
        },
      ],
      scenario: {
        mode:
          type === "one-on-one"
            ? ZegoUIKitPrebuilt.OneONoneCall
            : ZegoUIKitPrebuilt.GroupCall,
      },
      maxUsers: type === "one-on-one" ? 2 : 10,
      onJoinRoom: () => {
        setJoined(true);
      },
      onLeaveRoom: () => {
        navigate("/");
      },
    });
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const type = query.get("type");
    setCallType(type);
  }, [location.search]);

  useEffect(() => {
    if (callType) {
      myMeeting(callType);
    }

    return () => {
      if (zpRef.current) {
        zpRef.current.destroy();
      }
    };
  }, [callType, roomId, navigate]);

  return (
    <div
      className={`min-h-screen ${
        joined ? "w-full h-screen" : "flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-700 p-4"
      }`}
      style={{
        backgroundImage: `url(${logo2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!joined && (
        <>
          <header className="mb-6 text-white text-3xl font-bold animate-fadeIn">
            {callType === "one-on-one" ? "One-on-One Video Call" : "Group Video Call"}
          </header>
          <NavLink to="/about">
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition">
              Exit
            </button>
          </NavLink>
        </>
      )}
      <div
        ref={videoContainerRef}
        className={`${
          joined
            ? "w-full h-full"
            : "w-full max-w-6xl h-[80vh] mt-8 rounded-lg shadow-lg border border-gray-300 bg-gray-900"
        }`}
      />
    </div>
  );
};

export default Room;