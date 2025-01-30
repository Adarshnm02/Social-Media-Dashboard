import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { useSelector } from "react-redux"
import { RootState } from "./app/store"

const ProtectedRoute = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

const App = () => {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>} />
        <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
