import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  console.log(req.auth.userId);
  if (!req.auth.userId) {
    res.status(401).json({ message: "Unauthorised - you must be login" });
    return;
  }

  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      res.status(403).json({ message: "Unauthorised - you must be an admin" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
