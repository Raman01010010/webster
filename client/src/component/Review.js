
import React from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from '@mui/material';

const Review = (props) => {
        const {name,email,phone,place,additionalQuestions,location}=props;

  const user = {
    resume: 'Webster 2k23 Abstract Format-1.pdf',
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Avatar src="user-avatar.jpg" alt="User Avatar" />

           <Typography variant="h5">{name}</Typography>
           <Typography variant="subtitle1">{place}</Typography>

           <Typography variant="h6">Contact Information</Typography>
           <Typography variant="body2">Email: {email}</Typography>
           <Typography variant="body2">Phone: {phone}</Typography>

           <Typography variant="h6">Resume</Typography>
           <Typography variant="body2">Resume: {user.resume}</Typography>
           <Button variant="outlined">View</Button>

           <Typography variant="h6">Additional Questions</Typography>
           <FormControl component="fieldset">
            <FormLabel component="legend">
            What is your level of proficiency in English?
            </FormLabel>
            <RadioGroup
              aria-label="l"
              name="What is your level of proficiency in English?"
              value={additionalQuestions[0]}
              onChange={(e) => console.log(e.target.value)}
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
           
          <FormControl component="fieldset">
            <FormLabel component="legend">
            Are you willing to undergo a background check, in accordance
                  with local law/regulations?Are you willing to undergo a
                  background check, in accordance with local law/regulations?            </FormLabel>
            <RadioGroup
              aria-label="highSchoolDiploma"
              name="highSchoolDiploma"
              value={additionalQuestions[1]}
              onChange={(e) => console.log(e.target.value)}
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

          <FormControl component="fieldset">
            <FormLabel component="legend">
              Are you comfortable commuting to this job's location?
            </FormLabel>
            <RadioGroup
              aria-label="commuting"
              name="commuting"
              value={additionalQuestions[2]}
              onChange={(e) => console.log(e.target.value)}
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

          <Typography variant="h6">Work Authorization</Typography>

          <FormControl component="fieldset">
            <FormLabel component="legend">
              We must fill this position urgently. Can you start immediately?
            </FormLabel>
            <RadioGroup
              aria-label="immediateStart"
              name="immediateStart"
              value={location}
              onChange={(e) => console.log(e.target.value)}
            >
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="No"
                control={<Radio/>}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Review;
