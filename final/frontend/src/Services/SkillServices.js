const SkillService = {
  async getProjectDetails(userId) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(
        `http://localhost:5000/api/project-details/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch project details");
      }
      const projectData = await response.json();
      return projectData;
    } catch (error) {
      console.error("Error fetching project details:", error);
      throw error;
    }
  },
  async getSkillDetails(userId) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(
        `http://localhost:5000/api/skill-details/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch skill details");
      }
      const skillData = await response.json();
      return skillData;
    } catch (error) {
      console.error("Error fetching skill details:", error);
      throw error;
    }
  },
  async getCertificationDetails(userId) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(
        `http://localhost:5000/api/certification-details/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch certification details");
      }
      const certificationData = await response.json();
      return certificationData;
    } catch (error) {
      console.error("Error fetching certification details:", error);
      throw error;
    }
  },
  async getAllProjectDetails() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(
        `http://localhost:5000/api/allproject-details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch all project details");
      }
      const allProjectData = await response.json();
      return allProjectData;
    } catch (error) {
      console.error("Error fetching all project details:", error);
      throw error;
    }
  },
  async getAllSkillDetails() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(
        `http://localhost:5000/api/allskill-details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch all skill details");
      }
      const allSkillData = await response.json();
      return allSkillData;
    } catch (error) {
      console.error("Error fetching all skill details:", error);
      throw error;
    }
  },
  async getAllCertificationDetails() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(
        `http://localhost:5000/api/allcertification-details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch all certification details");
      }
      const allCertificationData = await response.json();
      return allCertificationData;
    } catch (error) {
      console.error("Error fetching all certification details:", error);
      throw error;
    }
  },
};

export default SkillService;
