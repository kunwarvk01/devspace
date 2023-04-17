// Import necessary modules from React and React Router DOM
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";

// Import necessary components for styling
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

// Import the scenes/components for rendering
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";

// Define the App component
function App() {
  // Select the current theme mode and token from the Redux store
  const mode = useSelector((state) => state.mode);
  const isAuth = Boolean(useSelector((state) => state.token));
  
  // Create a memoized theme object based on the selected mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  
  // Render the app with the appropriate routes and components
  return (
    <div className="app">
      <BrowserRouter>
        {/* Provide the theme to the entire app */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            
            {/* Route for the login page */}
            <Route path="/" element={<LoginPage />} />
            
            {/* Route for the home page */}
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />

            {/* Route for the user profile page */}
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;

