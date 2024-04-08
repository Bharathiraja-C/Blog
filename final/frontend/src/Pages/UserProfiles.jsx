import React, { useState, useEffect } from "react";
import UserService from "../Services/UserService";
import { Table, Button, TextField, MenuItem } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
  width: "50%",
  margin: "0 auto",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserProfiles = ({ userId }) => {
  const [userid, setuserid] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [designation, setDesignation] = useState("");
  const [role, setRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await UserService.getUserProfiles(userId);
        setUserDetails(userData);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const filteredUserDetails = userDetails.filter((userDetail) => {
    return userDetail.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Pagination logic
  const indexOfLastProfile = currentPage * 10;
  const indexOfFirstProfile = indexOfLastProfile - 10;
  const currentProfiles = filteredUserDetails.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handlePromoteClick = (id) => {
    setuserid(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlePromoteUser = async (e) => {
    e.preventDefault();
    try {
      const result = await UserService.PromoteUser(userid, designation, role);
      console.log("User created successfully:", result);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <div className="div1">
      <h2 className="userD">User Details</h2>
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
      <div className="table-container">
        <div className="table-scroll">
          {loading ? ( // Skeleton loading
           <TableSkeleton numColumns={5} numRows={5} />
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th className="table-header">User Name</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Address</th>
                  <th className="table-header">Phone</th>
                  <th className="table-header">Role</th>
                  <th className="table-header">Designation</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProfiles.map((user, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      <td>{user.phone}</td>
                      <td>{user.role}</td>
                      <td>{user.designation}</td>
                      <td>
                        <Button onClick={() => handlePromoteClick(user.id)}>
                          Promote
                        </Button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Promotion Details
          </Typography>
          <TextField
            label="Designation"
            variant="outlined"
            fullWidth
            margin="normal"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
          <TextField
            select
            label="Role"
            fullWidth
            variant="outlined"
            margin="normal"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="">Select role</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Approver">Approver</MenuItem>
          </TextField>
          <Button variant="contained" onClick={handlePromoteUser}>
            Promote
          </Button>
        </Box>
      </Modal>
      <div
        className="pagination-container"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(filteredUserDetails.length / 10)}
            page={currentPage}
            color="primary"
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default UserProfiles;
