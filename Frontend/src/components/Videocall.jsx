// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import logo2 from "../assets/images/216925396.png";

// // export const Videocall = () => {
// //     const [roomId, setRoomId] = useState("");
// //     const navigate=useNavigate()

// //     const handleRoomIdGenerate = () => {
// //         const randomId = Math.random().toString(36).substring(2, 9);
// //         const timestamp = Date.now().toString().substring(-4);
// //         setRoomId(randomId + timestamp);
// //     };

// // const handleOneAndOneCall=()=>{
// //     if (!roomId){
// //         alert("Pease Generate Room Id first");
// //         return
// //     }
// //     // navigate(`/room/${roomId}?type=one-on-one`);
// //     navigate(`/room/${roomId}`);
// // };

// //   return (
  
// //   <div className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center px-5 rounded-b-4xl py-10 md:py-20 w-full"
// //             style={{ backgroundImage: `url(${logo2})` }}>
// //   <div className="bg-white p-10 rounded-3xl shadow-2xl text-center w-full max-w-lg transform transition-all duration-500 hover:scale-105 hover:shadow-3xl animate-fade-in">
// //     <h1 className="text-3xl font-extrabold text-gray-800 mb-5 drop-shadow-lg animate-bounce">Welcome to HALF COACH Video Calling </h1>
// //     <p className="text-gray-600 mb-6 text-lg">Start the video call with a randomly generated Room ID</p>

// //     <div className="flex items-center space-x-4 mb-5">
// //       <input 
// //         type="text" 
// //         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 text-lg" 
// //         placeholder="Generated Room ID" 
// //         value={roomId} 
// //         readOnly 
// //       />
// //       <button 
// //         className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg text-lg" 
// //         onClick={handleRoomIdGenerate}
// //       >
// //         Generate
// //       </button>
// //     </div>

// //     <div>
// //       <button 
// //         className={`px-7 py-3 rounded-lg text-white font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg ${roomId ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`} 
// //         onClick={handleOneAndOneCall} 
// //         disabled={!roomId}
// //       >
// //         stream VideoCall
// //       </button>
// //     </div>
// //   </div>
// // </div>
// //   );
// // };
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo2 from "../assets/images/216925396.png";

// export const Videocall = () => {
//     const [roomId, setRoomId] = useState("");
//     const navigate = useNavigate();

//     const handleRoomIdGenerate = () => {
//         const randomId = Math.random().toString(36).substring(2, 9);
//         const timestamp = Date.now().toString().slice(-4);
//         setRoomId(randomId + timestamp);
//     };

//     const handleOneAndOneCall = () => {
//         if (!roomId) {
//             alert("Please generate Room ID first");
//             return;
//         }
//         navigate(`/room/${roomId}?type=one-on-one`);
//     };

//     const handleGroupCall = () => {
//         if (!roomId) {
//             alert("Please generate Room ID first");
//             return;
//         }
//         navigate(`/room/${roomId}?type=group`);
//     };

//     return (
//         <div
//             className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center px-5 rounded-b-4xl py-10 md:py-20 w-full"
//             style={{ backgroundImage: `url(${logo2})` }}
//         >
//             <div className="bg-white p-10 rounded-3xl shadow-2xl text-center w-full max-w-lg transform transition-all duration-500 hover:scale-105 hover:shadow-3xl animate-fade-in">
//                 <h1 className="text-3xl font-extrabold text-gray-800 mb-5 drop-shadow-lg animate-bounce">
//                     Welcome to HALF COACH Video Calling
//                 </h1>
//                 <p className="text-gray-600 mb-6 text-lg">
//                     Start the video call with a randomly generated Room ID
//                 </p>

//                 <div className="flex items-center space-x-4 mb-5">
//                     <input
//                         type="text"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 text-lg"
//                         placeholder="Generated Room ID"
//                         value={roomId}
//                         readOnly
//                     />
//                     <button
//                         className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg text-lg"
//                         onClick={handleRoomIdGenerate}
//                     >
//                         Generate
//                     </button>
//                 </div>

//                 <div className="flex space-x-4 justify-center">
//                     <button
//                         className={`px-7 py-3 rounded-lg text-white font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg ${roomId ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
//                         onClick={handleOneAndOneCall}
//                         disabled={!roomId}
//                     >
//                         One-on-One Call
//                     </button>

//                     <button
//                         className={`px-7 py-3 rounded-lg text-white font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg ${roomId ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'}`}
//                         onClick={handleGroupCall}
//                         disabled={!roomId}
//                     >
//                         Group Call
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo2 from "../assets/images/216925396.png";

export const Videocall = () => {
    const [roomId, setRoomId] = useState("");
    const navigate=useNavigate()

    const handleRoomIdGenerate = () => {
        const randomId = Math.random().toString(36).substring(2, 9);
        const timestamp = Date.now().toString().substring(-4);
        setRoomId(randomId + timestamp);
    };

const handleOneAndOneCall=()=>{
    if (!roomId){
        alert("Pease Generate Room Id first");
        return
    }
    navigate(`/room/${roomId}?type=one-on-one`);
};

  return (
  
  <div className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center px-5 rounded-b-4xl py-10 md:py-20 w-full"
            style={{ backgroundImage: `url(${logo2})` }}>
  <div className="bg-white p-10 rounded-3xl shadow-2xl text-center w-full max-w-lg transform transition-all duration-500 hover:scale-105 hover:shadow-3xl animate-fade-in">
    <h1 className="text-3xl font-extrabold text-gray-800 mb-5 drop-shadow-lg animate-bounce">Welcome to HALF COACH Video Calling </h1>
    <p className="text-gray-600 mb-6 text-lg">Start the video call with a randomly generated Room ID</p>

    <div className="flex items-center space-x-4 mb-5">
      <input 
        type="text" 
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 text-lg" 
        placeholder="Generated Room ID" 
        value={roomId} 
        readOnly 
      />
      <button 
        className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg text-lg" 
        onClick={handleRoomIdGenerate}
      >
        Generate
      </button>
    </div>

    <div>
      <button 
        className={`px-7 py-3 rounded-lg text-white font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg ${roomId ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`} 
        onClick={handleOneAndOneCall} 
        disabled={!roomId}
      >
        One-on-One Call
      </button>
    </div>
  </div>
</div>
  );
};

