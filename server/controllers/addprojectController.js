const User = require('../model/User.js');

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
              link: link
            }
          }
        }
      );

      res.status(200).json({ message: 'Project added successfully' });
    } else {
      // Handle the case where the user is not found
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Error adding project:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
