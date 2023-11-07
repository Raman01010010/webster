import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function Vreview({ data }) {
  
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review Your Information
      </Typography>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Job Title:</Typography>
            <Typography variant="body1">{data.titles}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Company Name:</Typography>
            <Typography variant="body1">{data.company}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Details of Company:</Typography>
            <Typography variant="body1">{data.details}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Location Type:</Typography>
            <Typography variant="body1">{data.locationtypes}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Location On-Site:</Typography>
            <Typography variant="body1">{data.locationonsite}</Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Last Date of Application:</Typography>
            <Typography variant="body1">{data.lastdate}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Job Type:</Typography>
            <Typography variant="body1">{data.jobtype}</Typography>
          </Grid>
          <Grid item xs={12}  sm={6}>
            <Typography variant="subtitle1">Skills Required:</Typography>
            {data.skill.map((skill, index) => (
              <Typography variant="body1" key={index}>
                {skill}
              </Typography>
            ))}
          </Grid>
         
          <Grid item xs={12}  sm={6}>
            <Typography variant="subtitle1">Apply Link:</Typography>
            <Typography variant="body1">{data.applylink}</Typography>
          </Grid>
          <Grid item xs={12}   sm={6}>
            <Typography variant="subtitle1">Contacts:</Typography>
            <Typography variant="body1">Phone: {data.contact[0]}</Typography>
            <Typography variant="body1">Email: {data.contact[1]}</Typography>
            <Typography variant="body1">Website: {data.contact[2]}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
}
