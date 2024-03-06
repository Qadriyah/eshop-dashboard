import React, { TableHTMLAttributes } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";

type PaginationProps = TableHTMLAttributes<HTMLTableElement> & {
  currentPage: number;
  rowsPerPage: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  count: number;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  count,
}): JSX.Element => {
  return (
    <table className="mt-4">
      <tfoot>
        <tr>
          <CustomTablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={count}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            slotProps={{
              select: {
                "aria-label": "Rows per page",
              },
              actions: {
                showFirstButton: false,
                showLastButton: false,
                slots: {
                  nextPageIcon: GrFormNext,
                  backPageIcon: GrFormPrevious,
                },
              },
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </tr>
      </tfoot>
    </table>
  );
};

const blue = {
  200: "#A5D8FF",
  400: "#3399FF",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const CustomTablePagination = styled(TablePagination)(
  ({ theme }) => `
    & .${classes.spacer} {
      display: none;
    }
  
    & .${classes.toolbar}  {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  
    & .${classes.selectLabel} {
      margin: 0;
    }
  
    & .${classes.select}{
      font-family: 'IBM Plex Sans', sans-serif;
      padding: 2px 0 2px 4px;
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[800] : grey[200]
      };
      border-radius: 6px; 
      background-color: transparent;
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      transition: all 100ms ease;
  
      &:hover {
        background-color: ${
          theme.palette.mode === "dark" ? grey[800] : grey[50]
        };
        border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
      }
  
      &:focus {
        outline: 3px solid ${
          theme.palette.mode === "dark" ? blue[400] : blue[200]
        };
        border-color: ${blue[400]};
      }
    }
  
    & .${classes.displayedRows} {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
  
    & .${classes.actions} {
      display: flex;
      gap: 6px;
      border: transparent;
      text-align: center;
    }
  
    & .${classes.actions} > button {
      display: flex;
      align-items: center;
      padding: 0;
      border: transparent;
      border-radius: 50%; 
      background-color: transparent;
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[800] : grey[200]
      };
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      transition: all 100ms ease;
  
      > svg {
        font-size: 22px;
      }
  
      &:hover {
        background-color: ${
          theme.palette.mode === "dark" ? grey[800] : grey[50]
        };
        border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
      }
  
      &:focus {
        outline: 3px solid ${
          theme.palette.mode === "dark" ? blue[400] : blue[200]
        };
        border-color: ${blue[400]};
      }
  
      &:disabled {
        opacity: 0.3;
        &:hover {
          border: 1px solid ${
            theme.palette.mode === "dark" ? grey[800] : grey[200]
          };
          background-color: transparent;
        }
      }
    }
    `
);

export default Pagination;
