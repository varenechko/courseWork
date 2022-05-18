import TableCell from "@mui/material/TableCell";
import {
  Box,
  Table,
  TableBody,
  Paper,
  TableContainer,
  TablePagination,
  TableRow,
  IconButton,
  Collapse,
  TableHead,
  Typography,
  TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { EnhancedTableToolbar } from "./parts/EnhancedTableToolbar";
import { Author, Row } from "../../shared/interfases";
import { Order } from "../../shared/types";
import { EnhancedTableHead } from "./parts/EnhancedTableHead";
import { createData } from "../../shared/utils";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IconButtonStyled } from "./style";
import { sendDeleteRequest, sendGetRequest } from "../../axios/hooks";

const Rows = [
  createData(1, "борис", "борис", "67", 2020),
  createData(2, "адена", "3.7", "67", 20),
  createData(3, "ирина", "3.7", "67", 20),
  createData(4, "иа", "3.7", "67", 20),
  createData(5, "ия", "3.7", "67", 20),
  createData(6, "оа", "3.7", "67", 20),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | Author },
  b: { [key in Key]: number | string | Author }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function EnhancedTable() {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Row>("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<number[]>([]);
  const [opened, setOpened] = useState<number[]>([]);
  const [searchRows, setSearchRows] = useState<Row[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const rows = useRef<Row[]>([]);

  useEffect(() => {
    const getRows = async () => {
      const response = await sendGetRequest("publications");
      if (response) {
        rows.current = response;
        setSearchRows(response);
      }
    };
    getRows();
  }, []);

  const onSearchClick = () => {
    setSearchRows(
      rows.current.filter((elem) => elem.author.fio.includes(searchValue))
    );
  };

  const handleSearchValueChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(event.target.value);
    if (!event.target.value) setSearchRows(rows.current);
  };

  const handleDeleteRow = () => {
    setSearchRows((prev) =>
      prev.filter((elem) => {
        if (selected.includes(elem.id)) {
          sendDeleteRequest(elem.id);
          return false;
        }
        return true;
      })
    );
    setSelected([]);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Row
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleOpenClick = (event: React.MouseEvent<unknown>, id: number) => {
    const openedIndex = opened.indexOf(id);
    let newOpened: number[] = [];

    if (openedIndex === -1) {
      newOpened = newOpened.concat(opened, id);
    } else if (openedIndex === 0) {
      newOpened = newOpened.concat(opened.slice(1));
    } else if (openedIndex === opened.length - 1) {
      newOpened = newOpened.concat(opened.slice(0, -1));
    } else if (openedIndex > 0) {
      newOpened = newOpened.concat(
        opened.slice(0, openedIndex),
        opened.slice(openedIndex + 1)
      );
    }

    setOpened(newOpened);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const isOpened = (id: number) => opened.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - searchRows.length) : 0;

  return (
    <Box sx={{ width: "100%", boxSizing: "border-box" }}>
      <Paper sx={{ width: "100%", p: 2, boxSizing: "border-box" }}>
        <EnhancedTableToolbar
          selected={selected}
          handleDeleteRow={handleDeleteRow}
          searchValue={searchValue}
          handleSearchValueChange={handleSearchValueChange}
          onSearchClick={onSearchClick}
        />
        <TableContainer sx={{ overflow: "hidden" }}>
          <Table
            sx={{ minWidth: 740 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={searchRows.length}
            />
            <TableBody>
              {searchRows
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const isItemOpened = isOpened(row.id);

                  return (
                    <>
                      <IconButtonStyled
                        aria-label="expand row"
                        size="small"
                        onClick={(event) => handleOpenClick(event, row.id)}
                      >
                        {isItemOpened ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButtonStyled>
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        onDoubleClick={(event) => console.log("double click")}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.author.fio}</TableCell>
                        <TableCell align="center">{row.journalName}</TableCell>
                        <TableCell align="center">
                          {row.publicationYear}
                        </TableCell>
                        <TableCell align="center">
                          {row.publicationPlace}
                        </TableCell>
                        <TableCell align="center">
                          {row.publicationMount}
                        </TableCell>
                        <TableCell align="center">
                          {row.publicationNumber}
                        </TableCell>
                        <TableCell align="center">{row.pageInterval}</TableCell>
                        <TableCell align="center">
                          {row.publicationKind}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={6}
                        >
                          <Collapse
                            in={isItemOpened}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box
                              sx={{
                                margin: 1,
                                paddingLeft: "16px",
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Box
                                sx={{
                                  margin: 1,
                                  display: "flex",
                                  alignItems: "flex-start",
                                  justifyContent: "bottom",
                                  flexDirection: "row",
                                  width: "30vw",
                                }}
                              >
                                <Typography gutterBottom mr={2}>
                                  {`место публикации:`}
                                </Typography>
                                <TextField
                                  variant="standard"
                                  type="email"
                                  id="outlined-start-adornment"
                                  value={row.publicationPlace}
                                />
                              </Box>
                              <Box
                                sx={{
                                  margin: 1,
                                  display: "flex",
                                  alignItems: "flex-start",
                                  justifyContent: "bottom",
                                  flexDirection: "row",
                                  width: "30vw",
                                }}
                              >
                                <Typography gutterBottom mr={2}>
                                  {`место публикации:`}
                                </Typography>
                                <TextField
                                  variant="standard"
                                  type="email"
                                  id="outlined-start-adornment"
                                  value={row.publicationPlace}
                                />
                              </Box>
                              <Typography gutterBottom>
                                {`место публикации: ${row.publicationPlace}`}
                              </Typography>
                              <Typography gutterBottom>
                                {`количество публикаций: ${row.publicationMount}`}
                              </Typography>
                              <Typography gutterBottom>
                                {`номер публикации: ${row.publicationNumber}`}
                              </Typography>
                              <Typography gutterBottom>
                                {`страничный интервал: ${row.pageInterval}`}
                              </Typography>
                              <Typography gutterBottom>
                                {`вид публикации: ${row.publicationKind}`}
                              </Typography>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={searchRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
