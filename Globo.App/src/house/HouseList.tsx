import useFetchHouses from "../hooks/HouseHooks";
import { currencyFormatter } from "../config";
import ApiStatus from "../apiStatus";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    Box,
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Skeleton,
  } from "@mui/material";
  
  const HouseList = () => {
    const nav = useNavigate();
    const { data, status, isSuccess } = useFetchHouses();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setShowContent(true), 1000);
      return () => clearTimeout(timer);
    }, []);

    if (status === "pending" || !showContent) {
      return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Box textAlign="center" mb={3}>
            <Skeleton variant="text" height={40} width="100%" sx={{ mx: "auto", minWidth: "600px" }} />
          </Box>

          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Skeleton height={30} /></TableCell>
                  <TableCell><Skeleton height={30} /></TableCell>
                  <TableCell><Skeleton height={30} /></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(7)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton height={25} /></TableCell>
                    <TableCell><Skeleton height={25} /></TableCell>
                    <TableCell><Skeleton height={25} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="center" mt={3}>
            <Skeleton variant="rectangular" height={40} width={120} />
          </Box>
      </Container>
      );
    }
  
    if (!isSuccess) return <ApiStatus status={status} />;
  
    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box textAlign="center" mb={3}>
            <Typography variant="h5" color="primary" fontWeight="bold">
              Houses currently on the market
            </Typography>
          </Box>
    
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Address</strong></TableCell>
                  <TableCell><strong>Country</strong></TableCell>
                  <TableCell><strong>Asking Price</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((h) => (
                    <TableRow
                      key={h.id}
                      hover
                      onClick={() => nav(`/house/${h.id}`)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>{h.address}</TableCell>
                      <TableCell>{h.country}</TableCell>
                      <TableCell>{currencyFormatter.format(h.price)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
    
          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/house/add"
            >
              Add House
            </Button>
          </Box>
        </Container>
    );
  };

export default HouseList;