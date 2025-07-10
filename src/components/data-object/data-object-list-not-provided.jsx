import Divider from "@mui/material/Divider";

import { useDataObjectContext } from "../nav-section/data/context/index.js";

export function DataObjectListNotProvided() {
  const { state } = useDataObjectContext();
  return (
    <>
      <h2>{state.name} List Endpoint Not Provided</h2>
      <Divider />
    </>
  );
}
