const User = require("../model/User.js");
const connectSchema = require("../model/connectSchema.js");
const Connection = connectSchema;
const Endorse = require("../model/endorseSchema.js");
const PostSchema = require("../model/postSchema.js");
const { sendNotification } = require("./notifController");

exports.sendMessagerequest = async (req, res) => {};

exports.acceptrequest = async (req, res) => {
  try {
    const { senderEmail, receiverEmail } = req.body;
    //  console.log(senderEmail)
    // Find the connection
    const con = await Connection.findOne({
      senderEmail: senderEmail,
      receiverEmail: receiverEmail,
    });

    if (!con) {
      return res.status(404).json({ error: "Connection not found" });
    }

    // Update the connection to set isConnected to true
    con.isConnected = true;
    await con.save();

    // Update the "myConnections" field in the User schema for both sender and receiver
    const senderUser = await User.findOne({ email: senderEmail });
    const receiverUser = await User.findOne({ email: receiverEmail });

    if (!senderUser || !receiverUser) {
      return res.status(404).json({ error: "User not found" });
    }

    senderUser.connection.push(receiverEmail);
    receiverUser.connection.push(senderEmail);

    await senderUser.save();
    await receiverUser.save();
    await sendNotification(
      senderUser._id,
      `${receiverUser.username} accepted your connection request`,
      "",
      "connect",
      res
    );

    // Delete the connection from the connectSchema
    await Connection.findOneAndDelete({
      senderEmail: senderEmail,
      receiverEmail: receiverEmail,
    });

    res.json({ message: "Request accepted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while accepting the request" });
  }
};

