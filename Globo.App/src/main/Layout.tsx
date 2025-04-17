import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Container } from "@mui/material";

const Layout = () => {
    return (
        <>
            <Header subtitle="Providing houses all over the world" />
            <Container 
                maxWidth="md"
                sx={{ 
                    mt: 16, 
                    mb: 4,
                    mx: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", 
                }}
            >
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;