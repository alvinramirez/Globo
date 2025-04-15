import { useState } from "react"
import ApiStatus from "../apiStatus"
import { useAddBid, useFetchBids } from "../hooks/BidHooks"
import { House } from "../types/house"
import { Bid } from "../types/bids"
import { currencyFormatter } from "../config"

import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";

type Args = {
    house: House
}

const Bids = ({ house }: Args) => {
    const { data, status, isSuccess } = useFetchBids(house.id);
    const addBidMutation = useAddBid();

    const emptyBid = {
        id: 0,
        houseId: house.id,
        bidder: "",
        amount: 0,
    };
    const [bid, setBid] = useState<Bid>(emptyBid);
    const [error, setError] = useState<string | null>(null);

    if (!isSuccess) return <ApiStatus status={status}/>;

    const highestBid = data?.length ? Math.max(...data.map((b) => b.amount)) : 0;

    const onBidSubmitClick = () => {
        if (bid.amount <= highestBid) {
            setError(`The bid must be higher than ${currencyFormatter.format(highestBid)}`);
            return;
        }
        setError(null);
        addBidMutation.mutate(bid);
        setBid(emptyBid);
    }

    return (
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Bids
        </Typography>

      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Bidder</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>{b.bidder}</TableCell>
                  <TableCell>
                    {currencyFormatter.format(b.amount)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Bidder"
          value={bid.bidder}
          fullWidth
          onChange={(e) => setBid({ ...bid, bidder: e.target.value })}
        />
        <TextField
          label="Amount"
          type="number"
          value={bid.amount}
          fullWidth
          onChange={(e) =>
            setBid({ ...bid, amount: parseInt(e.target.value) })
          }
        />
        <Button
          variant="contained"
          onClick={onBidSubmitClick}
          sx={{ minWidth: 100 }}
        >
          Add
        </Button>
      </Stack>

      {error && (
        <Box mt={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
    </Box>
      );
};

export default Bids;