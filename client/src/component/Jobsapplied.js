import React, { useState, useEffect, useContext } from "react";
import { User } from "../context/User";
import axios from "../api/axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";

const Jobsapplied = () => {
  const [data, setData] = useState([]);
  const { newUser } = useContext(User);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const useriD = newUser.userid;
const response = await axios.post("/job/jobapplication", { userid: useriD });

        setData(response.data); // Assuming the response is an array of jobs
        
      } catch (error) {
        console.error("Error fetching job data: ", error);
      }
    };
    fetchData();
  }, [newUser.userid]);

  return (
      <div className="flex-grow flex flex-col items-center justify-center">
        {data.map((e, index) => (
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
                  {e.company}
                </span>
              </Typography>
              <Divider sx={{ margin: "8px 0" }} />
              <Typography
                variant="h6"
                sx={{ color: "#333", marginBottom: "8px" }}
              >
                Post Required: {e.titles}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "#777", marginBottom: "8px" }}
              >
                {e.locationonsite}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#333", marginBottom: "16px" }}
              >
                {e.details}
              </Typography>
              <Divider sx={{ margin: "16px 0" }} />
              <Typography
                variant="body1"
                sx={{ color: "#555", marginBottom: "8px" }}
              >
                <strong>Job Type:</strong> {e.jobtype}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#555", marginBottom: "8px" }}
              >
                <strong>Application Deadline:</strong>{" "}
                {moment(e.lastdate).format("MMMM D, YYYY")}
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "#555", marginBottom: "8px" }}
              >
                <strong>Workplace</strong> {e.locationtypes}
              </Typography>
              <Box
                sx={{ display: "flex", flexWrap: "wrap", marginBottom: "16px" }}
              >
                {e.skill.map((skill, i) => (
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
                Mobile: {e.contact[0]}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555" }}>
                Email: {e.contact[1]}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555" }}>
                Website: {e.contact[2]}
              </Typography>
              <Divider sx={{ margin: "8px 0" }} />
              
             
               
                 <Link to={`/formsubmitted/${e._id}/${e.jobberid}`}>
                  <Button
                    variant="contained"
                    color="primary"
                    // href={e.applylink}
                    target="_blank"
                    sx={{
                      mt: 2,
                      backgroundColor: "#1976D2",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Show Form
                  </Button>
                </Link> 
            </CardContent>
          </Card>
        ))}
      </div>
  );
};

export default Jobsapplied;
