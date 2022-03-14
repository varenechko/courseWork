import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import EnhancedTable from "./components/Table";
import { Header } from "./components/Header";
import { LoginPage } from "./pages/Login";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./shared/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<EnhancedTable />} />
          <Route path="login" element={<LoginPage />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
