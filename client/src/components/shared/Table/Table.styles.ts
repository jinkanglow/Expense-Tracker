import styled from 'styled-components';
import { TableContainer } from '@mui/material';

export const StyledTableContainer = styled(TableContainer)`
  .MuiTableHead-root {
    .MuiTableCell-head {
      background-color: #f5f7fa;
      color: #1a237e;
      font-weight: 600;
      font-size: 0.95rem;
      padding: 16px;
      border-bottom: 2px solid #e0e0e0;
    }
  }

  .MuiTableBody-root {
    .MuiTableRow-root {
      &:hover {
        background-color: #f8f9fa;
      }

      .MuiTableCell-body {
        padding: 16px;
        font-size: 0.95rem;
        color: #333;
      }
    }
  }
`;
