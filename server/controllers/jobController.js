const job = require('../model/jobSchema');
const profile = require('../model/profileSchema');
const sendEmail = require('./jobemailController');
const user_w=require('../model/User')

const create = async (req, res) => {
  console.log(req.body);
  // Assuming email is directly available in req.body
  const recipientEmail = req.body.contact[1];
  const pro = new job(req.body);
  
  console.log("Recipient Email:", recipientEmail);

  try {
      const re = await pro.save();
      console.log(re);

      const users = await user_w.find(); // Retrieve all users from the user_ws schema
      const emailArray = users.map(user => user.email);
      console.log(emailArray);
      
      await sendEmail("", req.body, recipientEmail, "", recipientEmail);

      for (const email of emailArray) {
        await sendEmail("","the job is posted", email, "", recipientEmail);
    }
      res.status(200).send("success");
  } catch (error) {
      console.log(error);
      res.status(400).send("22222");
  }
}

// Rest of your code...

// const jobapply=async(req,res)=>{
//     try{
//         const 
//     }    
// }
const showjob = async (req, res) => {
  try {
    console.log(req.body)
      const aType = req.body.jobtype;
      const bType = req.body.locationtypes;
      const cType = req.body.locationonsite;
      const dType = req.body.company;
      
      let filter = {};
      // console.log(bType.length);
      // Check if any of the arrays have a size greater than 0
      if (aType.length > 0 || bType.length > 0 || cType.length > 0 || dType.length > 0) {
          filter = {
              $or: [
                  { jobtype: { $in: aType } },
                  { locationtypes: { $in: bType } },
                  { locationonsite: { $in: cType } },
                  { company: { $in: dType } },
               ],
          };
      }

      const jobs = await job.find(filter);
      const jobsWithExpirationStatus = jobs.map(job => {
        return {
          ...job.toObject(),  // Convert Mongoose document to plain JavaScript object
          isExpired: job.isExpired,  // Add isExpired property
        };
      });
       res.status(200).send(jobsWithExpirationStatus);
      } catch (error) {
      console.log(error);
      res.status(400).send("Error fetching jobs");
  }
};



const myjob = async (req, res) => {
    try {
      const jobberId = req.body.jobberid; // Access jobberid from the request body
      console.log(jobberId); 
      const jobs = await job.find({ jobberid: jobberId }); // Search for jobs with the given jobberid
      console.log(jobs);
      res.status(200).json(jobs);
    } catch (error) {
      console.log(error);
      res.status(400).send("Failed to retrieve job data");
    }
  };
  const     Application = async (req, res) => {
    try {
      const jobId = req.body.jobid; // Access jobid from the request body
      console.log(jobId); 
      const jobs = await profile.find({ jobid: jobId }); 
      console.log(jobs);
      res.status(200).json(jobs);
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
         
        console.log(uniqueLocations);
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
module.exports={create,showjob,myjob,Application,location,company,myjobapplication,FormSubmitted}
