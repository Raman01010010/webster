const User = require('../model/User.js');
const Endorse = require('../model/endorseSchema.js');

exports.fetchEndorse = async (req, res) => {
  try {
    const email = req.body.email;
    const skill = req.body.skill;

    // Use findOne instead of find if you expect only one result
    const endorsement = await Endorse.findOne({ EndorsedEmail: email, EndorseSkill: skill });

    if (endorsement) {
      // If endorsement is found, send the endorsing email(s)
      res.send(endorsement.EndorsingEmail);
    } else {
      // If no endorsement is found, send an appropriate response
      res.send('No endorsements found for the given email and skill');
    }
  } catch (error) {
    console.error('Error fetching endorsements:', error);
    res.status(500).send('Internal Server Error');
  }
};
