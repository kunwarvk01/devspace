// Importing necessary dependencies from MUI and React
import { useState } from "react";
import {
Box,
IconButton,
InputBase,
Typography,
Select,
MenuItem,
FormControl,
useTheme,
useMediaQuery,
} from "@mui/material";
import {
Search,
Message,
DarkMode,
LightMode,
Notifications,
Help,
Menu,
Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

// Defining the Navbar component
const Navbar = () => {
  // Defining state using the useState hook
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  // Initializing various hooks for state management, navigation, and responsive design
  const dispatch = useDispatch(); // Hook to dispatch actions in Redux store
  const navigate = useNavigate(); // Hook to navigate between routes
  const user = useSelector((state) => state.user); // Hook to select data from Redux store
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // Hook to detect screen size

  // Initializing theme-related values using the useTheme hook
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  // Creating a full name string from user data
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)" //min max and preferred value
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          DevSpace
        </Typography>
        {/* Displaying search bar and search icon only on non-mobile screens */}
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="# Explore" /> 
            <IconButton>
              <Search/>
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? ( // If the screen is not a mobile screen
        <FlexBetween gap="2rem"> 
          {/* Dark/Light mode button */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              // Dark mode icon
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : ( 
              // Light mode icon
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          {/* Message icon */}
          <Message sx={{ fontSize: "25px" }} />
          {/* Notifications icon */}
          <Notifications sx={{ fontSize: "25px" }} />
          {/* Help icon */}
          <Help sx={{ fontSize: "25px" }} />
          {/* User menu */}
          <FormControl variant="standard" value={fullName}>
            {/* Select dropdown */}
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              {/* User name */}
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              {/* Log out option */}
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : ( // If the screen is a mobile screen
        // {/* Mobile menu toggle button */}
        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
          <Menu />
        </IconButton>
      )}


      {/* MOBILE NAV */}
      {/* // Display the mobile navigation menu only if the screen width is less than 768 pixels and the mobile menu is toggled */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        // Fixed position box to display the mobile menu items
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="400px"
          minWidth="200px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          {/* // Icon button to close the mobile menu */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          {/* // Flex container to display mobile menu items vertically with spacing between them */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            {/* // Icon button to toggle between light and dark mode */}
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            {/* // Icon button for messages */}
            <Message sx={{ fontSize: "25px" }} />
            {/* // Icon button for notifications */}
            <Notifications sx={{ fontSize: "25px" }} />
            {/* // Icon button for help or support */}
            <Help sx={{ fontSize: "25px" }} />
            {/* // Select dropdown to display user's full name and option to logout */}
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
