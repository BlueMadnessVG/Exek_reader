import { useExcelStore } from "../global/excel.store";
import ExcelReader from "../utility/excelReader.utility";
import { FormControl, TextField, Autocomplete } from "@mui/material";
import FilterController from "../utility/controller/filter.controller";
import ExcelTable from "./table";
import { useEffect } from "react";
import SadIcon from "../../assets/icons/sad.icon";

function Home() {
  const { data, keys, selectedCols, setSelectedCols } = useExcelStore(
    (state: any) => state
  );

  const handleChange = (event: any, newValue: any) => {
    setSelectedCols(newValue);
  };

  return (
    <div className="flex flex-row h-screen p-4 gap-4">
      <ExcelReader />

      {Object.entries(data).length > 0 ? (
        <div className="border border-zinc-600 rounded-sm w-full p-2 overflow-hidden">
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

          <div className="flex flex-row gap-2 overflow-x-auto pt-10">
            {Object.entries(data).length > 0 &&
              Object.entries(data).map((item: any, index: number) => (
                <>
                  <ExcelTable key={index} table_key={item[0]} />
                </>
              ))}
          </div>
        </div>
      ) : (
        <div className="border border-zinc-600 rounded-sm w-full p-2 flex items-center justify-center">
          <h1 className="flex flex-col justify-center items-center text-zinc-700 font-semibold">
            <SadIcon />
            Ingrese un excel para hacer la operación
          </h1>
        </div>
      )}
    </div>
  );
}
export default Home;
