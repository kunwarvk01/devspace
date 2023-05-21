import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          DevSpace
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "80%"}
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
        height="600px" // set a fixed height for the parent box
        display="flex" // use flexbox to align the child boxes
        justifyContent="center"
        alignItems="center"
      >
        <Box width="50%" p="2rem">
          <Typography fontWeight="600" variant="h5" sx={{ mb: "1.75rem" }}>
            Welcome to DevSpace, the Social Media for Developers!
            <br />
            email: levi@gmail.com password: levi
          </Typography>
          <Form />
        </Box>
        <Box width="50%" height="100%" style={{ borderTopRightRadius: "20px" }}>
          <img
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "0  1.5rem 1.5rem 0",
            }}
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt=""
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
