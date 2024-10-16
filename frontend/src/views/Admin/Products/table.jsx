import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";

const DynamicTable = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      image: "",
      color: "",
      size: "M",
    },
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      image: "",
      color: "",
      size: "M",
    };
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleSizeChange = (id, newSize) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, size: newSize } : row
    );
    setRows(updatedRows);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Choose image</TableCell>
            <TableCell>Choose color</TableCell>
            <TableCell>Select size</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <input
                  type="file"
                  onChange={(e) => {
                    // Handle image selection logic
                  }}
                />
              </TableCell>
              <TableCell>
                <input
                  type="color"
                  onChange={(e) => {
                    // Handle color selection logic
                  }}
                />
              </TableCell>
              <TableCell>
                <FormControl>
                  <InputLabel>Size</InputLabel>
                  <Select
                    value={row.size}
                    onChange={(e) => handleSizeChange(row.id, e.target.value)}
                  >
                    <MenuItem value="M">M</MenuItem>
                    <MenuItem value="L">L</MenuItem>
                    <MenuItem value="XL">XL</MenuItem>
                    <MenuItem value="XXL">XXL</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleRemoveRow(row.id)}>
                  Remove
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4}>
              <Button variant="contained" onClick={handleAddRow}>
                Add Row
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
