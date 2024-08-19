import { useExcelStore } from "../global/excel.store";
import ExcelReader from "../utility/excelReader.utility";
import { Select, MenuItem } from "@mui/material";
import FilterController from "../utility/controller/filter.controller";
import ExcelTable from "./table";
import { useEffect, useState } from "react";
import SadIcon from "../../assets/icons/sad.icon";

import excelIcon from "../../assets/icons/excel_icon.png";

function Home() {
  const { data, mainExcel, filteredData, setMainExcel } = useExcelStore(
    (state: any) => state
  );

  const [missingUUIDs, setMissingUUID] = useState<any>([]);

  const handleMainExcelChange = (event: any) => {
    setMainExcel(event.target.value);
  };

  const showMissingUUIDinMainExcel = () => {
    if (mainExcel !== "" && data[mainExcel]) {
      // Step 1: Extract UUIDs from data[mainExcel]
      const mainExcelUUIDs = new Set(
        data[mainExcel].map((item: any) => item.UUID)
      );

      // Step 2: Extract UUIDs from all other data
      const allOtherUUIDs = new Set(
        Object.keys(data)
          .filter((key) => key !== mainExcel)
          .flatMap((key) => data[key].map((item: any) => item.UUID))
      );

      // Step 3: Find UUIDs in data[mainExcel] that are not in allOtherUUIDs
      const missingUUIDs = Array.from(mainExcelUUIDs).filter(
        (uuid) => !allOtherUUIDs.has(uuid)
      );

      // Step 4: Set the state with the missing UUIDs
      setMissingUUID(missingUUIDs);
    }
  };

  useEffect(() => {
    showMissingUUIDinMainExcel();
  }, [filteredData]);

  return (
    <div className="flex flex-row h-screen p-4 gap-4">
      <ExcelReader />

      {Object.entries(data).length > 0 ? (
        <div className="border border-zinc-600 rounded-sm w-full p-2 overflow-auto gap-8">
          <div className="flex flex-row gap-4 pb-12 pt-4 items-center">
            <picture className="flex w-16 h-16">
              <img src={excelIcon} alt="" className="w-full h-full" />
            </picture>
            <Select
              sx={{
                fontSize: 40,
              }}
              value={mainExcel}
              id="select-main-excel"
              onChange={handleMainExcelChange}
              variant="standard"
              placeholder={Object.keys(data)[1]}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Object.keys(data).length > 0 &&
                Object.keys(data).map((item: string, index: number) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </div>

          <FilterController />

          <div className="flex flex-row gap-2 overflow-x-auto pt-10">
            {Object.entries(data).length > 0 &&
              Object.entries(data)
                .filter(([key]) => key !== mainExcel)
                .map((item: any, index: number) => {
                  return (
                    <>
                      <ExcelTable key={index} table_key={item[0]} />
                    </>
                  );
                })}
          </div>

          <div>
            {/* Render the missing UUIDs */}
            {missingUUIDs.length > 0 ? (
              <p> {missingUUIDs[0]} </p>
            ) : (
              <p>No missing UUIDs</p>
            )}
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
