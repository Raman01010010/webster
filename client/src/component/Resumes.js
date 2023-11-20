import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';

const Resumes = (props) => {
  const { open, onClose, resumeData } = props;
  console.log(resumeData);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Resume</DialogTitle>
      <DialogContent>
        <iframe
          title="Resume"
          src={resumeData}
          width="100%"
          height="500"
          frameBorder="0"
        ></iframe>
      </DialogContent>
    </Dialog>
  );
};

export default Resumes;
