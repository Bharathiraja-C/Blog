const UserModel = require("../models/UserModel");
const { sendApproveEmail, sendStatusEmail } = require("../utils/mailer");
const CertificationController = {
  async addCertifications(req, res) {
    const userId = req.params.userId;
    const certificationData = req.body;

    try {
      const { skills } = certificationData;

      for (const skill of skills) {
        const { id, certifications, projects } = skill;
        await UserModel.addCertifications(userId, certifications, id);
        await UserModel.addProjects(userId, projects, id);
        await UserModel.addSkills(userId, [skill]);
      }
      const approver = await UserModel.findRandomApprover();
      if (approver) {
        await sendApproveEmail(
          approver.email,
          "Certification Approval Request",
          `Please review the certifications for approval.\n Click here to visit user details    http://localhost:3000/users/${userId}`
        );
      }

      res.status(201).json({ message: "Certifications added successfully" });
    } catch (error) {
      console.error("Error adding certifications:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async updateStatus(req, res) {
    const userId = req.params.userId;
    const newStatus = req.body.status;
    const skillId = req.body.skillId;

    try {
      await UserModel.updateCertificationStatus(skillId, newStatus);

      const userData = await UserModel.getMail(userId);

      //await sendStatusEmail(userData.email, 'Certification Status Updated', `Your certification has  ${newStatus} by the approver.`);
      res
        .status(200)
        .json({ message: "Certification status updated successfully" });
    } catch (error) {
      console.error("Error updating certification status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async getProjectDetails(req, res) {
    const userId = req.params.userId;
    try {
      const userDetails = await UserModel.getProjectDetails(userId);
      res.status(200).json(userDetails);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async getSkillDetails(req, res) {
    const userId = req.params.userId;
    try {
      const userDetails = await UserModel.getSkillDetails(userId);
      res.status(200).json(userDetails);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async getCertificationDetails(req, res) {
    const userId = req.params.userId;
    try {
      const userDetails = await UserModel.getCertificationDetails(userId);
      res.status(200).json(userDetails);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async getAllProjectDetails(req, res) {
    try {
      const userDetails = await UserModel.getAllProjectDetails();
      res.status(200).json(userDetails);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async getAllSkillDetails(req, res) {
    try {
      const userDetails = await UserModel.getAllSkillDetails();
      res.status(200).json(userDetails);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async getAllCertificationDetails(req, res) {
    try {
      const userDetails = await UserModel.getAllCertificationDetails();
      res.status(200).json(userDetails);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = CertificationController;
