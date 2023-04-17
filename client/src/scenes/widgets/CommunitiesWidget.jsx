import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const CommunitiesWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween mb={"0.5rem"}>
        <Typography color={dark} variant="h5" fontWeight="500">
          Communities
        </Typography>
        <Typography color={medium}>-,' New ,'-</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="150px"
        alt="advert"
        src="https://images.unsplash.com/photo-1631624215749-b10b3dd7bca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        style={{
          borderRadius: "0.75rem",
          margin: "0.75rem 0 0.5rem",
          objectFit: "cover",
        }}
      />
      <FlexBetween>
        <Typography color={main}>K8 Cluster [Devops]</Typography>
        <Typography
          color={medium}
          sx={{
            "&:hover": {
              color: palette.primary.dark,
              cursor: "pointer",
            },
          }}
        >
          Join
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0 0.7rem">
        K8 Cluster community is for those folks who are trying to learn or
        explore DevOps with the help of experienced professionals. Opportunities
        are open to share.
      </Typography>

      <img
        width="100%"
        height="150px"
        alt="advert"
        src="https://cdn.pixabay.com/photo/2017/01/22/22/11/cloud-computing-2001090__340.jpg"
        style={{
          borderRadius: "0.75rem",
          margin: "0.75rem 0 0.5rem",
          objectFit: "cover",
        }}
      />
      <FlexBetween>
        <Typography color={main}>CloudNation [AWS]</Typography>
        <Typography
          color={medium}
          sx={{
            "&:hover": {
              color: palette.primary.dark,
              cursor: "pointer",
            },
          }}
        >
          Join
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0 0">
        Cloudtopia community where cloud computing enthusiasts can come together
        to share knowledge, insights, and experiences.
      </Typography>
      <Typography
        fontSize={"2rem"}
        color={medium}
        m="0 0 0.5rem"
        sx={{
          "&:hover": {
            color: palette.primary.dark,
            cursor: "pointer",
          },
        }}
      >
        . . .
      </Typography>
    </WidgetWrapper>
  );
};

export default CommunitiesWidget;
