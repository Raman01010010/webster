const job = require('../model/jobSchema');
const profile = require('../model/profileSchema');
const sendEmail = require('./jobemailController');
const user_w=require('../model/User')
const  {sendNotification}  = require('./notifController');

const create = async (req, res) => {
  console.log(req.body);
  const recipientEmail = req.body.contact[1];
  const pro = new job(req.body);
  const skills = req.body.skill;
  console.log("Recipient Email:", recipientEmail);

  try {
    const re = await pro.save();
    console.log(re);

    // Retrieve users from the user_ws schema who have matching skills
    const users = await user_w.find({ skills: { $in: skills } });
    const emailArray = users.map((user) => user.email);
    console.log(emailArray);

    await sendEmail("", req.body, recipientEmail, "", recipientEmail);

    for (const email of emailArray) {
      await sendEmail("", "the job is posted", email, "", recipientEmail);
    }
    for (const user of users) {
      await sendNotification(user._id, 'New job posted', '', 'job', res);
    }

    res.status(200).send("success");
  } catch (error) {
    console.log(error);
    res.status(400).send("22222");
  }
};

const showjob = async (req, res) => {
  try {
    const aType = req.body.jobtype;
    const bType = req.body.locationtypes;
    const cType = req.body.locationonsite;
    const dType = req.body.company;
    const eType =req.body.skill;
    let filter = {};
    if (aType.length > 0 || bType.length > 0 || cType.length > 0 || dType.length > 0 ||eType.length>0) {
      filter = {
        $or: [
          { jobtype: { $in: aType } },
          { locationtypes: { $in: bType } },
          { locationonsite: { $in: cType } },
          { company: { $in: dType } },
          { skill: { $in: eType } },
        ],
      };
    }

    let sortedJobs = await job.find(filter);

    // Sort jobs based on the size of the 'applicants' field in descending order
    if (req.body.trend === 1) {
      sortedJobs = sortedJobs.sort((jobA, jobB) => jobB.applicants.length - jobA.applicants.length);
    }

    // Find jobs in trending
    const userId = req.body && req.body.userID;

    const jobsWithExpirationStatus = await Promise.all(
      sortedJobs.map(async (job) => {
        const jobObject = job.toObject();
        const hasApplied = job.applicants.includes(userId);

        // Add the hasApplied property to the job object
        const jobWithStatus = {
          ...jobObject,
          isExpired: job.isExpired,
          hasApplied: hasApplied,
        };

        return jobWithStatus;
      })
    );

    res.status(200).send({
      data: jobsWithExpirationStatus,
      message: "Job data retrieved successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Error fetching jobs." });
  }
};



const myjob = async (req, res) => {
    try {
      const jobberId = req.body.jobberid; // Access jobberid from the request body
      // console.log("vivekdmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm5");
    
      console.log(jobberId); 
      const jobs = await job.find({ jobberid: jobberId }); // Search for jobs with the given jobberid
      console.log(jobs);
      res.status(200).json(jobs);
    } catch (error) {
      console.log(error);
      res.status(400).send("Failed to retrieve job data");
    }
  };
  const Application = async (req, res) => {
    try {
      // Access jobid from the request body
      const aType = req.body.skill;
      const jobId = req.body.jobid;
      const bType = req.body.english;
  
      console.log(aType);
  
      let filter = {};
  
      if (aType.length > 0 || bType.length > 0) {
        filter = {
          $or: [
            { skill: { $in: aType } },
            { additionalQuestions: { $in: bType } },
          ],
        };
      }
  
      console.log(jobId);
  
      // Find profiles based on jobid
      const profiles = await profile.find({ jobid: jobId });
  
      // Filter profiles based on additional conditions
      const filteredProfiles = profiles.filter((profile) => {
        // Implement your filtering logic here
        return (
          (aType.length === 0 || profile.skill.some((skill) => aType.includes(skill))) &&
          (bType.length === 0 || profile.additionalQuestions.some((question) => bType.includes(question)))
        );
      });
  
      console.log(filteredProfiles);
      res.status(200).json(filteredProfiles);
    } catch (error) {
      console.log(error);
      res.status(400).send("Failed to retrieve job data");
    }
  };
  
  const location = async (req, res) => {
    try {
        const result = await job.find();

        // Extract unique locationonsite values
        const uniqueLocations = Array.from(new Set(result.map(item => item.locationonsite)));
         
        // console.log(uniqueLocations);
        res.status(200).send(uniqueLocations);
    } catch (error) {
        console.log(error);
        res.status(400).send("11111");
    }
};
const company = async (req, res) => {
  try {
      const result = await job.find();

      // Extract unique locationonsite values
      const uniqueCompany = Array.from(new Set(result.map(item => item.company)));

      console.log(uniqueCompany);
      res.status(200).send(uniqueCompany);
  } catch (error) {
      console.log(error);
      res.status(400).send("11111");
  }
};
const filterskill = async (req, res) => {
  try {
    const jobs = await job.find();

    // Extract unique skills from all jobs
    const allSkills = [...new Set(jobs.flatMap((job) => job.skill || []))];
    
    console.log(allSkills);

    res.status(200).send(allSkills);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


const myjobapplication = async (req, res) => {
  try {
    const userId = req.body.userid; 
    
    // Find all job applications made by the user
    const jobApplications = await profile.find({ userID: userId });
  console.log(jobApplications)
    // Extract job IDs from the job applications
    const jobIds = jobApplications.map(application => application.jobid);

    // Retrieve details of the jobs using the extracted job IDs
    const jobs = await job.find({ _id: { $in: jobIds } });

    // Log the jobs or any other necessary information
    // console.log(jobs);

    res.status(200).send(jobs);
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed to retrieve job data");
  }
};

const FormSubmitted = async (req, res) => {
  try {
    const  jobId = req.body.jobid; // Access jobid and userid from the request body
    const   userId = req.body.userid; 

    const jobs = await profile.find({ jobid: jobId, userID: userId }); 
    // console.log(jobs);
    res.status(200).send(jobs);
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed to retrieve job data");
  } 
 
};


// locationonsite
module.exports={create,showjob,myjob,Application,location,company,myjobapplication,FormSubmitted,filterskill}
