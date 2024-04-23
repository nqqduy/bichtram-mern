// App.js
import React from "react";
import "../../client/src/assets/css/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainDash from "./components/MainDash/MainDash";
import RightSide from "./components/RigtSide/RightSide";
import Sidebar from "./components/sidebar";
import Product from "./components/Product/Adproduct";
import { Loading } from "./components";
const Login = React.lazy(() => import("./pages/Login/Login"));

function App() {
  return (
    <Router>
      <div className="App">
        <div className="AppGlass">
          {/* <Sidebar /> */}
          <Routes>
            <Route path="/dashboard" element={<MainDash />} />
            <Route path="/products" element={<Product />} />
            <Route
              path="/login"
              element={
                <React.Suspense fallback={<Loading />}>
                  {" "}
                  <Login />{" "}
                </React.Suspense>
              }
            />
          </Routes>
          {/* <RightSide /> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
