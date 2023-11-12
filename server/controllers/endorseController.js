const User = require('../model/User.js');
const Endorse = require('../model/endorseSchema.js');

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
        res.status(200).json({ message: 'Endorsement saved successfully' });
    } catch (error) {
        console.error('Error endorsing skill:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
