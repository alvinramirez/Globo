import React, { useState } from "react";
import { House } from "../types/house"
import toBase64 from "../toBase64";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack
} from "@mui/material";

type Args = {
    house: House;
    submitted: (house: House) => void;
}

const HouseForm = ({ house, submitted }: Args) => {
    const [houseState, setHouseState] = useState({ ...house });

    const onSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            submitted(houseState);
        }

    const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>)
        :Promise<void> => {
          e.preventDefault();
          if (e.target.files && e.target.files[0])
          {
            setHouseState({
              ...houseState,
              photo: await toBase64(e.target.files[0]),
            });
          }
        };

    return (
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={houseState.address}
            onChange={(e) =>
              setHouseState({ ...houseState, address: e.target.value })
            }
          />
          <TextField
            label="Country"
            variant="outlined"
            fullWidth
            value={houseState.country}
            onChange={(e) =>
              setHouseState({ ...houseState, country: e.target.value })
            }
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            minRows={3}
            value={houseState.description}
            onChange={(e) =>
              setHouseState({ ...houseState, description: e.target.value })
            }
          />
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            fullWidth
            value={houseState.price}
            onChange={(e) =>
              setHouseState({
                ...houseState,
                price: parseInt(e.target.value),
              })
            }
          />

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Image
            </Typography>
            <input type="file" onChange={onFileSelected} />
          </Box>

          {houseState.photo && (
            <Box>
              <img
                src={houseState.photo}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Box>
          )}

          <Button
            variant="contained"
            type="submit"
            disabled={!houseState.address || !houseState.country}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Paper>
    );
};

export default HouseForm;