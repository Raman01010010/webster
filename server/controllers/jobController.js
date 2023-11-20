const job = require('../model/jobSchema');
const profile = require('../model/profileSchema');
const sendEmail = require('./jobemailController');
const user_w=require('../model/User')
const  {sendNotification}  = require('./notifController');
const jobcomment = require('../model/jobcommentSchema');

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




const Jobcomment = async (req, res) => {
  // Remove timestamp from req.body
  const { text, senderid, receiverid, jobid } = req.body;

  // Create a new jobcomment instance with the provided data
  const newJobComment = new jobcomment({
    text: text,
    senderid: senderid,
    receiverid: receiverid,
    jobid: jobid,
    // The 'timestamp' field will be automatically set to the current date and time
  });

  try {
    const savedComment = await newJobComment.save();
    console.log(savedComment);

    // Fetch all messages that match senderid and receiverid from the database
    const allMessages = await jobcomment.find({
      $or: [
        { senderid: senderid, receiverid: receiverid, jobid: jobid },
        { senderid: receiverid, receiverid: senderid, jobid: jobid },
      ],
    }).sort({ timestamp: 1 }); // Adjust the sorting based on your needs

    // Separate messages based on sender and receiver
    // const senderMessages = allMessages.filter(message => message.senderid === senderid);
    // const receiverMessages = allMessages.filter(message => message.receiverid === receiverid);

    // Include timestamp in each message
    // const formatMessages = (messages) => {
    //   return messages.map(message => {
    //     return {
    //       text: message.text,
    //       senderid: message.senderid,
    //       receiverid: message.receiverid,
    //       timestamp: message.timestamp,
    //     };
    //   });
    // };

    // const formattedSenderMessages = formatMessages(senderMessages);
    // const formattedReceiverMessages = formatMessages(receiverMessages);

    // console.log(formattedSenderMessages);
    // console.log(formattedReceiverMessages);

    res.status(200).json({
      success: true,
      allMessages: allMessages,
      
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed to save the comment to the database");
  }
};

const getJobComments = async (req, res) => {
  try {
    const {senderid,receiverid, jobid } = req.params; // Assuming the jobId is passed as a parameter

    // Fetch all job comments for the specified jobId
    const allMessages = await jobcomment.find({
      $or: [
        { senderid: senderid, receiverid: receiverid, jobid: jobid },
        { senderid: receiverid, receiverid: senderid, jobid: jobid },
      ],
    }).populate('senderid').populate('receiverid').sort({ timestamp: 1 }); // Adjust the sorting based on your needs

    // Separate messages based on sender and receiver
    // const senderMessages = allMessages.filter(message => message.senderid === senderid);
    // const receiverMessages = allMessages.filter(message => message.receiverid === senderid);

    // // Include timestamp in each message
    // const formatMessages = (messages) => {
    //   return messages.map(message => {
    //     return {
    //       text: message.text,
    //       senderid: message.senderid,
    //       receiverid: message.receiverid,
    //       timestamp: message.timestamp,
    //     };
    //   });
    // };

    // const formattedSenderMessages = formatMessages(senderMessages);
    // const formattedReceiverMessages = formatMessages(receiverMessages);

    // console.log(formattedSenderMessages);
    // console.log(formattedReceiverMessages);

    res.status(200).json({
      success: true,
      allMessages: allMessages,
      
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed to save the comment to the database");
  }
};

// locationonsite
module.exports={create,showjob,myjob,Application,location,company,myjobapplication,FormSubmitted,filterskill,Jobcomment,getJobComments}
