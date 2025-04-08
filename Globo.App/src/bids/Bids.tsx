import { useState } from "react"
import ApiStatus from "../apiStatus"
import { useAddBid, useFetchBids } from "../hooks/BidHooks"
import { House } from "../types/house"
import { Bid } from "../types/bids"
import { currencyFormatter } from "../config"

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
        <>
          <div className="row mt-4">
            <div className="col-12">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Bidder</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((b) => (
                      <tr key={b.id}>
                        <td>{b.bidder}</td>
                        <td>{currencyFormatter.format(b.amount)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <input
                id="bidder"
                className="h-100"
                type="text"
                value={bid.bidder}
                onChange={(e) => setBid({ ...bid, bidder: e.target.value })}
                placeholder="Bidder"
              ></input>
            </div>
            <div className="col-4">
              <input
                id="amount"
                className="h-100"
                type="number"
                value={bid.amount}
                onChange={(e) =>
                  setBid({ ...bid, amount: parseInt(e.target.value) })
                }
                placeholder="Amount"
              ></input>
            </div>
            <div className="col-2">
              <button
                className="btn btn-primary"
                onClick={() => onBidSubmitClick()}
              >
                Add
              </button>
            </div>
          </div>
          {error && (
            <div className="row mt-2">
                <div className="col-12 text-danger">{error}</div>
            </div>
          )}
        </>
      );
};

export default Bids;