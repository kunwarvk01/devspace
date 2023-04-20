import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    // Extract data from the request body
    const { userId, description, picturePath } = req.body;

    // Find the user who created the post
    const user = await User.findById(userId);

    // Create a new Post instance with the extracted data
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    // Save the new post to the database
    await newPost.save();

    // Retrieve all posts from the database
    const post = await Post.find();

    // Send a response with the created post
    res.status(201).json(post);
  } catch (err) {
    // Send an error response if there was an error creating the post
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    // Retrieve all posts from the database
    const post = await Post.find().sort({ createdAt: -1 })

    // Send a response with all posts
    res.status(200).json(post);
  } catch (err) {
    // Send an error response if there was an error retrieving the posts
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    // Extract the user id from the request parameters
    const { userId } = req.params;

    // Retrieve all posts with the specified user id from the database
    const post = await Post.find({ userId }).sort({ createdAt: -1 });

    // Send a response with the retrieved posts
    res.status(200).json(post);
  } catch (err) {
    // Send an error response if there was an error retrieving the posts
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    // Extract the post id and user id from the request parameters and body, respectively
    const { id } = req.params;
    const { userId } = req.body;

    // Find the post with the specified id
    const post = await Post.findById(id);

    // Check if the user has already liked the post
    const isLiked = post.likes.get(userId);

    // Update the post's likes based on whether the user has already liked the post
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // Save the updated post to the database
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Send a response with the updated post
    res.status(200).json(updatedPost);
  } catch (err) {
    // Send an error response if there was an error updating the post
    res.status(404).json({ message: err.message });
  }
};
