import React from "react";
import { makeStyles } from "@mui/styles";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MailIcon from "@mui/icons-material/Mail";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import { Avatar, Button, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  GroupOutlined,
  ManageSearchOutlined,
  ProductionQuantityLimits,
  RoomServiceOutlined,
  SellOutlined,
  ShoppingCartCheckoutOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/userSlice";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: "relative",
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const Sidebar = () => {
  const user = useSelector(selectUser);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />

        <Typography
          className="py-6 justify-center text-center !font-bold"
          variant="h5"
        >
          We Go Chat
        </Typography>
        <Typography
          className="pt-6 pb-2  px-3 !font-medium !text-[#707070] "
          variant="subtitle1"
        >
          MAIN MENU
        </Typography>
        <List>
          <Link to={"/"}>
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>

          <Link to={"/services"}>
            <ListItem button>
              <ListItemIcon>
                <RoomServiceOutlined />
              </ListItemIcon>
              <ListItemText primary="Services" />
            </ListItem>
          </Link>
          <Link to={"/users"}>
            <ListItem button>
              <ListItemIcon>
                <GroupOutlined />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </Link>

          <Link to={"/history"}>
            <ListItem button>
              <ListItemIcon>
                <ManageSearchOutlined />
              </ListItemIcon>
              <ListItemText primary="Search History" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <Typography
          className="pt-6 pb-2  px-3 !font-medium !text-[#707070] "
          variant="subtitle1"
        >
          OTHERS
        </Typography>
        <List>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </ListItem>
        </List>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="!absolute bottom-4 !justify-around !flex items-center !w-full "
        >
          <Avatar />
          <div className="!items-start flex flex-col">
            <Typography variant="h6" color="black">
              {user?.user?.fullName}
            </Typography>
            <Typography variant="subtitle1" color="black">
              ADMIN
            </Typography>
          </div>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Drawer>
    </div>
  );
};

export default Sidebar;
