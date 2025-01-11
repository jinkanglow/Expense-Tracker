import React from 'react';
import {
  Table as MuiTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { StyledTableContainer } from './Table.styles';
import NoDataIcon from '@mui/icons-material/Assignment';

interface TableProps {
  headers: string[];
  rows: (string | number | React.ReactNode)[][];
  emptyMessage?: string;
}

const Table: React.FC<TableProps> = ({
  headers,
  rows,
  emptyMessage = 'No data available',
}) => {
  return (
    <StyledTableContainer>
      <Paper elevation={2}>
        <MuiTable>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  align={header === 'Amount' ? 'right' : 'left'}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {row.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      align={headers[cellIndex] === 'Amount' ? 'right' : 'left'}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length}
                  align="center"
                  sx={{ py: 8 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <NoDataIcon
                      sx={{
                        fontSize: 48,
                        color: 'text.secondary',
                        opacity: 0.5,
                      }}
                    />
                    <Typography variant="body1" color="text.secondary">
                      {emptyMessage}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </Paper>
    </StyledTableContainer>
  );
};

export default Table;
