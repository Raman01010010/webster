const profile = require('../model/profileSchema');
const  {sendNotification}  = require('./notifController');

const jobs = require('../model/jobSchema');

const naukari = async (req, res) => {
    console.log("6666");
    console.log(req.body);

    const pro = new profile(req.body);

    try {
        const userId = req.body.userID;
        const jobId = req.body.jobid;
        const re = await pro.save();
        console.log("Profile saved");

        // Find the job by its _id
        const job = await jobs.findOne({ _id: jobId });
console.log("vive2"+job)
        if (!job) {
            console.log("Job not found");
            return res.status(400).send("Job not found");
        }

        // Add the userId to the applicants array
        
        job.applicants.push(userId);
        await sendNotification(job.jobberid, `A person applied on your job `, '', 'job', res);

        // Save the updated job document
        await job.save();

        console.log("Job updated with applicant");
        console.log(job);

        res.status(200).send("success");
    } catch (error) {
        console.log(error);
        console.log("Failed to update job with applicant");
        res.status(400).send("failed");
    }
};

module.exports = { naukari };
