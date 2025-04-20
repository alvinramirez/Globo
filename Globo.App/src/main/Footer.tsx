import { Box, Typography, Link } from "@mui/material";

const Footer = () => (
    <Box
    component="footer"
    sx={{
      width: "100%",
      bgcolor: "primary.main",
      color: "white",
      py: 2,
      px: { xs: 2, sm: 4, md: 8 },
      mt: "auto",
      textAlign: "center",
    }}
  >
    <Typography variant="body2">
    © {new Date().getFullYear()} – Coded by Alvin Ramirez with ☕️
    </Typography>
  </Box>
);

export default Footer;