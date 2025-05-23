import { Meeting } from "../models/meeting.model.js";
import { User } from "../models/user.model.js";

export class MeetingController {
  getAllMeetings = async (req, res) => {
    try {
      const meetings = await Meeting.findAll({
        include: [{ model: User }],
      });
      res.json(meetings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getMeeting = async (req, res) => {
    try {
      const { id } = req.params;
      const meeting = await Meeting.findByPk(id, {
        include: [{ model: User }],
      });
      if (!meeting) {
        return res.status(404).json({ message: "Meeting not found" });
      }
      res.json(meeting);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  createMeeting = async (req, res) => {
    try {
      const { title, description, url, userEmail } = req.body;

      const user = await User.findByPk(userEmail);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const meeting = await Meeting.create({
        title,
        description,
        url,
        userEmail,
      });
      res.status(201).json(meeting);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  updateMeeting = async (req, res) => {
    try {
      const { id } = req.params;
      const meeting = await Meeting.findByPk(id);
      if (!meeting) {
        return res.status(404).json({ message: "Meeting not found" });
      }

      await meeting.update(req.body);
      res.status(200).json(meeting);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteMeeting = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Meeting.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ message: "Meeting not found" });
      }
      res.json({ message: "Meeting deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
