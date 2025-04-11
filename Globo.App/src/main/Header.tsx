import { useNavigate } from 'react-router-dom';
import logo from './GloboLogo.png';
import { Box, Typography, Grid } from "@mui/material";

type Args = {
    subtitle: string;
}

const Header = ({ subtitle }: Args) => {
    const nav = useNavigate();

    return (
        <Box component="header" sx={{ mb: 4 }}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={5}>
                <Box
                    component="img"
                    src={logo}
                    alt="logo"
                    onClick={() => nav("/")}
                    sx={{
                    maxWidth: "150px",
                    cursor: "pointer",
                    display: "block",
                    mx: { xs: "auto", sm: "0" },
                    }}
                />
                </Grid>
                <Grid item xs={12} sm={7}>
                <Typography
                    variant="subtitle1"
                    color="secondary"
                    sx={{
                    mt: { xs: 2, sm: 5 },
                    textAlign: { xs: "center", sm: "left" },
                    display: { xs: "none", sm: "block" },
                    }}
                >
                    {subtitle}
                </Typography>
                </Grid>
            </Grid>
    </Box>
    );
};

export default Header