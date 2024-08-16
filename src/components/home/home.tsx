import { useEffect, useState } from "react";
import { useExcelStore } from "../global/excel.store";
import ExcelReader from "../utility/excelReader.utility";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  TextField,
  Autocomplete,
  sliderClasses,
  TableFooter,
  TablePagination,
} from "@mui/material";
import FilterController from "../utility/controller/filter.controller";
import ExcelTable from "./table";

function Home() {
  const { data, keys, filter_key, filter, selectedCols, setSelectedCols } =
    useExcelStore((state: any) => state);

  const handleChange = (event: any, newValue: any) => {
    console.log(newValue);
    setSelectedCols(newValue);
    console.log(selectedCols);
  };

  return (
    <div className="flex flex-row h-screen p-4 gap-4">
      <ExcelReader />

      <div className="border border-zinc-600 rounded-sm w-full p-2">
        <div className="flex flex-row w-full justify-between items-end">
          <FormControl sx={{ width: 500 }}>
            <Autocomplete
              multiple
              options={keys}
              size="small"
              getOptionLabel={(option) => option}
              defaultValue={keys[0]}
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

          <FilterController />
        </div>
        <ExcelTable table_key="CAJAS JUNIO (Autoguardado) (1).xlsx" />
      </div>
    </div>
  );
}
export default Home;
