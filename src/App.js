import React, { useState, createContext } from "react"
import { Route, Routes } from "react-router-dom";
import './App.css';
import Navigation from "./components/Navigation";
import CustomerCreatePage from "./pages/CustomerCreatePage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import UserCreatePage from "./pages/UserCreatePage";

const UserContext = createContext({})

function App() {
  const [user, setUser] = useState(null)
  const [customerList, setCustomerList] = useState([])

  return (
    <UserContext.Provider value={{ user, setUser, customerList, setCustomerList }}>
      <Navigation />
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/customer/create" element={<CustomerCreatePage />} />
          <Route path="/customer/:id" element={<CustomerDetailPage />} />
          <Route path="/user/create" element={<UserCreatePage />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export { UserContext }
export default App;
