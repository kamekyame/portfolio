import Title from "../components/title";
import { Typography, Box } from "@mui/material";

export default function Page() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Title name="404 Not Found" />
      <Typography variant="h1">よんまるよん</Typography>
      <Box mb={3}>404 Not Found</Box>
    </Box>
  );
}
