import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import Protected from "./routes/Protected";
import Public from "./routes/Public";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route element={<Public />}>
          <Route path="/" element={<Login />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<Protected />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;