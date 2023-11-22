import React, { useState, useEffect, useContext } from "react";
import { User } from "../context/User";

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
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
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
  const [isTrending, setIsTrending] = useState(false); // State to track trend button click
  const [currentPage, setCurrentPage] = useState(1);

  const [jobData, setJobData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loca, setLoca] = useState([]);
  const { newUser } = useContext(User);
  const userid = newUser.userid;
  const [compa, setCompa] = useState([]);
  const [ski, setSki] = useState([]);

  const [data, setData] = useState({
    jobtype: [],
    locationtypes: [],
    locationonsite: [],
    company: [],
    skill:[],
    userID: userid,
    
    trend:0, // Set the userID directly here
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
        // console.log(compa);
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
        const response = await axios.get("/job/getskill");
        // Assuming the array is present in the 'data' property of the response
        setSki(response.data);
        console.log(ski);
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
  const handletrending = async () => {
    try {
      // Toggle isTrending first
      setIsTrending((prevIsTrending) => !prevIsTrending);
  
      // Then update data based on the new isTrending value
      setData((prevData) => ({
        ...prevData,
        trend: !isTrending ? 1 : 0,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleFilterDialogClose = async () => {
    setOpenFilterDialog(false);
  };
  
  
  console.log("showjob"+newUser.userid);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/job/showjob", {
          ...data,
          page: currentPage,
        });
  
        const jobsWithApplied = response.data.data.map((job) => ({
          ...job,
          hasApplied: job.hasApplied,
        }));
  
        // If it's the first page, replace the existing data; otherwise, append the new data
        setJobData((prevData) =>
          currentPage === 1 ? jobsWithApplied : [...prevData, ...jobsWithApplied]
        );
      } catch (error) {
        console.error("Error fetching job data: ", error);
      }
    };
  
    fetchData();
  }, [data, currentPage]);
  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
  
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  
    const windowBottom = windowHeight + window.pageYOffset;
  
    if (windowBottom >= docHeight - 1) {
      // You can adjust the threshold (e.g., docHeight - 100) to start fetching data a bit earlier
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  
  const handleShareOnWhatsApp = (jobId) => {
    
    const jobLink = `${window.location.origin}/singlejob/${jobId}`; // Construct the job link

    // Construct the WhatsApp share link
    const whatsappLink = `whatsapp://send?text=${encodeURIComponent(jobLink)}`;

    // Open the WhatsApp link in a new window or redirect the user to WhatsApp
    window.open(whatsappLink, "_blank");
  };
  useEffect(() => {
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);
  
    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...	">
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleFilterDialogOpen}
        sx={{
          position: "fixed",
          bottom: "20px", // Adjust the bottom value as needed
          right: "20px", // Adjust the right value as needed
        }}
      >
        <i class="fa-solid fa-filter"></i>
      </Fab>
      <Fab
        color={isTrending ? "success" : "primary"} // Set color based on isTrending state
        aria-label="add"
        onClick={handletrending}
        sx={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
        }}
      >
        <i class="fa-brands fa-searchengin"></i>
      </Fab>
      {jobData.map((job, index) => (
        <Link to={`/singlejob/${job._id}`}>
        <Card
          key={index}
          sx={{
            maxWidth: 400,
            margin: "16px",
            transition: "transform 0.2s",
            backgroundColor: "rgb(254 215 170)",

            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            },
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

            {job.hasApplied ? (
              <span style={{ fontWeight: "bold", color: "red" }}>Applied</span>
            ) : (
              <>
                
                
                {job.isExpired ? (
                  <span style={{ fontWeight: "bold", color: "red" }}>
                    Expired
                  </span>
                ) : (
                  <>
                    
                    
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
                   
                    
                  </>
                )}
                <Button
              variant="contained"
              color="primary"
              onClick={() => handleShareOnWhatsApp(job._id)}
              sx={{
                mt: 2,
                backgroundColor: "#1976D2",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Share
            </Button>
                
              </>
            )}
          </CardContent>
        </Card>
      </Link>
      ))}
      <Dialog open={openFilterDialog} onClose={handleFilterDialogClose}>
        <DialogTitle>Filter</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleFilterDialogClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
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
             <Autocomplete
              multiple
              id="skill"
              options={ski}
              value={data.skill}
              onChange={(event, newValue) => {
                // setSelectedSkills(newValue);
                setData((old) => {
                  return {
                    ...old,
                    skill: [...newValue],
                  };
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Skill"
                  placeholder="Select Skill"
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
    </div>
  );
};

export default Showjob;