exports.addeducation = async (req, res) => {
  try {
    const { institute, degree, year, email } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add new education to the array
    const newEducation = { org: institute, degree: degree, time: year };
    user.education.push(newEducation);

    await user.save();
    res.json({ message: "Education added successfully", user });
  } catch (error) {
    console.error("Error adding education:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addproject = async (req, res) => {
  try {
    const { name, tech, link, email } = req.body;

    // Use await to resolve the promise returned by User.find
    const user = await User.findOne({ email: email });

    if (user) {
      // Use updateOne to update the document in the database
      await User.updateOne(
        { email: email },
        {
          $push: {
            projects: {
              name: name,
              tech: tech,
              link: link,
            },
          },
        }
      );

      res.status(200).json({ message: "Project added successfully" });
    } else {
      // Handle the case where the user is not found
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addingSkill = async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const newSkill = req.body.editSkills;

    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      { $push: { skills: newSkill } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Skill added successfully", user: updatedUser });
  } catch (error) {
    console.error("Error adding skill:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.connection = async (req, res) => {
  const data = req.body;
  console.log(data);
  res.status(200).json(data);

  const newUser = data.newUser;
  const otheruser = data.otheruser;
  const receiver = await User.findOne({ email: otheruser });
  const sender = await User.findOne({ email: newUser });

  const receiverid = receiver._id;
  const a = await Connection.find({
    senderEmail: newUser,
    receiverEmail: otheruser,
  });
  if (a.length == 0) {
    const prd = new Connection({
      senderEmail: newUser,
      receiverEmail: otheruser,
      isConnected: false,
      connectionTime: Date.now(),
    });

    prd
      .save()
      .then((doc) => {
        console.log(doc);
      })

      .catch((err) => {
        console.error(err);
      });
    await sendNotification(
      receiverid,
      `${sender.username} sent you a friend request`,
      "",
      "connect",
      res
    );
  }
};

exports.deleteConnection = async (req, res) => {
  const data = req.body;
  const newUseremail = data.newUser;
  const otheruseremail = data.otheruser;

  const newUser = await User.findOne({ email: newUseremail });

  if (!newUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const otherUser = await User.findOne({ email: otheruseremail });

  if (!otherUser) {
    return res.status(404).json({ message: "User not found" });
  }

  // Delete newUseremail from otherUser's connection
  const updatedConnectionOtherUser = otherUser.connection.filter(
    (email) => email !== newUseremail
  );
  otherUser.connection = updatedConnectionOtherUser;

  // Delete otheruseremail from newUser's connection
  const updatedConnectionNewUser = newUser.connection.filter(
    (email) => email !== otheruseremail
  );
  newUser.connection = updatedConnectionNewUser;

  try {
    await newUser.save();
    await otherUser.save();
    return res.status(200).json({ message: "Connection deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while updating the connection", error });
  }
};

exports.deletingSkill = async (req, res) => {
  try {
    const index = req.body.index;
    const newUserEmail = req.body.userEmail;

    // Find the user based on the email
    const user = await User.findOne({ email: newUserEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the index is within the bounds of the array
    if (index < 0 || index >= user.skills.length) {
      return res.status(400).json({ message: "Invalid skill index" });
    }

    // Remove the skill at the specified index
    user.skills.splice(index, 1);

    // Save the updated user
    const updatedUser = await user.save();

    res
      .status(200)
      .json({ message: "Skill deleted successfully", user: updatedUser });
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.endorseSkill = async (req, res) => {
  try {
    const skill = req.body.skill;
    const userEmail = req.body.userEmail;
    const otheruserEmail = req.body.otheruserEmail;

    // Check if there are existing endorsements for the given skill and user
    const existingEndorsements = await Endorse.find({
      EndorsedEmail: otheruserEmail,
      EndorseSkill: skill,
    });

    if (existingEndorsements.length === 0) {
      // If no existing endorsements, create a new endorsement
      const newEndorsement = new Endorse({
        EndorsingEmail: [userEmail], // Start with an array containing the current user
        EndorsedEmail: otheruserEmail,
        EndorseSkill: skill,
        connectionTime: new Date(),
      });

      // Save the new endorsement to the database
      await newEndorsement.save();
    } else {
      // If there are existing endorsements, update the EndorsingEmail array
      const existingEndorsement = existingEndorsements[0]; // Assuming you only want to update the first matching endorsement
      existingEndorsement.EndorsingEmail.push(userEmail);

      // Save the updated endorsement to the database
      await existingEndorsement.save();
    }

    // Respond with success
    res.status(200).json({ message: "Endorsement saved successfully" });
  } catch (error) {
    console.error("Error endorsing skill:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.particularjob = async (req, res) => {
  const email = req.body.email;

  try {
    // Find the user with the specified email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const userId = user._id;

    // Find jobs for the user based on their id
    const jobs = await Job.find({ jobberid: userId });

    res.send(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.myconnection = async (req, res) => {
  const newUserEmail = req.body.newUser;

  try {
    const user = await User.findOne({ email: newUserEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const connections = user.connection;

    try {
      // Find all users whose email is in the connections array
      const connectionData = await User.find({ email: { $in: connections } });
      return res.status(200).json(connectionData);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching connection data" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching connections" });
  }
};

exports.fetching = async (req, res) => {
  try {
    const userEmail = req.body.email; // Assuming the email is passed in the request body

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If the user is found, you can send the user data in the response
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.fetchEndorse = async (req, res) => {
  try {
    const email = req.body.email;
    const skill = req.body.skill;

    // Use findOne instead of find if you expect only one result
    const endorsement = await Endorse.findOne({
      EndorsedEmail: email,
      EndorseSkill: skill,
    });

    if (endorsement) {
      // If endorsement is found, send the endorsing email(s)
      res.send(endorsement.EndorsingEmail);
    } else {
      // If no endorsement is found, send an appropriate response
      res.send("No endorsements found for the given email and skill");
    }
  } catch (error) {
    console.error("Error fetching endorsements:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getEducation = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const education = user.education || [];

    res.json(education);
  } catch (err) {
    console.error("Error fetching education:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getpost = async (req, res) => {
  try {
    const email = req.body.email;
    // console.log(email);
    // Use await to wait for the asynchronous operation
    const posts = await PostSchema.find({ email: email });

    // Send the posts as a response
    res.json(posts);
  } catch (err) {
    // Handle errors and send an error response
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getproject = async (req, res) => {
  try {
    const email = req.body.email;

    // Use await to wait for the asynchronous operation
    const user = await User.findOne({ email: email });

    // Check if the user is found and if the projects property exists
    if (user && user.projects) {
      const projects = user.projects;
      res.send(projects);
    } else {
      // Handle the case when the user or projects property is not found
      res.status(404).json({ error: "User or projects not found" });
    }
  } catch (err) {
    // Handle errors and send an error response
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.pending = async (req, res) => {
  try {
    const newuser = req.body.newUser;

    const connections = await connectSchema.find({ receiverEmail: newuser });

    res.send(connections);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching pending connections" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const emailToExclude = req.body.email;

    // Using $ne (not equal) in the query to exclude users with the specified email
    const users = await User.find({ email: { $ne: emailToExclude } });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchname = async (req, res) => {
  try {
    // Assuming the search input is in req.body.searchInput
    const searchInput = req.body.searchInput;

    // Use a regular expression to perform a case-insensitive search on the 'username' field
    const regex = new RegExp(searchInput, "i");
    const matchingUsers = await User.find(
        { username: regex },   // Query criteria
        "username email"      // Projection
      );
    
    // Extract usernames from the matchingUsers array
    const matchedUsernames = matchingUsers.map((user) => ({
      username: user.username,
      email: user.email,
    }));

    // Send a successful response with the array of matching usernames
    res.status(200).json({ matchedUsernames });
  } catch (error) {
    console.error("Error processing searchname:", error);
    // Send an error response back to the client
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.alert = async (req, res) => {
  const userId = req.body.userId;
  const email = req.body.userEmail;
console.log(req.body);
  try {
    // Find the user by email
    const user = await User.findOne({ email:email });
    const sender = await User.findOne({ _id: userId });

    if (user) {

      const isUserIdPresent = user.alertedBy.includes(userId);
       console.log(isUserIdPresent)
      if (isUserIdPresent) {
        const index = user.alertedBy.indexOf(userId);
        if (index !== -1) {
          user.alertedBy.splice(index, 1);
        }

        const alertingToIndex = sender.alertingTo.indexOf(user._id);
        if (alertingToIndex !== -1) {
          sender.alertingTo.splice(alertingToIndex, 1);
        }
      } else {
        // Push the userId to the alertedBy array
        user.alertedBy.push(userId);
        sender.alertingTo.push(user._id);

      }

      // Save the changes
      await user.save();
      await sender.save();

      res.status(200).json({ success: true, message: "User alerted successfully" });
    } else {
      // If the user with the specified email is not found
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    // Handle any error that occurred during the process
    console.error("Error alerting user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
 
exports.getalert = async (req, res) => {
  const userId = req.body.userId; // Change from req.body.userId to req.query.userId

  try {
    // Find the user by userId
    const sender = await User.findOne({ _id: userId });
    console.log("here" + sender);

    if (sender) {
      // If the user is found, send the alertingTo array in the response
      res.status(200).json({ alertingTo: sender.alertingTo });
    } else {
      // If the user with the specified userId is not found
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    // Handle any error that occurred during the process
    console.error("Error retrieving alert information:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
