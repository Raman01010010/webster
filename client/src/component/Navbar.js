import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container1 from "./Container1";

import MenuIcon from "@mui/icons-material/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserFriends,
  faEnvelope,
  faMoneyCheckAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery, Menu, MenuItem } from "@mui/material";

const Navbar = () => {
  const isLargeScreen = useMediaQuery("(min-width:600px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isJobMenuOpen, setIsJobMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  function handleNavAndClose() {
    handleMenuClose();
  }

  const handleJobMenuToggle = () => {
    setIsJobMenuOpen(!isJobMenuOpen);
  };

  useEffect(() => {
    return () => {
      setIsJobMenuOpen(false);
    };
  }, []);

  useEffect(() => {
    setIsJobMenuOpen(location.pathname === "/showjob");
  }, [location.pathname]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Navbar
          </Typography>
          {isLargeScreen ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/post"
              >
                <FontAwesomeIcon icon={faHome} style={{ marginRight: "5px" }} />
                Home
              </Button>
              <Button color="inherit" onClick={handleMenuOpen}>
                <FontAwesomeIcon
                  icon={faUserFriends}
                  style={{ marginRight: "5px" }}
                />
                Connection
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={handleNavAndClose}
                  component={Link}
                  to="/connections"
                >
                  Connection
                </MenuItem>
                <MenuItem
                  onClick={handleNavAndClose}
                  component={Link}
                  to="/otherusers"
                >
                  Add friend
                </MenuItem>
              </Menu>
              <Button
                color="inherit"
                component={Link}
                to="/chat"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ marginRight: "5px" }}
                />
                Messages
              </Button>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  color="inherit"
                  onClick={handleJobMenuToggle}
                  component={Link}
                  to="/showjob"
                >
                  <FontAwesomeIcon
                    icon={faMoneyCheckAlt}
                    style={{ marginRight: "5px" }}
                  />
                  Job
                </Button>
      
                {location.pathname === "/showjob" && (
                  <>
                    {isJobMenuOpen && (
                      <>
                        <i
                          className="fas fa-chevron-down fa-xs"
                          style={{ marginLeft: "5px" }}
                          onClick={handleDropdownToggle}
                        ></i>
                        {isDropdownOpen && (
                          <Menu
                            anchorEl={anchorEl}
                            open={isDropdownOpen}
                            onClose={handleDropdownClose}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            <MenuItem component={Link} to="/jobsapplied">
                              My job
                            </MenuItem>
                            <MenuItem
                              onClick={handleNavAndClose}
                              component={Link}
                              to="/createjob"
                            >
                              Post Job
                            </MenuItem>
                            <MenuItem
                              onClick={handleNavAndClose}
                              component={Link}
                              to="/myjob"
                            >
                              Manage Job Posted
                            </MenuItem>
                            <MenuItem
                              component={Link}
                              to="/bnaniihai"
                            >
                              Resume Builder
                            </MenuItem>
                          </Menu>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <IconButton
                color="inherit"
                style={{ marginRight: "20px" }}
                component={Link}
                to="/post"
              >
                <FontAwesomeIcon icon={faHome} />
              </IconButton>
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                style={{ marginRight: "20px" }}
              >
                <FontAwesomeIcon icon={faUserFriends} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/connections"
                >
                  Connection
                </MenuItem>
                <MenuItem
                  onClick={handleMenuClose}
                  component={Link}
                  to="/otherusers"
                >
                  Add friend
                </MenuItem>
              </Menu>
              <IconButton
                color="inherit"
                style={{ marginRight: "20px" }}
                component={Link}
                to="/chat"
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </IconButton>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  color="inherit"
                  onClick={handleJobMenuToggle}
                  style={{ marginRight: "4px" }}
                  component={Link}
                  to="/showjob"
                >
                  <FontAwesomeIcon icon={faMoneyCheckAlt} />
                </IconButton>
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/profile"
                >
                  <FontAwesomeIcon icon={faUser} />
                </IconButton>
                {location.pathname === "/showjob" && (
                  <>
                    {isJobMenuOpen && (
                      <>
                        <i
                          className="fas fa-chevron-down fa-xs"
                          style={{ marginLeft: "0px" }}
                          onClick={handleDropdownToggle}
                        ></i>
                        {isDropdownOpen && (
                          <Menu
                            anchorEl={anchorEl}
                            open={isDropdownOpen}
                            onClose={handleDropdownClose}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            <MenuItem component={Link} to="/jobsapplied">
                              My job
                            </MenuItem>
                            <MenuItem
                              component={Link}
                              to="/createjob"
                            >
                              Post Job
                            </MenuItem>
                            <MenuItem
                              component={Link}
                              to="/myjob"
                            >
                              Manage Job Posted
                            </MenuItem>
                            <MenuItem
                              component={Link}
                              to="/bnaniihai"
                            >
                              Resume Builder
                            </MenuItem>
                          </Menu>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container1 />
    </>
  );
};

export default Navbar;
