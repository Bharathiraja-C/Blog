import React from "react";
import { Table } from "react-bootstrap";
import Skeleton from "@mui/material/Skeleton";

const TableSkeleton = ({ numColumns, numRows }) => (
  <Table striped bordered hover responsive>
    <thead>
      <tr>
        {Array.from({ length: numColumns }).map((_, index) => (
          <th key={index} className="table-header">
            <Skeleton variant="text" />
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: numColumns }).map((_, colIndex) => (
            <td key={colIndex}>
              <Skeleton variant="text" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);

export default TableSkeleton;
