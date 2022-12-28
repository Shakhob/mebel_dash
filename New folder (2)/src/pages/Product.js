import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { Button, Typography } from "@mui/material";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const headCells = [
    {
      id: "name",
      disablePadding: true,
      label: "Name",
    },
    {
      id: "material",
      disablePadding: false,
      label: "Material",
    },
    {
      id: "mechanism",
      disablePadding: false,
      label: "Mechanism",
    },
    {
      id: "price",
      disablePadding: false,
      label: "Price",
    },
    {
      id: "production",
      disablePadding: false,
      label: "Production",
    },
    {
      id: "sub_category",
      disablePadding: false,
      label: "Sub category",
    },
    {
      id: "delete",
      disablePadding: false,
      label: "Delete",
    },
  ];

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell, i) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            align={i === headCells.length - 1 ? "right" : "left"}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function Product() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [state, setState] = useState([]);
  const [del, setDel] = useState(true);

  useEffect(() => {
    (async () => {
      const result = await axios.get(
        "https://mebeluz.tmweb.ru/dashboard/products.php",
        {
          headers: { token: localStorage.getItem("accessToken"), lang: "uz" },
        },
      );
      setState(result.data.data.info);
    })();
  }, [del]);

  const handleDelete = (product_id) => {
    axios({
      method: "delete",
      url: "https://mebeluz.tmweb.ru/dashboard/action.php",
      params: {
        action: "delete",
        product_id,
      },
      headers: {
        "content-type": "multipart/form-data",
        token: localStorage.getItem("accessToken"),
        lang: "uz",
      },
    }).then(() => setDel(!del));
  };

  let rows = state;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Link to="add" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            mb: 3,
            boxShadow: "none",
            background: "#e25b9b",
            "&:hover": {
              background: "#e25b9b",
            },
          }}
        >
          Product Add
        </Button>
      </Link>
      {state && state.length > 0 ? (
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                state={state}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />

              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        tabIndex={-1}
                        key={index}
                      >
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell component="th" id={labelId} padding="none">
                          <Link
                            to={`${row.id}`}
                            style={{
                              display: "table-cell",
                              verticalAlign: "inherit",
                              backgroundColor: "transparent",
                              textDecoration: "none",
                            }}
                          >
                            {row.name}
                          </Link>
                        </TableCell>
                        <TableCell align="left">
                          {row.material || "-"}
                        </TableCell>
                        <TableCell align="left">
                          {row.mechanism || "-"}
                        </TableCell>
                        <TableCell align="left">{row.price || "-"}</TableCell>
                        <TableCell align="left">
                          {row.prodaction || "-"}
                        </TableCell>
                        <TableCell align="left">
                          {row.sub_category || "-"}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(row.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Typography variant="h5">Ko'rsatish uchun ma'lumot yo'q</Typography>
      )}
    </Box>
  );
}
