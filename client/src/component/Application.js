import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import {
  
  Typography,
  Button,

  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import Autocomplete from "@mui/material/Autocomplete";

import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import CloseIcon from "@mui/icons-material/Close";
const skillsList = [
  'HTML',
  'CSS',
  'JavaScript',
  'Java',
  'C++',
  'Kotlin',
  // Add more skills here
];
const englishlevel=[
  'Conversational',
  'Professional',
  'Native or bilingual'
]
const Application = () => {
  const { jobId } = useParams();
  const [myapp, setMyapp] = useState([]);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [data,setData]=useState({
    skill:[],
    english:[],
    jobid: jobId

  })
  const [maxHeight, setMaxHeight] = useState(10);
  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await axios.post("/job/app", data);
        setMyapp(response.data);
      } catch (error) {
        console.error("Error fetching application data: ", error);
      }
    };
    fetchData();
  }, [jobId]);

  useEffect(() => {
    // Calculate the maximum height among all cards
    const maxCardHeight = Math.max(
      ...myapp.map((applicant) => {
        const cardHeight = document.getElementById(
          `card-${applicant._id}`
        ).clientHeight;
        return cardHeight;
      })
    );
    setMaxHeight(maxCardHeight);
  }, [myapp]);

  const [showResume, setShowResume] = useState(false);

  const handleShowResume = () => {
    setShowResume((prevShowResume) => !prevShowResume);
  };
  const PostJob = async () => {
    try {
    
      const response = await axios.post("/job/app", data);
      setMyapp(response.data);
    } catch (error) {
      console.error("Error fetching application data: ", error);
    }
  };
  const handleFilterDialogOpen = () => {
    setOpenFilterDialog(true);
  };
  const handleFilterDialogClose = async () => {
    setOpenFilterDialog(false);
    try {
      await PostJob(); // Wait for the job to be posted

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to post job or send email. Please try again.");
    }
  };
  return (
    <>
      <button onClick={handleShowResume} style={{ color: '#1EB9E5', display: 'flex', alignItems: 'center',marginTop:'100px' }}>
         <i className="fas fa-eye" style={{ marginRight: '8px' }}></i> View Resume
      </button> 
    <div className="flex items-center justify-center h-screen">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-hidden">
    
        {myapp.map((applicant, index) => (
          <div
            key={index}
            id={`card-${applicant._id}`}
            className={`card transition-transform transform bg-yellow-300`}
            style={{ maxHeight: `${maxHeight}px`, overflowY: "auto" }}
          >
            <div className="bg-cyan p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">
                Name: {applicant.name}
              </h3>
              <p>Email: {applicant.email}</p>
              <p>Phone: {applicant.phone}</p>
              <p>Place: {applicant.place}</p>
              <p>Location: {applicant.location}</p>
              <p>
                Resume:{" "}
               
                {showResume && (
                  <iframe
                    src={applicant.resume}
                    title="Resume"
                    style={{ width: "100%", height: "500px", border: "none" }}
                  />
                )}
              </p>
              <p>Professional Experience: {applicant.additionalQuestions[0]}</p>
              <p>Additional Question 1: {applicant.additionalQuestions[1]}</p>
              <p>Additional Question 2: {applicant.additionalQuestions[2]}</p>
              <p>Skills: {applicant.skill.map((skill, i) => (
                <span key={i}>{skill}</span>
              ))}</p>
              <input
                type="text"
                id="location"
                className="border p-2 mt-2 focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>
      </div>
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
              options={skillsList}
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
                  label="Skills "
                  placeholder="Select Skills"
                />
              )}
            />

           
            
            

            <Autocomplete
              multiple
              id="english"
              options={englishlevel}
              value={data.english}
              onChange={(event, newValue) => {
                // setSelectedSkills(newValue);
                event.preventDefault();
                setData((old) => {
                  return {
                    ...old,
                    english: [...newValue],
                  };
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="English proficiency"
                  placeholder="Select leve;"
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
    </>
  );
};

export default Application;
