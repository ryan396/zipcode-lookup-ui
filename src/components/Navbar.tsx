import { Typography, AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  return (
    <AppBar>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Zip Code Lookup
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
