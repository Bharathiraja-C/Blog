import React, { useState, useEffect } from "react";
import SkillService from "../Services/SkillServices";
import { Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
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

const Adminpage = ({}) => {
  const [userDetails, setUserDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); // State to manage loading
  const profilesPerPage = 5; // Number of profiles to display per page
  const location = useLocation();
  const project = location.state && location.state.project;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        let data;
        if (project === "Projects") {
          data = await SkillService.getAllProjectDetails();
        } else if (project === "Skills") {
          data = await SkillService.getAllSkillDetails();
        } else if (project === "Certifications") {
          data = await SkillService.getAllCertificationDetails();
        } else if (project === "AddUser") {
          navigate("/create-user");
          return; // Exit early to prevent setting state after navigation
        } else {
          navigate("/userprofiles");
          return; // Exit early to prevent setting state after navigation
        }
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUserDetails();
  }, [project, navigate]);

  // Pagination logic
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate indexes for slicing data
  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;

  // Filtered data based on search term
  const filteredProjectDetails = userDetails
    .filter(
      (userDetail) =>
        userDetail.projects &&
        userDetail.projects.projectname
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstProfile, indexOfLastProfile);

  const filteredSkillDetails = userDetails
    .filter(
      (userDetail) =>
        userDetail.skills &&
        userDetail.skills.skillname
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstProfile, indexOfLastProfile);

  const filteredCertificationDetails = userDetails
    .filter(
      (userDetail) =>
        userDetail.certification &&
        userDetail.certification.certificationname
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstProfile, indexOfLastProfile);

  return (
    <div className="div1">
      {userDetails && project === "Projects" && (
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
          ) : userDetails && userDetails.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th className="table-header">User Name</th>
                  <th className="table-header">Project Name</th>
                  <th className="table-header">Description</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjectDetails.map((userDetail, index) => (
                  <tr key={index}>
                    <td>
                      {userDetail.projects && userDetail.projects.username}
                    </td>
                    <td>
                      {userDetail.projects && userDetail.projects.projectname}
                    </td>
                    <td>
                      {userDetail.projects &&
                        userDetail.projects.projectdescription}
                    </td>
                    <td>{userDetail.projects && userDetail.projects.status}</td>
                    <td>
                      {new Date(
                        userDetail.projects && userDetail.projects.createdat
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No project details found</p>
          )}
        </div>
      )}
      {userDetails && project === "Skills" && (
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
          ) : userDetails && userDetails.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th className="table-header">User Name</th>
                  <th className="table-header">Skill Name</th>
                  <th className="table-header">Proficiency Level</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {filteredSkillDetails.map((userDetail, index) => (
                  <tr key={index}>
                    <td>{userDetail.skills && userDetail.skills.username}</td>
                    <td>{userDetail.skills && userDetail.skills.skillname}</td>
                    <td>
                      {userDetail.skills && userDetail.skills.proficiencylevel}
                    </td>
                    <td>{userDetail.skills && userDetail.skills.status}</td>
                    <td>
                      {userDetail.skills &&
                        new Date(
                          userDetail.skills.createdat
                        ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No skill details found</p>
          )}
        </div>
      )}
      {userDetails && project === "Certifications" && (
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
          ) : userDetails && userDetails.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th className="table-header">User Name</th>
                  <th className="table-header">Certification Name</th>
                  <th className="table-header">Certification File</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Submitted on</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificationDetails.map((userDetail, index) => (
                  <tr key={index}>
                    <td>
                      {userDetail.certification &&
                        userDetail.certification.username}
                    </td>
                    <td>
                      {userDetail.certification &&
                        userDetail.certification.certificationname}
                    </td>
                    <td>
                      {userDetail.certification &&
                        userDetail.certification.certificationfile}
                    </td>
                    <td>
                      {userDetail.certification &&
                        userDetail.certification.status}
                    </td>
                    <td>
                      {new Date(
                        userDetail.certification &&
                          userDetail.certification.createdat
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No certifications found</p>
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
            count={
              Math.ceil(
                (project === "Projects"
                  ? filteredProjectDetails.length
                  : project === "Skills"
                  ? filteredSkillDetails.length
                  : project === "Certifications"
                  ? filteredCertificationDetails.length
                  : 0) / profilesPerPage
              ) || 1
            }
            page={currentPage}
            color="primary"
            onChange={handleChangePage}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Adminpage;
