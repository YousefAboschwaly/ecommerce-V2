import { createBrowserRouter , RouterProvider } from "react-router-dom";
import Home from "./MyComponents/Home";
import NotFound from "./MyComponents/NotFound";
import Layout from "./MyComponents/Layout";
import Products from "./MyComponents/Products";
import Login from "./MyComponents/Login";
import SignUp from "./MyComponents/SignUp";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./MyComponents/ProtectedRoute";
import ForgetPassword from "./MyComponents/ForgetPassword";
import ProductDetails from "./MyComponents/ProductDetails";

function App() {
  const routes = createBrowserRouter([
    { path: "", element: <Layout /> , children:[
      { index:true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "productdetails/:id", element: <ProtectedRoute><ProductDetails /> </ProtectedRoute>},
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "login", element:<Login />  },
      { path: "signup", element: <SignUp /> },
      { path: "forgot-password", element: <ForgetPassword /> },
      // { path: "alert", element:       <Alert
      //   message={'you Reset password successfully !'}
      //   isVisible={true}
      //   type={'success'}
      // />},
      {path:'*' , element:<NotFound/>}
    ]},
 
  ]);

  return (
    <>
    <UserContextProvider>

     <RouterProvider router={routes}/> 

    </UserContextProvider>
    </>
  );
}

export default App;
