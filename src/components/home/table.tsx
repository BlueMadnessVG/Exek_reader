import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { useExcelStore } from "../global/excel.store";
import { useEffect, useState } from "react";

function ExcelTable({ table_key }: { table_key: string }) {
  const { data, keys, filter_key, filter, selectedCols, setSelectedCols } =
    useExcelStore((state: any) => state);

  const [filteredData, setFilteredData] = useState<any[]>([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
        console.log(filtered);
      }
    } else {
      if (Object.keys(data).length > 0) {
        const filtered = data[table_key];
        console.log(filteredData[0]);
        setFilteredData(filtered);
      }
    }
  }, [filter, filter_key, data]);

  return (
    <div className="flex flex-col overflow-hidden">
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
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
        rowsPerPage={5}
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
      />
    </div>
  );
}
export default ExcelTable;
