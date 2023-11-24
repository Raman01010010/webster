import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Box, Chip, Divider, Paper } from '@mui/material';
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import {Link } from 'react-router-dom';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const ParticularJob = () => {
  const [jobData, setJobData] = useState([]);
  const {email} = useParams()
  const axiosPrivate=useAxiosPrivate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const d = {
            email:email
        }
        //step4
        const response = await axiosPrivate.post('/connect/getparticularjob',d);
        setJobData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching Jobs:", error);
      }
     
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {jobData.map((job, index) => (
        <Card key={index} sx={{
          maxWidth: 400,
          margin: '16px',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
          backgroundColor: '#F0F6F1', 
        }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#1976D2', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.5rem', color: '#333' }}>{job.company}</span>
            </Typography>
            <Divider sx={{ margin: '8px 0' }} />
            <Typography variant="h6" sx={{ color: '#333', marginBottom: '8px' }}>
              Post Required: {job.titles}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#777', marginBottom: '8px' }}>
              {job.locationonsite}
            </Typography>
            <Typography variant="body1" sx={{ color: '#333', marginBottom: '16px' }}>
              {job.details}
            </Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <Typography variant="body1" sx={{ color: '#555', marginBottom: '8px' }}>
              <strong>Job Type:</strong> {job.jobtype}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', marginBottom: '16px' }}>
              {job.skill.map((skill, i) => (
                <Chip key={i} label={skill} sx={{ margin: '2px', backgroundColor: '#1976D2', color: 'white' }} />
              ))}
            </Box>
            <Divider sx={{ margin: '16px 0' }} />
            <Typography variant="body1" sx={{ color: '#555', marginBottom: '8px' }}>
              <strong>Contact:</strong>
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              Mobile: {job.contact[0]}
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              Email: {job.contact[1]}
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              Website: {job.contact[2]}
            </Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <Typography variant="body1" sx={{ color: '#555', marginBottom: '8px' }}>
              <strong>Application Deadline:</strong> {job.lastdate}
            </Typography>
            <Link to={`/job/${job._id}`}>
            <Button
              variant="contained"
              color="primary"
              href={job.applylink}
              
              target="_blank"
              sx={{ mt: 2, backgroundColor: '#1976D2', color: 'white', fontWeight: 'bold' }}
              
            >
              Apply Now
            </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ParticularJob;

