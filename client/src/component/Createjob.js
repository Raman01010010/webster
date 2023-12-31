import * as React from "react";
import {useState,useEffect} from "react"
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Companydetails from "./Companydetails.js";
import Skills from "./Skills.js";
import Vreview from "./Vreview.js";
import { useContext } from "react";
import { User } from "../context/User";
import axios from "../api/axios";
// import { post } from "../../../server/routes/jobRoutes.js";
    
function Createjob() {
  
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Companydetails © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Company profile", "Skills required", "Review "];

export default function Checkout() {
  const {newUser}=useContext(User)
  console.log(newUser)
  const [activeStep, setActiveStep] = useState(0);


  const { comp, setComp } = useContext(User);
  const [isFormComplete, setIsFormComplete] = useState(false);
  // console.log("vivek"+comp.jobberid);

  const checkFormCompletion = () => {

    // Replace these conditions with your actual form validation logic
    const isStep1Complete =
      activeStep === 0 &&
      comp.titles !== "" &&
      comp.company !== "" &&
      comp.locationonsite !== "" &&
      comp.lastdate !== "" &&
      comp.jobtype !== "" &&
      comp.details !== "" &&
      comp.contact[0] !== "" &&
      comp.contact[1] !== "" &&
      comp.contact[2] !== "" &&
      comp.applylink !== "" ;

    const isStep2Complete = activeStep === 1 && (comp.skill.length>0);
    
     
    const isFormValid =
      isStep1Complete || isStep2Complete ;

    setIsFormComplete(isFormValid);
  };

  useEffect(() => {
    checkFormCompletion();
  }, [comp]);


  const PostJob = async () => {

    try {
      const res = await axios.post("/job/create", comp);
      console.log("posting")
      setComp({
        titles: "",
        company: "",
        locationonsite: "",
        lastdate: "",
        jobtype: "",
        details: "",
        contact: ["","",""],
        locationtypes:"",
        applylink: "",    
        skill:[],
      })
      console.log(comp);
    } catch (error) {
      console.log(error);
    }
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Companydetails />;
      case 1:
        return <Skills />;
      case 2:
        {//console.log(comp)
          
          // console.log(comp); // Add a debug statement here
          
        return <Vreview data={comp} />;
        }
      default:
        throw new Error("Unknown step");
    }
  }
  
  // console.log(comp);
  //const [data, setData] = React.useState({});

  // console.log(data)

  const handleNext = async () => {
    if (activeStep === 2) {
      try {
        await PostJob(); // Wait for the job to be posted
  
        // Once the job is successfully posted, send an email
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to post job or send email. Please try again.');
      }
    }
    setActiveStep(activeStep + 1);
  };
  

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

//   const handleSendEmail = async () => {
//     try {
//         const response = await axios.post('/job/mail', {
//             recipientEmail,
//             messageContent,
//         });

//         if (response.status === 200) {
//             alert('Email sent successfully!');
//         } else {
//             alert('Failed to send email. Please try again.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred. Please try again later.');
//     }
// };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Create a job
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!isFormComplete}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Post Job" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
