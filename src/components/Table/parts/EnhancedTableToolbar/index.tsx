import {
  alpha,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { EnhancedTableToolbarProps } from "./interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { SearchField } from "../../../SearchField";

export const EnhancedTableToolbar: FC<EnhancedTableToolbarProps> = ({
  selected,
  handleDeleteRow,
  searchValue,
  handleSearchValueChange,
  onSearchClick,
}) => {
  const numSelected = selected.length;
  const navigate = useNavigate();

  const handleAddRow = () => {
    navigate("/createPublication");
  };

  const handleEditRow = () => {
    navigate(`/editPublication/${selected[0]}`);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {numSelected === 1 ? "выбран" : "выбрано"}
        </Typography>
      ) : (
        <>
          <Box sx={{ flex: "1 1 100%" }}>
            <SearchField
              searchValue={searchValue}
              handleSearchValueChange={handleSearchValueChange}
              onSearchClick={onSearchClick}
            />
          </Box>
        </>
      )}
      {numSelected > 0 ? (
        <>
          {numSelected === 1 ? (
            <Tooltip title="редактировать">
              <IconButton onClick={handleEditRow}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          ) : null}
          <Tooltip title="удалить">
            <IconButton onClick={handleDeleteRow}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="создать">
          <IconButton onClick={handleAddRow}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
