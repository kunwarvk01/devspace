import User from "../models/User.js";

/* READ */
// Retrieves a user by ID from the database
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Retrieves a user's friends by ID from the database
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Formats the friend objects to only include specific properties
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
// Adds or removes a friend from a user's friend list
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      // Removes the friend from the user's friend list
      user.friends = user.friends.filter((id) => id !== friendId);
      // Removes the user from the friend's friend list
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      // Adds the friend to the user's friend list
      user.friends.push(friendId);
      // Adds the user to the friend's friend list
      friend.friends.push(id);
    }

    // Saves the updated user and friend objects to the database
    await user.save();
    await friend.save();

    // Retrieves the updated friend objects from the database
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Formats the friend objects to only include specific properties
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
