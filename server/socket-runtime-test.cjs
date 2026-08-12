const { io } = require("socket.io-client");

const token = process.argv[2];

if (!token) {
  console.error("Missing JWT token.");
  process.exit(1);
}

const socket = io("http://localhost:5000", {
  auth: {
    token,
  },
  transports: ["websocket"],
});

const timeout = setTimeout(() => {
  console.error("FAIL: Socket.IO connection timed out.");
  socket.disconnect();
  process.exit(1);
}, 10000);

socket.on("connect", () => {
  clearTimeout(timeout);

  console.log("PASS: Socket.IO connected.");
  console.log("Socket ID:", socket.id);

  setTimeout(() => {
    socket.disconnect();
    process.exit(0);
  }, 500);
});

socket.on("connect_error", (error) => {
  clearTimeout(timeout);

  console.error(
    "FAIL: Socket.IO authentication/connection failed."
  );

  console.error("Error:", error.message);

  socket.disconnect();
  process.exit(1);
});
