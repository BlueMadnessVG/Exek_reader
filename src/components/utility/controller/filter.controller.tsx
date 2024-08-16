import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useExcelStore } from "../../global/excel.store";

function FilterController() {
  const { keys, filter_key, filter, setFilterKey, setFilter } = useExcelStore(
    (state: any) => state
  );

  const handleFilterKeyChange = (event: any) => {
    setFilterKey(event.target.value);
  };

  const handleFilterChange = (event: any) => {
    setFilter(event.target.value);
  };

  return (
    <div className="flex flex-row items-top ">
      <FormControl sx={{ minWidth: 80 }} size="small">
        <InputLabel className="text-white"> Filtro </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          label="Age"
          sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          value={filter_key}
          onChange={handleFilterKeyChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {keys.length > 0 &&
            keys.map((item: string, index: number) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        hiddenLabel
        variant="filled"
        size="small"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
}
export default FilterController;
