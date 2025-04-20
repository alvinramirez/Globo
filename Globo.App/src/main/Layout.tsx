import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";
import Footer from "./Footer";

const Layout = () => {
    return (
        <>
            <Header subtitle="Providing houses all over the world" />
            <Box sx={{ mt: 16, mb: 4 }}>
                <Outlet />
            </Box>
            <Footer />
        </>
    );
};

export default Layout;