import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
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
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const Singlejob = () => {
  const axiosPrivate=useAxiosPrivate()
  const { jobId } = useParams();
  const [job, setJob] = useState({}); // Change the initial state to an empty object
  const { newUser } = useContext(User);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.post("/job/singlejob", {
          jobId: jobId,
          userId: newUser.userid,
        });

        console.log(response.data);
        const { data, hasApplied } = response.data;

        // Update the job state with both data and hasApplied properties
        setJob({
          ...data,
          hasApplied: hasApplied,
        });
      } catch (error) {
        console.error("Error fetching job data: ", error);
      }
    };

    fetchData();
  }, [jobId, newUser.userid]);

  console.log("vi", job);

  return (
    
    <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...	">
      <Card
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
          <Typography variant="h6" sx={{ color: "#333", marginBottom: "8px" }}>
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
          <Box sx={{ display: "flex", flexWrap: "wrap", marginBottom: "16px" }}>
            {job.skill &&
              job.skill.map((skill, i) => (
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
  Mobile: {job.contact && job.contact[0]}
</Typography>
<Typography variant="body1" sx={{ color: "#555" }}>
  Email: {job.contact && job.contact[1]}
</Typography>
<Typography variant="body1" sx={{ color: "#555" }}>
  Website: {job.contact && job.contact[2]}
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Singlejob;
