import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useExcelStore } from "../global/excel.store";
import { useEffect, useState } from "react";

import excelIcon from "../../assets/icons/excel_icon.png";

function ExcelTable({ table_key }: { table_key: string }) {
  const { keys, data, filter_key, filter, selectedCols } = useExcelStore(
    (state: any) => state
  );

  const [filteredData, setFilteredData] = useState<any[]>([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const [operationKey, setOperationKey] = useState("");
  const [operationResult, setOperationResult] = useState<any>(0);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOperationKeyChange = (event: any) => {
    setOperationKey(event.target.value);
    handleOperationResult(event.target.value);
  };

  const handleOperationResult = (key: string) => {
    // Initialize the sum variable
    let sum = 0;

    // Iterate over filteredData to accumulate the sum
    for (const item of filteredData) {
      // Ensure the item has the key and the value is a number
      if (item[key] !== undefined && typeof item[key] === "number") {
        sum += item[key];
      }
    }
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    // Return the computed sum
    setOperationResult(formatter.format(sum));
  };

  useEffect(() => {
    if (filter_key != "") {
      if (Object.keys(data).length > 0) {
        const filtered = data[table_key].flat().filter((item: any) => {
          const value = item?.[filter_key];
          return (
            (typeof value === "string" &&
              value.toUpperCase().includes(filter.toUpperCase())) ||
            (typeof value === "number" && value.toString().includes(filter))
          );
        });
        setFilteredData(filtered);
      }
    } else {
      if (Object.keys(data).length > 0) {
        const filtered = data[table_key];
        setFilteredData(filtered);
      }
    }
  }, [filter, filter_key, data]);

  useEffect(() => {
    handleOperationResult(operationKey);
  }, [filteredData]);

  return (
    <div className="flex flex-col overflow-x-hidden min-w-[50%] max-w-[50%] min-h-[600px]">
      <h1 className="pb-1 font-semibold pl-2 border-b border-zinc-600 flex items-center gap-3">
        <picture className="flex w-6 h-6">
          <img src={excelIcon} alt="" className="w-full h-full" />
        </picture>
        {table_key}
      </h1>
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {selectedCols.length > 0 &&
                selectedCols.map((item: any, index: number) => (
                  <TableCell key={index}> {item} </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 &&
              (rowsPerPage > 0
                ? filteredData.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredData
              ).map((item: any, index: number) => (
                <TableRow key={index}>
                  {selectedCols.map((col: any, index: number) => (
                    <TableCell key={index}> {item[col]} </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
        colSpan={3}
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        slotProps={{
          select: {
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          },
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ padding: 0 }}
      />

      <div className="pt-4">
        <div className="flex flex-row items-top ">
          <FormControl sx={{ minWidth: 80 }} size="small">
            <InputLabel className="text-white"> Base a </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              label="Sumatoria"
              sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              value={operationKey}
              onChange={handleOperationKeyChange}
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
            disabled
            variant="filled"
            size="small"
            value={operationResult}
          />
        </div>
      </div>
    </div>
  );
}
export default ExcelTable;
