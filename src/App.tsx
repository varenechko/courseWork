import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import EnhancedTable from "./components/Table";
import { Header } from "./components/Header";
import { LoginPage } from "./pages/Login";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./shared/theme";
import { AppContext } from "./shared/Context";
import { SignUpPage } from "./pages/SignUp";
import { RequireAuth } from "./components/Auth";
import { CreatePublication } from "./pages/CreatePublication";
import { EditPublication } from "./pages/EditPublication";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === "true" ? true : false
  );

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      <ThemeProvider theme={theme}>
        <Router>
          {isLoggedIn ? <Header /> : null}
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="signUp" element={<SignUpPage />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <EnhancedTable />
                </RequireAuth>
              }
            />
            <Route
              path="createPublication"
              element={
                <RequireAuth>
                  <CreatePublication />
                </RequireAuth>
              }
            />
            <Route
              path="editPublication/:id"
              element={
                <RequireAuth>
                  <EditPublication />
                </RequireAuth>
              }
            />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
