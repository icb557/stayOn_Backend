import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export class UserController {
  getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  createUser = async (req, res) => {
    try {
      const {
        email,
        password,
        firstName,
        middleName,
        lastName,
        secondLastName,
        major,
        role,
        age,
      } = req.body;

      if (!email.endsWith("@elpoli.edu.co")) {
        return res
          .status(400)
          .json({ message: "Email must end with @elpoli.edu.co" });
      }

      if (!["Student", "Monitor"].includes(role)) {
        return res
          .status(400)
          .json({ message: "Invalid role. Must be Student or Monitor" });
      }

      const existingUser = await User.findByPk(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const cryptedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        email,
        password: cryptedPassword,
        firstName,
        middleName,
        lastName,
        secondLastName,
        major,
        role,
        age,
      });

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  getUser = async (req, res) => {
    try {
      const { email } = req.params;
      const user = await User.findByPk(email);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const { email } = req.params;
      const user = await User.findByPk(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 12);
      }

      await user.update(req.body);
      res.status(202).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { email } = req.params;
      await User.destroy({ where: { email } });
      res.json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: {
            [Op.iLike]: email,
          },
        },
      });

      if (!user) {
        return res.status(400).json({ err: "Email is not registered" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ err: "Password incorrect" });
      }

      const token = jwt.sign(
        {
          email: user.email,
          role: user.role,
          id: user.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "2h" }
      );

      res.json({ token, role: user.role });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
