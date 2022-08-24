import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { iSearch } from "./search.interface";
import { useNavigate } from "react-router-dom";
export default function Search({ label, options, inputAdornment }: iSearch) {
  const navigate = useNavigate();

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: ({ name, category }: any) => `${name} ${category}`,
  });
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Autocomplete
        freeSolo
        id="outlined-search"
        disableClearable
        options={options}
        getOptionLabel={(option) => option.name}
        filterOptions={filterOptions}
        size="small"
        onChange={(event, value) =>
          navigate("/" + value.category, { state: { value } })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              type: "search",
              endAdornment: inputAdornment,
            }}
          />
        )}
      />
    </Stack>
  );
}

//there is async function for this too
