import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./app/store";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#00b96b",
          borderRadius: 2,

          // Alias Token
          colorBgContainer: "#f6ffed",
        },
        components: {
          Table: {
            headerBg: "",
            headerColor: "",
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);
