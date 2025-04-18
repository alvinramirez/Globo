import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";

const Layout = () => {
    return (
        <>
            <Header subtitle="Providing houses all over the world" />
            <Box sx={{ mt: 16, mb: 4 }}>
                <Outlet />
            </Box>
        </>
    );
};

export default Layout;