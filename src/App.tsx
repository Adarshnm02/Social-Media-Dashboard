import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from 'react';
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useSelector } from "react-redux"
import { RootState } from "./app/store"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/NavBar";
import PostForm from "./components/PostForm";
const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));

const ProtectedRoute = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  // return token ? <Outlet /> : <Navigate to="/login" replace />
  if (!token) return <Navigate to="/login" replace />;
  return (
    <>
      <Navbar />  {/* Navbar is always shown on protected pages */}
      <Outlet />
    </>
  );
};


const App = () => {
  return (

    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          } />
          <Route path="/profile" element={<Profile />} />
          <Route path="/postform" element={<PostForm/>} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
