
import React, { useState, useEffect } from "react";
import SkillService from "../Services/SkillServices";
import { Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TableSkeleton from "./TableSkeleton"; 
import "./userDetails.css";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #ccc",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "80%",
  margin: "0 auto",
  [theme.breakpoints.up("md")]: {
    width: "50%",
  },
}));

const UserPage = ({ userId }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const project = location.state && location.state.project;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 5;

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true); 
      try {
        let data;
        if (project === "Projects") {
          data = await SkillService.getProjectDetails(userId);
        } else if (project === "Skills") {
          data = await SkillService.getSkillDetails(userId);
        } else if(project==='Certifications') {
          data = await SkillService.getCertificationDetails(userId);
        }
        else{
          navigate(`/add-certifications/${userId}`);
        }
        setUserDetails(data || []);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [project, userId]);
 const filteredProjectDetails = Array.isArray(userDetails)
    ? userDetails.filter((userDetail) => {
        return userDetail.projectname
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
    : [];
  const filteredSkillDetails = Array.isArray(userDetails)
    ? userDetails.filter((userDetail) => {
        return userDetail.skillname
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
    : [];
  const filteredCertificationDetails = Array.isArray(userDetails)
    ? userDetails.filter((userDetail) => {
        return userDetail.certificationname
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
    : [];
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = Array.isArray(userDetails)
    ? userDetails.slice(indexOfFirstProfile, indexOfLastProfile)
    : [];


  return (
    <div className="div1">
      {project === "Projects" && (
        <div>
          <h2 className="userD">Project Details</h2>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Search>
          <br />
          {loading ? (
            <TableSkeleton numColumns={5} numRows={5} />
          ) : (
            <>
              {userDetails && userDetails.length > 0 ? (
                <Table striped bordered hover responsive>
                   <thead>
                <tr>
                  <th className="table-header">Project Name</th>
                  <th className="table-header">Project Description</th>
                  <th className="table-header">Project Experience</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjectDetails.map((project, index) => (
                  <tr key={index}>
                    <td>{project.projectname}</td>
                    <td>{project.projectdescription}</td>
                    <td>{project.projectexperience}</td>
                    <td>{project.status}</td>
                    <td>{new Date(project.createdat).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
                </Table>
              ) : (
                <p>No projects found</p>
              )}
            </>
          )}
        </div>
      )}
      {project === "Skills" && (
        <div>
          <h2 className="userD">Skill Details</h2>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Search>
          <br />
          {loading ? (
            <TableSkeleton numColumns={5} numRows={5} />
          ) : (
            <>
              {userDetails && userDetails.length > 0 ? (
                <Table striped bordered hover responsive>
                   <thead>
                  <tr>
                    <th className="table-header">Skill Name</th>
                    <th className="table-header">Proficiency Level</th>
                    <th className="table-header">Status</th>
                    <th className="table-header">Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSkillDetails.map((skill, index) => (
                    <tr key={index}>
                      <td>{skill.skillname}</td>
                      <td>{skill.proficiencylevel}</td>
                      <td>{skill.status}</td>
                      <td>{new Date(skill.createdat).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
                </Table>
              ) : (
                <p>No skills found</p>
              )}
            </>
          )}
        </div>
      )}
      {project === "Certifications" && (
        <div>
          <h2 className="userD">Certification Details</h2>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Search>
          <br />
          {loading ? (
            <TableSkeleton numColumns={5} numRows={5} />
          ) : (
            <>
              {userDetails && userDetails.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead>
                <tr>
                  <th className="table-header">Certification Name</th>
                  <th className="table-header">Certification File</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificationDetails.map((certification, index) => (
                  <tr key={index}>
                    <td>{certification.certificationname}</td>
                    <td>{certification.certificationfile}</td>
                    <td>{certification.status}</td>
                    <td>
                      {new Date(certification.createdat).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
                </Table>
              ) : (
                <p>No certifications found</p>
              )}
            </>
          )}
        </div>
      )}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(userDetails.length / profilesPerPage)}
            page={currentPage}
            color="primary"
            onChange={handleChangePage}
          />
        </Stack>
      </div>
    </div>
  );
};

export default UserPage;

