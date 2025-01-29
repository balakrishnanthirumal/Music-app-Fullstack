import { Server } from "socket.io";
import { Message } from "../models/messageModel.js";
import { Socket } from "dgram";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    coors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  const userSockets = new Map(); // {userId: socketId}
  const userActivities = new Map(); //{userId: activvity}

  io.on("connection", (socket) => {
    socket.on("user_connected", (userId) => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, "Idle");

      //broadcast to all connected sockets that this user logged in

      io.emit("user-connected", userId);

      socket.emit("users_online", Array.from(userSockets.keys()));
      io.emit("activities", Array.from(userActivities.entries()));
    });

    socket.on("update_activity", ({ userId, activity }) => {
      console.log("activity updated", userId, activity);
      userActivities.set(userId, activity);
      io.emits("activity_updated", { userId, activity });
    });

    socket.on("send_message", async (data) => {
      try {
        const { senderId, recieverId, content } = data;
        const message = await Message.create({
          senderId,
          recieverId,
          content,
        });

        //send to reciver in realtime if in online

        const recieverSocketid = userSockets.get(recieverId);

        if (recieverSocketid) {
          io.to(recieverSocketid).emit("receive_message", message);
        }

        socket.emit("message_sent", message);
      } catch (error) {
        console.error("Message error", error);
      }
    });

    socket.on("disconnect", () => {
      let disconnectedUserId;
      for (const [userId, socketId] of userSockets.entries()) {
        // find disconnected user
        if (socketId == socket.id) {
          disconnectedUserId = userId;
          userSockets.delete(userId);
          userActivities.delete(userId);
          break;
        }
      }

      if (disconnectedUserId) {
        io.emit("user_disconnected", disconnectedUserId);
      }
    });
  });
};
