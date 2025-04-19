import { useParams } from "react-router-dom";
import { useFetchHouse, useUpdateHouse } from "../hooks/HouseHooks";
import ApiStatus from "../apiStatus";
import HouseForm from "./HouseForm";
import ValidationSummary from "../ValidationSummary";
import { Box } from "@mui/material";

const HouseEdit = () => {
    const { id } = useParams();
    if (!id) throw Error("Need a house id");
    const houseId = parseInt(id);

    const { data, status, isSuccess } = useFetchHouse(houseId);
    const updateHouseMutation = useUpdateHouse();

    if (!isSuccess) return <ApiStatus status={status}/>

    return (
        <Box sx={{ mt: 4 }}>
            {updateHouseMutation.isError && (
                <ValidationSummary error={updateHouseMutation.error} />
            )}
            <HouseForm
                house={data}
                submitted={h => updateHouseMutation.mutate(h)}
            />
        </Box>
    );
};

export default HouseEdit;