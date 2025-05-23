import { Router } from "express";
import { MeetingController } from "../controllers/meeting.controller.js";

const meetingController = new MeetingController();
export const meetingRouters = Router();

meetingRouters.get("/api/meetings", meetingController.getAllMeetings);
meetingRouters.get("/api/meetings/:id", meetingController.getMeeting);
meetingRouters.post("/api/meetings", meetingController.createMeeting);
meetingRouters.put("/api/meetings/:id", meetingController.updateMeeting);
meetingRouters.delete("/api/meetings/:id", meetingController.deleteMeeting);
