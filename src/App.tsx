import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from 'react';
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useSelector } from "react-redux"
import { RootState } from "./app/store"
import { Toaster } from "react-hot-toast"
const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));

const ProtectedRoute = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

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
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
