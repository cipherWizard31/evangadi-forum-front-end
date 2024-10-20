import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import Landing from "./Pages/Landing/Landing";
import Answer from "./Pages/Answer/Answer";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/questions"
        element={
          <ProtectedRoute>
            <AskQuestion />
          </ProtectedRoute>
        }
      />
      <Route
        path="/answer/:id"
        element={
          <ProtectedRoute>
            <Answer />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default Routing;
