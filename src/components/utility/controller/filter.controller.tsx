import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useExcelStore } from "../../global/excel.store";
import { useEffect, useState } from "react";

function FilterController() {
  const {
    data,
    keys,
    filter_key,
    filter,
    setFilterKey,
    mainExcel,
    setFilter,
    selectedCols,
    setSelectedCols,
  } = useExcelStore((state: any) => state);

  const [RFCs, setRFCs] = useState<any>([]);

  const handleFilterKeyChange = (event: any) => {
    setFilterKey(event.target.value);
  };

  const handleFilterChange = (event: any) => {
    setFilter(event.target.value);
  };

  const handleChange = (event: any, newValue: any) => {
    setSelectedCols(newValue);
  };

  useEffect(() => {
    if (mainExcel !== "") {
      const uniqueRFCs = Array.from(
        new Set(data[mainExcel].map((item: any) => item["RFC emisor"]))
      );
      setRFCs(uniqueRFCs);
    }
  }, [mainExcel]);

  return (
    <div className="flex flex-row w-full justify-between items-end">
      <FormControl sx={{ width: 500 }}>
        <Autocomplete
          multiple
          options={keys}
          size="small"
          getOptionLabel={(option) => option}
          value={selectedCols}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              placeholder="Columnas de tablas"
            />
          )}
        />
      </FormControl>

      <div className="flex flex-row items-top ">
        <FormControl sx={{ minWidth: 80 }} size="small">
          <InputLabel className="text-white"> RFC </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Age"
            sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            value={filter}
            onChange={handleFilterChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {mainExcel !== "" &&
              RFCs.map((item: any, index: number) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {/* <FormControl sx={{ minWidth: 80 }} size="small">
          <InputLabel className="text-white"> Filtro </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Age"
            sx={{ borderRadius: 0 }}
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
        /> */}
      </div>
    </div>
  );
}
export default FilterController;
