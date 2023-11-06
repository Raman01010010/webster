import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';

export default function Companydetails({ onCompanyDetailsChange }) {
  const [jobpage, setJobpage] = useState({
    titles: "",
    company: "",
    locationtypes: "",
    locationonsite: "",
    lastdate: "",
    jobtype: "",
    details: "",
    contact: ["", "", ""],
    applylink: "",
  });

  const handleResponseChange = (field, value, questionIndex) => {
    // If the field is additionalQuestions, create a copy of the array and set the new value at the specified index
    if (field === "contact") {
      const updatedcontact = [...jobpage.contact];
      updatedcontact[questionIndex] = value;
      setJobpage((prevJobpage) => ({
        ...prevJobpage,
        contact: updatedcontact,
      }));
    } else {
      setJobpage({ ...jobpage, [field]: value });
    }
  };

  const Workplace = [
    'On-Site',
    'Hybrid',
    'Remote',
    
    // Add more skills here
  ];

  const handleDataChange = () => {
    onCompanyDetailsChange(jobpage);
  };
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
            value={jobpage.titles}
            onChange={(e) => setJobpage({ ...jobpage, titles: e.target.value })}
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
            value={jobpage.company}
            onChange={(e) => setJobpage({ ...jobpage, company: e.target.value })}
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
            value={jobpage.details}
            onChange={(e) => setJobpage({ ...jobpage, details: e.target.value })}
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
            value={jobpage.contact[0]}
            onChange={(e)=>{
              handleResponseChange("contact",e.target.value,0)
            }}
            ///////////////////////////////////////////
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            value={jobpage.contact[1]}
            onChange={(e)=>{
              handleResponseChange("contact",e.target.value,1)
            }}
            //////////////////////////////////
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="website"
            name="website"
            label="Website"
            value={jobpage.contact[2]}
            onChange={(e)=>{
              handleResponseChange("contact",e.target.value,2)
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
            value={jobpage.locationtypes}
            onChange={(_, newValue) => setJobpage({ ...jobpage, locationtypes: newValue })}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Workplace"
                variant="standard"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  size="small"
                  {...getTagProps({ index })}
                />
              ))
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="LocationSite"
            name="LocationSite"
            label="LocationSite"
            value={jobpage.locationonsite}
            onChange={(e) => setJobpage({ ...jobpage, locationonsite: e.target.value })}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastdate"
            name="lastdate"
            label="last date of form"
            value={jobpage.lastdate}
            onChange={(e) => setJobpage({ ...jobpage, lastdate: e.target.value })}
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="jobtype"
            name="jobtype"
            label="jobtype"
            value={jobpage.jobtype}
            onChange={(e) => setJobpage({ ...jobpage, jobtype: e.target.value })}
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
            value={jobpage.applylink}
            onChange={(e) => setJobpage({ ...jobpage, applylink: e.target.value })}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
