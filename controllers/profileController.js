const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching profile' });
  }
};


exports.updateProfile = async (req, res) => {
  const { name, email, phone, bio, profileImage } = req.body;

  try {
    // Update the user profile, using the new profile picture URL if available
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, // Get the user by the ID from the authentication token
      {
        username: name,          // Update the name field
        email,         // Update the email field
        phone,         // Update the phone field
        bio,           // Update the bio field
        profileImage // Update the profile picture URL (from Cloudinary)
      },
      { new: true } // Return the updated user document
    );

    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send(updatedUser); // Send the updated user data back to the client
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send({ message: 'Error updating profile' }); // Return a server error message
  }
};
