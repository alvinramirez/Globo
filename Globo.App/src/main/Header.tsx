import { useNavigate } from 'react-router-dom';
import logo from './GloboLogo.png';
import { Box, Typography, Grid } from "@mui/material";

type Args = {
    subtitle: string;
}

const Header = ({ subtitle }: Args) => {
    const nav = useNavigate();

    return (
        <Box
            component="header"
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                bgcolor: "primary.main",
                color: "white",
                py: 2,
                px: { xs: 2, sm: 4, md: 8 },
                boxShadow: 3,
                zIndex: 1300,
            }}
        >
            <Grid container alignItems="center">
                <Grid 
                    item
                    xs={12}
                    sm={6}
                    display="flex"
                    alignItems="center">
                <Box
                    component="img"
                    src={logo}
                    alt="logo"
                    onClick={() => nav("/")}
                    sx={{
                        maxHeight: 50,
                        cursor: "pointer",
                        mr: 2,
                    }}
                    />
                    <Typography variant="h6" sx={{ ml: 2 }}>
                        {subtitle}
                    </Typography>
                </Grid>
            </Grid>            
        </Box>
    );
};

export default Header;