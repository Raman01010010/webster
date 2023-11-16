const User = require('../model/User.js');

exports.getproject = async (req, res) => {
  try {
    const email = req.body.email;
    console.log(email);

    // Use await to wait for the asynchronous operation
    const user = await User.findOne({ email: email });

    // Check if the user is found and if the projects property exists
    if (user && user.projects) {
      const projects = user.projects;
      console.log(projects);
      res.send(projects);
    } else {
      // Handle the case when the user or projects property is not found
      console.log("User or projects not found");
      res.status(404).json({ error: "User or projects not found" });
    }
  } catch (err) {
    // Handle errors and send an error response
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
