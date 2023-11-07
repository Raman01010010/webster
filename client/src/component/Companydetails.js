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
import { User } from "../context/User";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
export default function Companydetails() {
  const { comp, setComp } = useContext(User);
 
  
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
  const [isVali, setIsVali] = useState(false);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Regular expression for email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*\.\w{2,3}$/;

    // Check if the entered email matches the regex pattern
    setIsVali(emailRegex.test(newEmail));
  };
  const Workplace = [
    "On-Site",
    "Hybrid",
    "Remote",

    // Add more skills here
  ];
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
            value={comp.contact[1]}
            onChange={(e) => {
              handleResponseChange("contact", e.target.value, 1);
              handleEmailChange(e);
            }}
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
          <p style={{ color: isVali ? "green" : "red", fontSize: "14px" }}>
            {isVali ? "Valid Email" : "Invalid Email"}
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
              //setJobpage({ ...jobpage, locationonsite: e.target.value })

              setComp((old) => ({
                ...old,
                locationonsite: e.target.value,
              }));
            }}
            fullWidth
            variant="standard"
          />
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
          <TextField
            required
            id="jobtype"
            name="jobtype"
            label="jobtype"
            value={comp.jobtype}
            onChange={(e) => {
              //setJobpage({ ...jobpage, jobtype: e.target.value })

              setComp((old) => ({
                ...old,
                jobtype: e.target.value,
              }));
            }}
            fullWidth
            autoComplete="shipping country"
            variant="standard"
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
    </React.Fragment>
  );
}
