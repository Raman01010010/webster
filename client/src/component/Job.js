import React, { useState, useEffect ,useContext} from "react";
import Review from "./Review";
import { User } from "../context/User";
import Box from "@mui/material/Box";
import swal from 'sweetalert';
import { TailSpin } from 'react-loader-spinner';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "../api/axios";
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
const skillsList = [
  'HTML',
  'CSS',
  'JavaScript',
  'Java',
  'C++',
  'Kotlin',
  // Add more skills here
];
const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
  "Additional Questions", // Add an additional step
];
export default function Job() {
  const [loading, setLoading] = useState(false);
  const axiosPrivate=useAxiosPrivate()
  const { jobId } = useParams();
  const { newUser } = useContext(User);
  const userid=newUser.userid;
  console.log("vi"+newUser.userid)
  const [activeStep, setActiveStep] = React.useState(0);
  const [responses, setResponses] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
    resume: "",
    skill:[],
    additionalQuestions: ["", "", ""],
    
    location: "",
    jobid:jobId,
    userID: userid, // Set the userID directly here
  });
  const [isFormComplete, setIsFormComplete] = useState(false);
  // console.log(jobId)
   
  const checkFormCompletion = () => {
    // Replace these conditions with your actual form validation logic
    const isStep1Complete =
      activeStep == 0 &&
      responses.name != "" &&
      responses.email != "" &&
      responses.phone != "" &&
      responses.place != "";
    const isStep2Complete = activeStep == 1 && (responses.resume != "" || true);
    const isStep3Complete =
      activeStep == 2 &&
      responses.additionalQuestions[0] != "" &&
      responses.additionalQuestions[1] != "" &&
      responses.additionalQuestions[2] != ""; // Add your validation logic for step 3
    const isStep4Complete = activeStep == 3 && responses.location != "";
    const isFormValid =
      isStep1Complete ||
      isStep2Complete ||
      isStep3Complete ||
      isStep4Complete ||
      true;
    setIsFormComplete(isFormValid);
  };
  useEffect(() => {
    checkFormCompletion();
  }, [responses]);

  const additionalQuestions = [
    "What is your level of proficiency in English?",
    "Are you willing to undergo a background check, in accordance with local law/regulations?",
    "Are you comfortable commuting to this job's location?",
    "Other Additional Question",
  ];
  const handleResponseChange = (field, value, questionIndex) => {
    if (field === "additionalQuestions") {
      // console.log("handleResponseChange called with field:", field);

      // If the field is additionalQuestions, create a copy of the array and set the new value at the specified index
      const updatedAdditionalQuestions = [...responses.additionalQuestions];
      updatedAdditionalQuestions[questionIndex] = value;
      setResponses((prevResponses) => ({
        ...prevResponses,
        additionalQuestions: updatedAdditionalQuestions,
      }));
    } else if (field === "resume") {
      const selectedFile = value[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileData = e.target.result;
  
          setResponses((prevResponses) => ({
            ...prevResponses,
            resume: fileData, // Store the selected resume in responses.resume
          }));
          // console.log(responses.resume)
        };
        reader.readAsDataURL(selectedFile);
      }
    } else {
      // If the field is not additionalQuestions, update it normally
      setResponses((prevResponses) => ({
        ...prevResponses,
        [field]: value,
      }));
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const Submit = async () => {
  try {
    setLoading(true);
    const res = await axiosPrivate.post("/job/profile", responses);
    console.log(res);
    swal({
      title: "Successfully added",
      icon: "success",
      button: false,
      timer: 3000
    });
    setLoading(false);
    
  } catch (error) {
    console.log(error);
    console.log("yaha")
  }
};


  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        {activeStep === 0 ? (
          <div>
            {/* Your provided page UI */}
            <section className="text-gray-600 body-font relative">
              {/* Your content for step 1 */}
              {/* Add your content here */}
              <>
                {/* Your content for step 1 */}
                {/* Add your content here */}
                <section className="text-gray-600 body-font relative">
                  <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                        Contact Us
                      </h1>
                      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                        Whatever cardigan tote bag tumblr hexagon brooklyn
                        asymmetrical gentrify.
                      </p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                      <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-full">
                          <div className="relative">
                            <label
                              htmlFor="name"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={responses.name}
                              onChange={(e) =>
                                setResponses({
                                  ...responses,
                                  name: e.target.value
                                  // jobid:jobId
                                })
                              }
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                          </div>
                        </div>
                        <div className="p-2 w-full">
                          <div className="relative">
                            <label
                              htmlFor="email"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={responses.email}
                              onChange={(e) =>
                                setResponses({
                                  ...responses,
                                  email: e.target.value,
                                })
                              }
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                          </div>
                        </div>
                        <div className="p-2 w-full">
                          <div className="relative">
                            <label
                              htmlFor="phone"
                              className="leading-7 text-sm text-gray-600"
                            >
                              Phone Number
                            </label>
                            <input
                              type="tel" // Change the type to "tel" for phone number
                              id="phone" // Change the id to something like "phone"
                              name="phone" // Change the name to something like "phone"
                              value={responses.phone}
                              onChange={(e) =>
                                setResponses({
                                  ...responses,
                                  phone: e.target.value,
                                })
                              }
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                          </div>
                        </div>
                        <div className="p-2 w-full">
                          <div className="relative">
                            <label
                              htmlFor="place"
                              className="leading-7 text-sm text-gray-600"
                            >
                              location
                            </label>
                            <input
                              type="location" // Change the type to "tel" for phone number
                              id="place" // Change the id to something like "phone"
                              name="place" // Change the name to something like "phone"
                              value={responses.place}
                              onChange={(e) =>
                                setResponses({
                                  ...responses,
                                  place: e.target.value,
                                })
                              }
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            </section>
          </div>
        ) : activeStep === 1 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ marginBottom: '20px' }}>Upload Your Resume</h1>

      <div style={{ marginBottom: '20px' }}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload Resume
          <input
            type="file"
            accept=".pdf, .png, .jpg, .jpeg"
            style={{ display: 'none' }}
            onChange={(e) => {
              handleResponseChange('resume', e.target.files, 0);
            }}
          />
        </Button>
      </div>

      <div>
      <React.Fragment>
      <Typography variant="h6" gutterBottom></Typography>
      <Grid container spacing={3}>
        <Autocomplete
          multiple
          id="size-small-standard-multi"
          size="small"
          options={skillsList}
          value={responses.skill}
          onChange={(event, newValue) => {
           // setSelectedSkills(newValue);
           setResponses(old=>{
              return({
                ...old,
                "skill":[...newValue]
              })
            })
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Skills "
              placeholder="Add more Skills"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                size="small"
                color="primary"
                {...getTagProps({ index })}
              />
            ))
          }
        />
      </Grid>
    </React.Fragment>
      </div>
    </div>
        ) : activeStep === 2 ? (
          <div>
            <h1>Additional Questions</h1>
            <div>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  What is your level of proficiency in English?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="None of the above" // Set the default value to "None of the above"
                  name="radio-buttons-group"
                  value={responses.additionalQuestions[0]}
                  onChange={(e) =>
                    handleResponseChange(
                      "additionalQuestions",
                      e.target.value,
                      0
                    )
                  }
                >
                  <FormControlLabel
                    value="Conversational"
                    control={<Radio />}
                    label="Conversational"
                  />
                  <FormControlLabel
                    value="Professional"
                    control={<Radio />}
                    label="Professional"
                  />
                  <FormControlLabel
                    value="Native or bilingual"
                    control={<Radio />}
                    label="Native or bilingual"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Are you willing to undergo a background check, in accordance
                  with local law/regulations?Are you willing to undergo a
                  background check, in accordance with local law/regulations?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="None of the above"
                  name="radio-buttons-group"
                  value={responses.additionalQuestions[1]}
                  onChange={(e) =>
                    handleResponseChange(
                      "additionalQuestions",
                      e.target.value,
                      1
                    )
                  }
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Are you comfortable commuting to this job's location?{" "}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="None of the above"
                  name="radio-buttons-group"
                  value={responses.additionalQuestions[2]}
                  onChange={(e) =>
                    handleResponseChange(
                      "additionalQuestions",
                      e.target.value,
                      2
                    )
                  }
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        ) : activeStep === 3 ? (
          <>
            <div>
              <h1>Additional Questions</h1>
              <div> Work Authorization</div>
              <div>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    We must fill this position urgently. Can you start
                    immediately?{" "}
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="None of the above"
                    name="radio-buttons-group"
                    value={responses.location}
                    onChange={(e) =>
                      handleResponseChange("location", e.target.value)
                    }
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </>
        ) : null}
      </Box>
      {activeStep <= 3 && (
        <>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {activeStep > 0 && ( // Show "Back" button when activeStep is greater than 0
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext} disabled={!isFormComplete}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
      {activeStep === 4 && (
        <div>
          {/* Your content to be rendered when activeStep is 4 */}
          <Review
            name={responses.name}
            email={responses.email}
            phone={responses.phone}
            place={responses.place}
            resume={responses.resume}
            additionalQuestions={responses.additionalQuestions}
            location={responses.location}
          />{" "}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            {activeStep > 0 && ( // Show "Back" button when activeStep is greater than 0
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={Submit}>
            {loading? <TailSpin height={25} color="white"/>:'Submit'} 
                        </Button>
          </Box>
        </div>
      )}
    </Box>
  );
}
