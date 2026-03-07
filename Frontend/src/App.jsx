import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import { Home } from "./pages/Home";
import { Book } from "./pages/Book";
import { Coaches } from "./pages/Coaches";
import { AppLayout } from "./components/Layouts/AppLayout";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { CoachF } from "./pages/CoachF";
import { CoachProfile } from "./pages/CoachProfile";
import { Logout } from "./pages/Logout";
import { Coachregister } from "./pages/Coachregister";
import { Coachlogin } from "./pages/Coachlogin";
import { CoachDashboard } from "./pages/CoachDashboard";
import { UserDashboard } from "./pages/UserDashboard";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
//  import { Videocall } from "./components/Videocall";
 import  Room  from "./pages/Room";
import { AdminLayout } from "./components/Layouts/AdminLayout";
import { AdminCoachs } from "./pages/AdminCoachs";
import { AdminUsers } from "./pages/AdminUsers";
//import { CoachBookUpload } from "./pages/CoachBookUpload";
//import {PaymentSuccess} from "./pages/PaymentSucess";
import { AdminBlogs } from "./pages/AdminBlogd"; // 💡 Import this at the top
import { AdminBooks } from "./pages/AdminBooks";
import { ForgotCoachPassword } from "./pages/ForgotCoachPassword";
import { ResetCoachPassword } from "./pages/ResetCoachPassword";
//import { CoachGuide } from "./pages/CoachGuide";
import { PaymentFailure } from "./pages/PaymentFailure";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { StripePayment } from "./pages/StripePayment";
import { DownloadSuccess } from "./pages/DownloadSuccess";
import { PaymentSuccesss } from "./components/PaymentSuccesss";
import { AdminRegister } from "./pages/AdminRegister";





const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "about",
        element: <About />,
      },

      {
        path: "blog",
        element: <Blog />,
      },

      {
        path: "book",
        element: <Book />,
      },

      {
        path: "coaches",
        element: <Coaches />,
      },

      {
        path: "terms",
        element: <Terms />,
      },

      {
        path: "privacy",
        element: <Privacy />,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "Register",
        element: <Register />,
      },

      {
        path: "coachF",
        element: <CoachF />,
      },

      {
        path: "coach/:id",
        element: <CoachProfile />,
      },

      {
        path: "logout",
        element: <Logout />,
      },

      {
        path: "coachregister",
        element: <Coachregister />,
      },

      {
        path: "coachlogin",
        element: <Coachlogin />,
      },

      {
        path: "coachdashboard/:coachId",
        element: <CoachDashboard />,
      },

      {
        path: "userdashboard/:userId",
        element: <UserDashboard />,
      },

      // {
      //   path: "videocall",
      //   element: <Videocall />,
      // },

      {
        path: "room/:roomId",
        element: <Room />,
      },

      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },

      {
        path: "forgotpassword",
        element: <ForgotCoachPassword />,
      },

      {
        path: "resetpassword",
        element: <ResetCoachPassword />,
      },

      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { path: "users", element: <AdminUsers /> },
          { path: "coachs", element: <AdminCoachs /> },
          { path: "blogs", element: <AdminBlogs /> },
          { path: "coachbooks", element: <AdminBooks /> },
          { path: "adminregister", element: <AdminRegister /> }, // ✅ Add this line

         // { path: "settings", element: <AdminSettings /> },
        ],
      },

      // {
      //   path: "payment-success", // ✅ correct spelling
      //   element: <PaymentSuccess />,
      // }

      // {
      //   path: "coachbookupload",
      //   element: <CoachBookUpload />,
      // },

      // {
      //   path: "coachguide",
      //   element: <CoachGuide />,
      // },

      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },

      {
        path: "payment-failure",
        element: <PaymentFailure />,
      },

      {
        path: "50p",
        element: <StripePayment />,
      },
      {
        path: "download-success",
        element: <DownloadSuccess/>,
      },

      {
        path: "payment-successs",
        element: <PaymentSuccesss />,
      },

  //     {
  //   path: "room/:roomName",
  //   element: <StreamRoom />,
  // },

//   {
//   path: "stream-room/:roomId",
//   element: <StreamRoom />,
// },

    ],
  },
]);

const App = () => {
  return (
  <RouterProvider router={router}></RouterProvider>


  );
};

export default App;
