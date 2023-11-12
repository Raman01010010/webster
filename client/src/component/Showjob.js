import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Divider,
  Paper,
  DialogActions,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import moment from "moment"; // Import the moment library for date formatting

import MenuIcon from "@mui/icons-material/Menu";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import axios from "../api/axios";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Hidden } from "@mui/material";

const locationTypes = ["On-site", "Hybrid", "Remote"];
const employmentTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
  "Temporary",
];

const Showjob = () => {
  const [jobData, setJobData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loca, setLoca] = useState([]);
  const [compa, setCompa] = useState([]);
  const [data, setData] = useState({
    jobtype: [],
    locationtypes: [],
    locationonsite: [],
    company: [],
  });
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  useEffect(() => {
    // Fetch data from the backend using axios or your preferred method
    const fetchData = async () => {
      try {
        const response = await axios.get("/job/getloc");
        // Assuming the array is present in the 'data' property of the response
        setLoca(response.data);
        console.log(loca);
      } catch (error) {
        console.error("Error fetching data from the backend:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  useEffect(() => {
    // Fetch data from the backend using axios or your preferred method
    const fetchData = async () => {
      try {
        const response = await axios.get("/job/getcompa");
        // Assuming the array is present in the 'data' property of the response
        setCompa(response.data);
        console.log(compa);
      } catch (error) {
        console.error("Error fetching data from the backend:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);
  console.log("ye hai" + jobData.isExpired);
  const handleFilterDialogOpen = () => {
    setOpenFilterDialog(true);
  };
  const PostJob = async () => {
    try {
      const res = await axios.post("/job/showjob", data); // Send data as the request body
      console.log("posting");
      setJobData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilterDialogClose = async () => {
    setOpenFilterDialog(false);
    try {
      await PostJob(); // Wait for the job to be posted

      // Once the job is successfully posted, send an email
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to post job or send email. Please try again.");
    }
  };
  console.log("showjob");
  const Navbar = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openJobAlertsDialog, setOpenJobAlertsDialog] = useState(false);

    const handleDrawerOpen = () => {
      setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
      setOpenDrawer(false);
    };

    const handleJobAlertsDialogOpen = () => {
      setOpenJobAlertsDialog(true);
    };

    const handleJobAlertsDialogClose = () => {
      setOpenJobAlertsDialog(false);
    };
    const sidebarItems = [
      { text: "My Jobs", link: "/myjobs" },
      { text: "Post Job", link: "/createjob" },
      { text: "Filter", onClick: handleFilterDialogOpen },
      { text: "Job Alerts", onClick: handleJobAlertsDialogOpen },
      { text: "Manage Job Posted", link: "/myjob" },
      { text: "Resume Builder", link: "/resumebuilder" },
    ];
    console.log("problem" + openFilterDialog);
    return (
      <Hidden mdUp>
        <AppBar position="fixed" sx={{ marginBottom: "16px", height: "70px" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ marginRight: 2 }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              Photos
            </Typography>
          </Toolbar>
        </AppBar>

        <Dialog open={openFilterDialog} onClose={handleFilterDialogClose}>
          <DialogTitle>Filter small</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleFilterDialogClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Stack spacing={3} sx={{ width: 500 }}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={employmentTypes}
                value={data.jobtype}
                onChange={(event, newValue) => {
                  // setSelectedSkills(newValue);
                  setData((old) => {
                    return {
                      ...old,
                      jobtype: [...newValue],
                    };
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Employment Types"
                    placeholder="Select Employment Types"
                  />
                )}
              />

              <Autocomplete
                multiple
                id="location-types"
                options={locationTypes}
                value={data.locationtypes}
                getOptionLabel={(option) => option}
                onChange={(event, newValue) => {
                  // setSelectedSkills(newValue);
                  setData((old) => {
                    return {
                      ...old,
                      locationtypes: [...newValue],
                    };
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Location Types"
                    placeholder="Select Location Types"
                  />
                )}
              />
              <Autocomplete
                multiple
                id="location"
                options={loca}
                value={data.locationonsite}
                onChange={(event, newValue) => {
                  // setSelectedSkills(newValue);
                  setData((old) => {
                    return {
                      ...old,
                      locationonsite: [...newValue],
                    };
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Location"
                    placeholder="Select Location"
                  />
                )}
              />
              <Autocomplete
                multiple
                id="company"
                options={compa}
                value={data.company}
                onChange={(event, newValue) => {
                  // setSelectedSkills(newValue);
                  setData((old) => {
                    return {
                      ...old,
                      company: [...newValue],
                    };
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Company"
                    placeholder="Select Company"
                  />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleFilterDialogClose}>
              Save changes
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openJobAlertsDialog} onClose={handleJobAlertsDialogClose}>
          <DialogTitle>Alert small</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleJobAlertsDialogClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </Typography>
            <Typography gutterBottom>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </Typography>
            <Typography gutterBottom>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
              cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
              dui. Donec ullamcorper nulla non metus auctor fringilla.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleJobAlertsDialogClose}>
              Save changes
            </Button>
          </DialogActions>
        </Dialog>

        <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
          <IconButton
            aria-label="close"
            onClick={handleDrawerClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <List>
            {sidebarItems.map((item, index) => (
              <ListItem
                button
                key={index}
                component={item.link ? Link : "div"}
                to={item.link}
                onClick={item.onClick ? item.onClick : handleDrawerClose}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Hidden>
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send data as the request body
        const response = await axios.post("/job/showjob", data);
        setJobData(response.data);
      } catch (error) {
        console.error("Error fetching job data: ", error);
      }
    };
    fetchData();
  }, [data]);

  const Sidebar = () => {
    const [openJobAlertsDialog, setOpenJobAlertsDialog] = useState(false);

    const handleJobAlertsDialogOpen = () => {
      setOpenJobAlertsDialog(true);
    };

    const handleJobAlertsDialogClose = () => {
      setOpenJobAlertsDialog(false);
    };
    return (
      <React.Fragment>
        <Hidden mdDown>
          <Paper
            elevation={3}
            style={{
              width: "200px",
              padding: "16px",
              position: "fixed",
              marginRight: "16px",
              top: "50%",
            }}
          >
            <Typography variant="h6" style={{ marginBottom: "16px" }}>
              Options
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
              <Link to="/myjobs">My Jobs</Link>
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
              <Link to="/createjob">Post Job</Link>
              {console.log("ana" + jobData.isExpired)}
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
              <Button
                variant="text"
                onClick={handleFilterDialogOpen}
                style={{
                  textTransform: "capitalize",
                  color: "black",
                  fontSize: "17px",
                }}
              >
                filter
              </Button>
            </Typography>

            <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
              <Button
                variant="text"
                onClick={handleJobAlertsDialogOpen}
                style={{
                  textTransform: "capitalize",
                  color: "black",
                  fontSize: "17px",
                }}
              >
                Alert
              </Button>
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
              <Link to="/myjob">Manage Job Posted</Link>
            </Typography>
            <Typography variant="subtitle1" style={{ marginBottom: "8px" }}>
              <Link to="/resumebuilder">Resume Builder</Link>
            </Typography>
          </Paper>
        </Hidden>

        <Dialog open={openJobAlertsDialog} onClose={handleJobAlertsDialogClose}>
          <DialogTitle>Alert big</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleJobAlertsDialogClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>{/* put the content */}</DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleJobAlertsDialogClose}>
              Save changes
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openFilterDialog} onClose={handleFilterDialogClose}>
          <DialogTitle>Filter</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleFilterDialogClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Stack spacing={3} sx={{ width: 500 }}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={employmentTypes}
                value={data.jobtype}
                onChange={(event, newValue) => {
                  // setSelectedSkills(newValue);
                  setData((old) => {
                    return {
                      ...old,
                      jobtype: [...newValue],
                    };
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Employment Types"
                    placeholder="Select Employment Types"
                  />
                )}
              />

              <Autocomplete
                multiple
                id="location-types"
                options={locationTypes}
                value={data.locationtypes}
                getOptionLabel={(option) => option}
                onChange={(event, newValue) => {
                  // setSelectedSkills(newValue);
                  setData((old) => {
                    return {
                      ...old,
                      locationtypes: [...newValue],
                    };
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Location Types"
                    placeholder="Select Location Types"
                  />
                )}
              />

              <Autocomplete
                multiple
                id="location"
                options={loca}
                value={data.locationonsite}
                onChange={(event, newValue) => {
                  // setSelectedSkills(newValue);
                  event.preventDefault();
                  setData((old) => {
                    return {
                      ...old,
                      locationonsite: [...newValue],
                    };
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Location"
                    placeholder="Select Location"
                  />
                )}
              />

              <Autocomplete
                multiple
                id="company"
                options={compa}
                value={data.company}
                onChange={(event, newValue) => {
                  // setSelectedSkills(newValue);
                  setData((old) => {
                    return {
                      ...old,
                      company: [...newValue],
                    };
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Company"
                    placeholder="Select Company"
                  />
                )}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleFilterDialogClose}>
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  };

  return (
    <div className="min-h-screen flex flex-row">
      <Sidebar />

      <div className="flex-grow flex flex-col items-center justify-center">
        <Navbar />
        {jobData.map((job, index) => (
          <Card
            key={index}
            sx={{
              maxWidth: 400,
              margin: "16px",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              },
              backgroundColor: "#F0F6F1", // Add your desired background color here
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: "bold",
                  color: "#1976D2",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "1.5rem", color: "#333" }}>
                  {job.company}
                </span>
              </Typography>
              <Divider sx={{ margin: "8px 0" }} />
              <Typography
                variant="h6"
                sx={{ color: "#333", marginBottom: "8px" }}
              >
                Post Required: {job.titles}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "#777", marginBottom: "8px" }}
              >
                {job.locationonsite}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#333", marginBottom: "16px" }}
              >
                {job.details}
              </Typography>
              <Divider sx={{ margin: "16px 0" }} />
              <Typography
                variant="body1"
                sx={{ color: "#555", marginBottom: "8px" }}
              >
                <strong>Job Type:</strong> {job.jobtype}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#555", marginBottom: "8px" }}
              >
                <strong>Application Deadline:</strong>{" "}
                {moment(job.lastdate).format("MMMM D, YYYY")}
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "#555", marginBottom: "8px" }}
              >
                <strong>Workplace</strong> {job.locationtypes}
              </Typography>
              <Box
                sx={{ display: "flex", flexWrap: "wrap", marginBottom: "16px" }}
              >
                {job.skill.map((skill, i) => (
                  <Chip
                    key={i}
                    label={skill}
                    sx={{
                      margin: "2px",
                      backgroundColor: "#1976D2",
                      color: "white",
                    }}
                  />
                ))}
              </Box>
              <Divider sx={{ margin: "16px 0" }} />
              <Typography
                variant="body1"
                sx={{ color: "#555", marginBottom: "8px" }}
              >
                <strong>Contact:</strong>
              </Typography>
              <Typography variant="body1" sx={{ color: "#555" }}>
                Mobile: {job.contact[0]}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555" }}>
                Email: {job.contact[1]}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555" }}>
                Website: {job.contact[2]}
              </Typography>
              <Divider sx={{ margin: "16px 0" }} />

              {!job.isExpired ? (
                <Link to={`/job/${job._id}`}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={job.applylink}
                    target="_blank"
                    sx={{
                      mt: 2,
                      backgroundColor: "#1976D2",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Apply Now
                  </Button>
                </Link>
              ) : (
                <span style={{ fontWeight: "bold", color: "red" }}>
                  Expired
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Showjob;
