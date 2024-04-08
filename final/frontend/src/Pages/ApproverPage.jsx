import React, { useState, useEffect } from "react";
import SkillService from "../Services/SkillServices";
import { Table, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TableSkeleton from "./TableSkeleton";  // Import Skeleton component
import "./userDetails.css";

const ApproverPage = ({}) => {
  const [userDetails, setUserDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 5; // Change this value as needed
  const [loading, setLoading] = useState(false); // State to manage loading
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state && location.state.project;

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        if (project === "Approve Skills") {
          const data = await SkillService.getAllSkillDetails();
          setUserDetails(data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUserDetails();
  }, [project]);

  const handleViewDetails = (skillId) => {
    navigate(`/users/${localStorage.getItem("userid")}/${skillId}`);
  };

  // Pagination logic
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentUsers = userDetails
    .filter(userDetail => userDetail.skills && userDetail.skills.status === "pending") // Filter only pending skills
    .slice(indexOfFirstProfile, indexOfLastProfile); // Apply pagination after filtering

  const totalPages = Math.ceil(currentUsers.length / profilesPerPage); // Calculate total pages based on filtered data

  return (
    <div className="div1">
      {userDetails && project === "Approve Skills" && (
        <div>
          <h2 className="userD">Skill Details</h2>
          {loading ? (
             <TableSkeleton numColumns={5} numRows={5} />
          ) : (
            currentUsers.length > 0 ? (
              <React.Fragment>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th className="table-header">User Name</th>
                      <th className="table-header">Skill Name</th>
                      <th className="table-header">Proficiency Level</th>
                      <th className="table-header">Status</th>
                      <th className="table-header">Submitted At</th>
                      <th className="table-header">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((userDetail, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td>{userDetail.skills.username}</td>
                          <td>{userDetail.skills.skillname}</td>
                          <td>{userDetail.skills.proficiencylevel}</td>
                          <td>{userDetail.skills.status}</td>
                          <td>
                            {new Date(
                              userDetail.skills.createdat
                            ).toLocaleDateString()}
                          </td>
                          <td>
                            <Button
                              onClick={() =>
                                handleViewDetails(userDetail.skills.id)
                              }
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </Table>
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
                      count={totalPages} // Use totalPages instead of calculating from userDetails.length
                      page={currentPage}
                      color="primary"
                      onChange={handleChangePage}
                    />
                  </Stack>
                </div>
              </React.Fragment>
            ) : (
              <p>No skill details found</p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ApproverPage;
