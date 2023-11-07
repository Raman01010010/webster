import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import 'tailwindcss/tailwind.css';
import axios from "../api/axios";

const Showjob = () => {
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/job');
        setJobData(response.data);
      } catch (error) {
        console.error('Error fetching job data: ', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">
      {jobData.map((job, index) => (
        <Card key={index} className="w-80 mx-auto p-4 border border-gray-200 rounded-lg shadow-md">
          <CardContent>
            <Typography variant="h6" className="font-semibold">
              {job.titles}
            </Typography>
            <Typography variant="subtitle1" className="text-gray-500">
              {job.company} - {job.locationonsite}
            </Typography>
            <Typography variant="body2" className="mt-2">
              {job.details}
            </Typography>
            <Typography variant="body2" className="mt-2">
              <strong>Job Type:</strong> {job.jobtype}
            </Typography>
            <Typography variant="body2" className="mt-2">
              <strong>Skills Required:</strong> {job.skill.join(', ')}
            </Typography>
            <Typography variant="body2" className="mt-2">
              <strong>Contact:</strong>
              <br />
              Mobile: {job.contact[0]}
              <br />
              Email: {job.contact[1]}
              <br />
              Website: {job.contact[2]}
            </Typography>
            <Typography variant="body2" className="mt-2">
              <strong>Application Deadline:</strong> {job.lastdate}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href={job.applylink}
              target="_blank"
              className="mt-4"
            >
              Apply Now
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Showjob;
