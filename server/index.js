const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOption = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credential");
const { initSocket } = require("./Socs");

const PORT = 3500;
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
connectDB();
let server;
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});
server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
initSocket(server);

app.use(logger);

app.use(cors(corsOption));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/upload", require("./routes/uploadPost"));
app.use('/videoc',require('./routes/Video'))
app.use("/job", require("./routes/jobRoutes"));

app.use("/user1", require("./routes/userUpdate"));
app.use("/chat", require("./routes/chat"));

app.use("/notif", require("./routes/notif"));

app.use("/post", require("./routes/post"));

app.use("/uploadprofileimage", require("./routes/uploadprofileimage"));
app.use("/connect", require("./routes/connectRoutes"));
app.use("/google", require("./routes/oauth"));
app.use('/oauth',  require("./routes/oauth2"));
app.use(express.static("uploads"));
app.use(verifyJWT);

app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.send("404 PAGE NOT FOUND");
  } else if (req.accepts("json")) {
    res.json({ error: "404 page not found" });
  } else {
    res.type("txt").send("404 page not found");
  }
});

app.use(errorHandler);
//Route Handlers
