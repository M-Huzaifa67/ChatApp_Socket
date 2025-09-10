const { messages } = require("../models/messages");
const { users } = require("../models/users");

function initSocket(io) {
    io.on("connection", (socket) => {
        console.log("✅ User connected:", socket.id);

        // Register user
        socket.on("registerUser", ({ userId, username }) => {
            let existing = users.find(u => u.userId === userId);
            if (existing) {
                existing.online = true;
                existing.socketId = socket.id;
            } else {
                users.push({ userId, username, online: true, socketId: socket.id });
            }
            console.log(`👤 ${username} registered & online`);

            // notify everyone user list changed
            io.emit("usersUpdated", users);
        });

        // Join private 1-to-1 room
        socket.on("joinPrivateChat", ({ userId1, userId2 }) => {
            const roomId = [userId1, userId2].sort().join("_");
            socket.join(roomId);
            console.log(`📌 ${userId1} joined private room with ${userId2}`);
        });

        // Get previous messages
        socket.on("getPrivateMessages", ({ sender, receiver }) => {
            const roomId = [sender, receiver].sort().join("_");

            const chatHistory = messages.filter(
                (msg) => [msg.sender, msg.receiver].sort().join("_") === roomId
            );

            socket.emit("privateChatHistory", chatHistory);
        });

        // Send private message
        socket.on("sendPrivateMessage", ({ sender, receiver, text }) => {
            const roomId = [sender, receiver].sort().join("_");

            const message = {
                id: Date.now().toString(),
                sender,
                receiver,
                text,
                timestamp: new Date(),
            };

            messages.push(message);
            io.to(roomId).emit("newPrivateMessage", message);

            // update lastMessage for both sender & receiver
            [sender, receiver].forEach(uid => {
                const user = users.find(u => u.userId === uid);
                if (user) user.lastMessage = text;
            });
            
            io.emit("usersUpdated", users);

        });

        // Disconnect
        socket.on("disconnect", () => {
            const user = users.find(u => u.socketId === socket.id);
            if (user) {
                user.online = false;
                console.log(`❌ ${user.username} went offline`);
                io.emit("usersUpdated", users);
            }
        });
    });
}

module.exports = { initSocket };
