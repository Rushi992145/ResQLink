import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notificationRouter from "./routes/notification.js";
const app = express();

app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import

import userRouter from "./routes/user.route.js";
import volunteerRoutes from "./routes/volunteer.route.js";
import disasterRoutes from "./routes/disaster.route.js";
import ngoRoutes from "./routes/ngo.route.js";
import disasterAssignmentRoutes from "./routes/disasterAssignment.route.js";
import reportRoutes from "./routes/report.route.js";
import adminRoutes from "./routes/admin.route.js";
import aidRoutes from "./routes/aidRoutes.js";
import paymentGatewayRoutes from "./routes/paymentGateway.route.js";

//routes declaration
app.use("/api/users", userRouter);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/disasters", disasterRoutes);
app.use("/api/ngos", ngoRoutes);
app.use("/api/assignments", disasterAssignmentRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notification", notificationRouter);
app.use("/api/payment", paymentGatewayRoutes);

app.use("/api/aid", aidRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Service is healthy!" });
});

export { app };
