import UserProvider from "./Context/userProvider";
import SignUp from "./Components/SignUp";
import LoginPage from "./Components/LogIn";
import Dashboard from "./Components/Dashboard";
import { Route,Routes } from "react-router-dom";
import "./index.css";
function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<SignUp></SignUp>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        </Routes>
       
      </UserProvider>
    </div>
  );
}

export default App;
