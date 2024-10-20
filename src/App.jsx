import axios from "./API/axiosConfig";
import Routing from "./Router";
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import "bootstrap/dist/css/bootstrap.css"
export const AuthContext = createContext();
function App() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const checkUser = async () => {
    try {
      const { data } = await axios.get("/user/checkUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/");
    }
    console.log(user)
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Routing />
    </AuthContext.Provider>
  );
}

export default App;
