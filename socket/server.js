import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();



const onlineUsers = new Map();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:3000",
            "https://chat-app-wine-six-20.vercel.app"
        ],
    },
});

io.on("connection", (socket) => {
    socket.on("register", (userId) => {
        onlineUsers.set(userId, socket.id);

        console.log(onlineUsers);
    });

    socket.on("disconnect", () => {
        for (const [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                break;
            }
        }

        console.log("Disconnected:", socket.id);
        console.log(onlineUsers);
    });

    socket.on("send-message", (message) => {
        const receiverSocket = onlineUsers.get(message.receiver);
        if (receiverSocket) {
            io.to(receiverSocket).emit("receive-message", message);
        } else {
        }
    });
});
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Socket Server Running on ${PORT}`);
});