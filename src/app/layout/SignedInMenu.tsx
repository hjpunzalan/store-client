import { Button, Fade, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "src/app/store/configureStore";
import { signOut } from "src/features/account/accountSlice";
import { clearBasket } from "src/features/basket/basketSlice";

export const SignedInMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color="inherit"
        sx={{ typography: "h6" }}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {user?.email}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My orders</MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(signOut());
            dispatch(clearBasket());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
