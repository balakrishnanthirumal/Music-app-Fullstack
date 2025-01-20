import { User } from "../models/userModel.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    console.log(req.body); // Debugging incoming data

    const user = await User.findOne({ clerkId: id }); // Use `findOne` instead of `find`

    if (!user) {
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving to database:", error); // Log the exact error
    res.status(500).json({ message: "Internal server error", error });
  }
};
