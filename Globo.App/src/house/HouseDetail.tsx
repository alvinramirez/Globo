import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDeleteHouse, useFetchHouse } from "../hooks/HouseHooks";
import ApiStatus from "../apiStatus";
import { currencyFormatter } from "../config";
import defaultImage from "./defaultPhoto";
import Bids from "../bids/Bids";

import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Container,
  Skeleton,
} from "@mui/material";

const HouseDetail = () => {
    const { id } = useParams();
    if (!id) throw Error("House id not found")
    const houseId = parseInt(id);

    const { data, status, isSuccess} = useFetchHouse(houseId);
    const deleteHouseMutation = useDeleteHouse();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setShowContent(true), 1000);
      return () => clearTimeout(timer);
    }, []);

    
    if (status === "pending" || !showContent) 
    {
      return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Box textAlign="center" mb={3}>
            <Skeleton variant="rectangular" height={40} width="100%" sx={{ mx: "auto", minWidth: "600px" }} />
            <Skeleton variant="text" height={40} width="100%" sx={{ mx: "auto", minWidth: "600px" }} />
            <Skeleton variant="text" height={40} width="100%" sx={{ mx: "auto", minWidth: "600px" }} />
            <Skeleton variant="text" height={40} width="100%" sx={{ mx: "auto", minWidth: "600px" }} />
            <Skeleton variant="rectangular" height={40} width="100%" sx={{ mx: "auto", minWidth: "600px" }} />
          </Box>
        </Container>
      )
      
    }
    
    if (!isSuccess) return <ApiStatus status={status}/>
    if (!data) return <div>House not found</div>
    
    console.log("Casa cargada:", data);

    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="250"
                image={data.photo || defaultImage}
                alt="House pic"
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Stack direction="row" spacing={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    component={Link}
                    to={`/house/edit/${data.id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      if (window.confirm("Are you sure?"))
                        deleteHouseMutation.mutate(data);
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6" color="text.secondary">
                {data.country}
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {data.address}
              </Typography>
              <Typography variant="h5" color="primary" sx={{ my: 2 }}>
                {currencyFormatter.format(data.price)}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {data.description}
              </Typography>

              <Bids house={data} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
};

export default HouseDetail;