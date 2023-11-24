import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import { useContext } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { User } from "../context/User";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export default function Companydetails() {
  const { comp, setComp } = useContext(User);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
/////
const axiosPrivate=useAxiosPrivate()
  const updateLocationSuggestions = async (query) => {
    const apiKey = "55810e9a0db5484fae278428320f9add";

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          query
        )}&key=${apiKey}`
      );

      if (response.ok) {
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const suggestions = data.results.map((result) => ({
            formatted: result.formatted,
            // You can include additional information from the API response if needed
            // For example: latitude: result.geometry.lat, longitude: result.geometry.lng
          }));

          setLocationSuggestions(suggestions);
        } else {
          setLocationSuggestions([]);
        }
      } else {
        console.error(
          "Error fetching location suggestions:",
          response.statusText
        );
        setLocationSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching location suggestions:", error.message);
      setLocationSuggestions([]);
    }
  };
  const handleSuggestionClick = (suggestion) => {
    setComp((old) => ({
      ...old,
      locationonsite: suggestion.formatted,
    }));
    setLocationSuggestions([]); // Clear suggestions after selecting one
  };

  const handleResponseChange = (field, value, questionIndex) => {
    // If the field is additionalQuestions, create a copy of the array and set the new value at the specified index
    if (field === "contact") {
      const updatedContact = [...comp.contact];
      updatedContact[questionIndex] = value;

      setComp((prevComp) => ({
        ...prevComp,
        contact: updatedContact,
      }));
    } else {
      setComp({ ...comp, [field]: value });
    }
  };
  const jobtype = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Temporary', 'Internship'];

  const [mobileNumber, setMobileNumber] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleMobileNumberChange = (event) => {
    const newMobileNumber = event.target.value;
    setMobileNumber(newMobileNumber);

    // Regular expression for a 10-digit mobile number (you can adjust it based on your needs)
    const mobileNumberRegex = /^[0-9]{10}$/;

    // Check if the entered mobile number matches the regex pattern
    setIsValid(mobileNumberRegex.test(newMobileNumber));
  };

  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };
  const Workplace = [
    "On-Site",
    "Hybrid",
    "Remote",
  ];
   
  const { newUser } = useContext(User);
  console.log(newUser);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Jobdetails
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Job title"
            name="Job title"
            label="Job title"
            value={comp.titles}
            onChange={(e) => {
              //setJobpage({ ...jobpage, titles: e.target.value })

              setComp((old) => ({
                ...old,
                titles: e.target.value,
              }));
            }}
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="CompanyName"
            name="CompanyName"
            label="Company Name"
            value={comp.company}
            onChange={(e) => {
              //setJobpage({ ...jobpage, company: e.target.value })

              setComp((old) => ({
                ...old,
                company: e.target.value,
              }));
            }}
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="details"
            name="details"
            label="Details of company"
            value={comp.details}
            onChange={(e) => {
              //setJobpage({ ...jobpage, details: e.target.value })

              setComp((old) => ({
                ...old,
                details: e.target.value,
              }));
            }}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            value={comp.contact[0]}
            onChange={(e) => {
              handleResponseChange("contact", e.target.value, 0);
              handleMobileNumberChange(e);
            }}
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
          <p style={{ color: isValid ? "green" : "red", fontSize: "14px" }}>
            {isValid ? "Valid mobile number" : "Invalid mobile number"}
          </p>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            value={newUser.email}
            // onChange={(e) => {
            // handleResponseChange("contact", e.target.value, 1);
            // }}
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
          <p style={{ color: "green", fontSize: "14px" }}>
            {newUser.email ? "Valid Email" : "Invalid Email"}
          </p>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="website"
            name="website"
            label="Website"
            value={comp.contact[2]}
            onChange={(e) => {
              handleResponseChange("contact", e.target.value, 2);
            }}
            /////////////////////////////////////////////
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            id="workplace"
            options={Workplace}
            getOptionLabel={(option) => option}
            value={comp.locationtypes}
            onChange={(_, newValue) => {
              //setJobpage({ ...jobpage, locationtypes: newValue })

              setComp((old) => ({
                ...old,
                locationtypes: newValue,
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} label="Workplace" variant="standard" />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} size="small" {...getTagProps({ index })} />
              ))
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="LocationSite"
            name="LocationSite"
            label="LocationSite"
            value={comp.locationonsite}
            onChange={(e) => {
              setComp((old) => ({
                ...old,
                locationonsite: e.target.value,
              }));
              updateLocationSuggestions(e.target.value);
            }}
            fullWidth
            variant="standard"
          />
          {locationSuggestions.length > 0 && (
            <div>
              {locationSuggestions.map((suggestion, index) => (
                <Chip
                  key={index}
                  label={suggestion.formatted}
                  onClick={() => handleSuggestionClick(suggestion)}
                />
              ))}
            </div>
          )}
        </Grid>
         
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Date Picker"
                format="M/D/YYYY"
                defaultValue={dayjs(comp.lastdate)} // Convert the date to a Day.js object
                slotProps={{ field: { shouldRespectLeadingZeros: true } }}
                value={dayjs(comp.lastdate)} // Convert the date to a Day.js object
                onChange={(newDate) => {
                  // Update the 'lastdate' in the 'comp' state with the new date in ISO format
                  setComp((old) => ({
                    ...old,
                    lastdate: newDate.toISOString(), // Convert the date to a string in ISO format
                  }));
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Autocomplete
          id="jobtype"
          options={jobtype}
          // getOptionLabel={(option) => option}
          value={comp.jobtype}
          onChange={(_, newValue) => {
            setComp((old) => ({
              ...old,
              jobtype: newValue,
            }));
          }}
          renderInput={(params) => (
            <TextField {...params} label="Job Type" variant="standard" />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip label={option} size="small" {...getTagProps({ index })} />
            ))
          }
        />
      </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="applylink"
            name="applylink"
            label="link to apply"
            value={comp.applylink}
            onChange={(e) => {
              //setJobpage({ ...jobpage, applylink: e.target.value })

              setComp((old) => ({
                ...old,
                applylink: e.target.value,
              }));
            }}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
         
      </Grid>
      <Link to="/showjob">
        <Button  variant="contained" sx={{ mt: 3, ml: 1 }}>
                    Return Back
                  </Button>
                  </Link>
    </React.Fragment>
  );
}
