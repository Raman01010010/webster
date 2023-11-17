import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import Button from "@mui/material/Button";
import { useContext } from 'react';
import { User } from '../context/User';
import Previewresume from './Previewresume'
import Preview2 from './Preview2'
import Image from './pexels-lukas-590016.jpg'; // Update the file path accordingly
import { styled } from '@mui/system';

import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { cyan } from '@mui/material/colors';



const skillsList = [
  'HTML',
  'CSS',
  'JavaScript',
  'Java',
  'C++',
  'Kotlin',
  'Python',
  'React',
  'Node.js',
  'Angular',
  'Vue.js',
  'Git',
  'SQL',
  'MongoDB',
  'Express.js',
  'Redux',
  'TypeScript',
  'Bootstrap',
  'Sass',
  'Docker',
  // Add more skills as needed
];

function CustomTabPanel(props) {
  const { value, index, tabWidth, handleChange } = props;
  const {inputValues,setInputValues}=useContext(User)

  const {accordionItems,setAccordionItems}=useContext(User)
  const {accordionItems2,setAccordionItems2}=useContext(User)


  const handleInputChange = (name, value) => {

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  
  const addAccordion = () => {
    const newAccordion = { id: Date.now(), content: '', isOpen: false };
    setAccordionItems([...accordionItems, newAccordion]);
  };

 const deleteAccordion = (id) => {
  const updatedAccordions = accordionItems.filter((item) => item.id !== id);
  setAccordionItems(updatedAccordions);
};

const toggleAccordion = (id) => {
  const updatedAccordions = accordionItems.map((item) =>
    item.id === id ? { ...item, isOpen: !item.isOpen } : item
  );
  setAccordionItems(updatedAccordions);
};





const addAccordion2 = () => {
  const newAccordion = { id: Date.now(), content: '', isOpen: false };
  setAccordionItems2([...accordionItems2, newAccordion]);
};

const deleteAccordion2 = (id) => {
const updatedAccordions = accordionItems2.filter((item) => item.id !== id);
setAccordionItems2(updatedAccordions);
};

const toggleAccordion2 = (id) => {
const updatedAccordions = accordionItems2.map((item) =>
  item.id === id ? { ...item, isOpen: !item.isOpen } : item
);
setAccordionItems2(updatedAccordions);
};
console.log(accordionItems[0].company);

  return (
    <>
        <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ width: tabWidth }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
        <Typography style={{ color: '#000000' }}>
  {index === 0 && (
    <Grid container spacing={2}>
      {/* Left Column */}
      <Grid item xs={6}>
        <TextField style={{ color: '#000000' }}
          label="Full Name"
          variant="standard"
          fullWidth
          name="fullName"
          value={inputValues.fullName}
          onChange={(e) => {
            handleInputChange(e.target.name, e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Role"
          variant="standard"
          fullWidth
          name="role"
          value={inputValues.role}
          onChange={(e) => {
            handleInputChange(e.target.name, e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Email"
          variant="standard"
          fullWidth
          name="email"
          value={inputValues.email}
          onChange={(e) => {
            handleInputChange(e.target.name, e.target.value);
          }}
        />
      </Grid>

      {/* Right Column */}
      <Grid item xs={6}>
        <TextField
          label="Phone"
          variant="standard"
          fullWidth
          name="phone"
          value={inputValues.phone}
          onChange={(e) => {
            handleInputChange(e.target.name, e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Address"
          variant="standard"
          fullWidth
          name="address"
          value={inputValues.address}
          onChange={(e) => {
            handleInputChange(e.target.name, e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="LinkedIn"
          variant="standard"
          fullWidth
          name="linkedin"
          value={inputValues.linkedin}
          onChange={(e) => {
            handleInputChange(e.target.name, e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Image"
          variant="standard"
          fullWidth
          name="image"
          value={inputValues.image}
          onChange={(e) => {
            handleInputChange(e.target.name, e.target.value);
          }}
        />
      </Grid>
    </Grid>
  )}
  {index === 1 && (
  <Grid container spacing={2}>
    {/* Left Column */}
    <Grid item xs={6}>
    <TextField
      label="Degree 1 Name"
      variant="standard"
      fullWidth
      name="degree1Name"
      value={inputValues.education[0].degreeName}
      onChange={(e) => {
        handleInputChange('education', [
          { ...inputValues.education[0], degreeName: e.target.value },
          inputValues.education[1],
        ]);
      }}
    />
  </Grid>


    <Grid item xs={6}>
      <TextField
        label="School 1 Name"
        variant="standard"
        fullWidth
        name="school1Name"
        value={inputValues.education[0].schoolName}
        onChange={(e) => {
          handleInputChange('education', [
            { ...inputValues.education[0], schoolName: e.target.value },
            inputValues.education[1],
          ]);        }}
      />
    </Grid>
    <Grid item xs={4}>
      <TextField
        label="Start Date 1"
        variant="standard"
        fullWidth
        name="startDate1"
        value={inputValues.education[0].startDate}
        onChange={(e) => {
          handleInputChange('education', [
            { ...inputValues.education[0], startDate: e.target.value },
            inputValues.education[1],
          ]);        }}
      />
    </Grid>
    <Grid item xs={4}>
      <TextField
        label="End Date 1"
        variant="standard"
        fullWidth
        name="endDate1"
        value={inputValues.education[0].endDate}
        onChange={(e) => {
          handleInputChange('education', [
            { ...inputValues.education[0], endDate: e.target.value },
            inputValues.education[1],
          ]);        }}
      />
    </Grid>
    <Grid item xs={4}>
      <TextField
        label="Grade 1"
        variant="standard"
        fullWidth
        name="grade1"
        value={inputValues.education[0].grade}
        onChange={(e) => {
          handleInputChange('education', [
            { ...inputValues.education[0], grade: e.target.value },
            inputValues.education[1],
          ]);
        }}
      />
    </Grid>

    {/* Right Column */}
    <Grid item xs={6}>
      <TextField
        label="Degree 2 Name"
        variant="standard"
        fullWidth
        name="degree2Name"
        value={inputValues.education[1].degreeName}
        onChange={(e) => {
          handleInputChange('education', [
            inputValues.education[0],
            { ...inputValues.education[1], degreeName: e.target.value },
          ]);        }}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        label="School 2 Name"
        variant="standard"
        fullWidth
        name="school2Name"
        value={inputValues.education[1].schoolName}
        onChange={(e) => {
          handleInputChange('education', [
            inputValues.education[0],
            { ...inputValues.education[1], schoolName: e.target.value },
          ]);        }}
      />
    </Grid>
    <Grid item xs={4}>
      <TextField
        label="Start Date 2"
        variant="standard"
        fullWidth
        name="startDate2"
        value={inputValues.education[1].startDate}
        onChange={(e) => {
          handleInputChange('education', [
            inputValues.education[0],
            { ...inputValues.education[1], startDate: e.target.value },
          ]);        }}
      />
    </Grid>
    <Grid item xs={4}>
      <TextField
        label="End Date 2"
        variant="standard"
        fullWidth
        name="endDate2"
        value={inputValues.education[1].endDate}
        onChange={(e) => {
          handleInputChange('education', [
            inputValues.education[0],
            { ...inputValues.education[1], endDate: e.target.value },
          ]);
        }}
      />
    </Grid>
    <Grid item xs={4}>
      <TextField
        label="Grade 2"
        variant="standard"
        fullWidth
        name="grade2"
        value={inputValues.education[1].grade}
        onChange={(e) => {
          handleInputChange('education', [
            inputValues.education[0],
            { ...inputValues.education[1], grade: e.target.value },
          ]);
        }}
      />
    </Grid>
  </Grid>
  
)}
{index===2 &&(
  <Autocomplete
          multiple
          id="size-small-standard-multi"
          size="small"
          options={skillsList}
          value={inputValues.skill}
          onChange={(event, newValue) => {

           // setSelectedSkills(newValue);
            setInputValues(old=>{
              // console.log("Updating skill to:", newValue);

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
              label="Skills"
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
)}
{
  index===3 &&(
    <div>
          {accordionItems.map((accordion) => (
            <Accordion key={accordion.id} expanded={accordion.isOpen} onChange={() => toggleAccordion(accordion.id)}>
            <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${accordion.id}-content`}
                      id={`panel${accordion.id}-header`}
                    >
                      <Typography>Accordion {accordion.id}</Typography>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent toggling accordion
                          deleteAccordion(accordion.id);
                        }}
                        color="secondary"
                      >
                        Delete
                      </Button>
                    </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Position"
                      variant="standard"
                      fullWidth
                      name={`position${accordion.id}`}
                      value={accordion.position || ''}
                      onChange={(e) => {
                        // Update the position in the accordion
                        const updatedAccordions = accordionItems.map((item) =>
                          item.id === accordion.id ? { ...item, position: e.target.value } : item
                        );
                        setAccordionItems(updatedAccordions);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Company"
                      variant="standard"
                      fullWidth
                      name={`company${accordion.id}`}
                      value={accordion.company || ''}
                      onChange={(e) => {
                        // Update the company in the accordion
                        const updatedAccordions = accordionItems.map((item) =>
                          item.id === accordion.id ? { ...item, company: e.target.value } : item
                        );
                        setAccordionItems(updatedAccordions);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Employment Type"
                      variant="standard"
                      fullWidth
                      name={`employmentType${accordion.id}`}
                      value={accordion.employmentType || ''}
                      onChange={(e) => {
                        // Update the employment type in the accordion
                        const updatedAccordions = accordionItems.map((item) =>
                          item.id === accordion.id ? { ...item, employmentType: e.target.value } : item
                        );
                        setAccordionItems(updatedAccordions);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Start Date"
                      variant="standard"
                      fullWidth
                      name={`startDate${accordion.id}`}
                      value={accordion.startDate || ''}
                      onChange={(e) => {
                        // Update the start date in the accordion
                        const updatedAccordions = accordionItems.map((item) =>
                          item.id === accordion.id ? { ...item, startDate: e.target.value } : item
                        );
                        setAccordionItems(updatedAccordions);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="End Date"
                      variant="standard"
                      fullWidth
                      name={`endDate${accordion.id}`}
                      value={accordion.endDate || ''}
                      onChange={(e) => {
                        // Update the end date in the accordion
                        const updatedAccordions = accordionItems.map((item) =>
                          item.id === accordion.id ? { ...item, endDate: e.target.value } : item
                        );
                        setAccordionItems(updatedAccordions);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      variant="standard"
                      fullWidth
                      multiline
                      rows={4}
                      name={`description${accordion.id}`}
                      value={accordion.description || ''}
                      onChange={(e) => {
                        // Update the description in the accordion
                        const updatedAccordions = accordionItems.map((item) =>
                          item.id === accordion.id ? { ...item, description: e.target.value } : item
                        );
                        setAccordionItems(updatedAccordions);
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button onClick={addAccordion} color="primary">
            Add Accordion
          </Button>
        </div>

  )
}
{index===4 &&(
    <div>
    {accordionItems2.map((accordion) => (
            <Accordion key={accordion.id} expanded={accordion.isOpen} onChange={() => toggleAccordion2(accordion.id)}>
            <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${accordion.id}-content`}
                      id={`panel${accordion.id}-header`}
                    >
                      <Typography>Accordion {accordion.id}</Typography>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent toggling accordion
                          deleteAccordion2(accordion.id);
                        }}
                        color="secondary"
                      >
                        Delete
                      </Button>
                    </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Project Name"
                      variant="standard"
                      fullWidth
                      name={`projectname${accordion.id}`}
                      value={accordion.projectname || ''}
                      onChange={(e) => {
                        // Update the position in the accordion
                        const updatedAccordions = accordionItems2.map((item) =>
                          item.id === accordion.id ? { ...item, projectname: e.target.value } : item
                        );
                        setAccordionItems2(updatedAccordions);
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      variant="standard"
                      fullWidth
                      multiline
                      rows={4}
                      name={`description${accordion.id}`}
                      value={accordion.description || ''}
                      onChange={(e) => {
                        // Update the description in the accordion
                        const updatedAccordions = accordionItems2.map((item) =>
                          item.id === accordion.id ? { ...item, description: e.target.value } : item
                        );
                        setAccordionItems2(updatedAccordions);
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
          <Button onClick={addAccordion2} color="primary">
            Add Accordion
          </Button>
        </div>

)}
</Typography>

        </Box>
      )}
    </div>
    
    </>
  );
}

CustomTabPanel.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  tabWidth: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired, // Include handleChange in propTypes
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Resume() {
  const {inputValues,setInputValues}=useContext(User)

  const {accordionItems,setAccordionItems}=useContext(User)
  const {accordionItems2,setAccordionItems2}=useContext(User)


 
  const [value, setValue] = React.useState(0);
  const tabWidth = '50%'; // Set the desired width for the tabs

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const BlurredBackground = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    filter: 'blur(0px)', // Adjust the blur amount as needed
    zIndex: -1,
  });
  return (
    <div className=''>
     <div>
<BlurredBackground>
  <img src={Image} alt="Your Alt Text" style={{ width: '100%', height: 'auto' }} />
</BlurredBackground>
      <Box className="" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%',height: '100vh' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" indicatorColor="primary">
            <Tab label="About" style={{ width:'20%'  }} />
            <Tab label="Education" style={{width:'20%'  }} />
            <Tab label="Skill" style={{width:'20%' }} />
            <Tab label="Work" style={{width:'20%' }} />
            <Tab label="Projects" style={{width:'20%' }} />
          </Tabs>
        </Box>
      <CustomTabPanel value={value} index={0} handleChange={handleChange}>
        About Content
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} handleChange={handleChange}>
        Education Content
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} handleChange={handleChange}>
        <Autocomplete
          multiple
          options={skillsList}
          value={inputValues.skill}
          onChange={(event, newValue) => {
            setInputValues((old) => ({
              ...old,
              skill: [...newValue],
            }));
          }}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Skills" placeholder="Add more Skills" />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip label={option} size="small" color="primary" {...getTagProps({ index })} />
            ))
          }
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3} handleChange={handleChange}>
        Work Content
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4} handleChange={handleChange}>
        Projects Content
      </CustomTabPanel>
    </Box>
    <Previewresume/>
    <Preview2/>
    </div>
  </div>
  );
}
