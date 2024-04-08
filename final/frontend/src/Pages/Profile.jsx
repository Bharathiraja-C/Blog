import React, { useState, useEffect } from "react"; // Import useState and useEffect
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import UserService from "../Services/UserService";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Profile.css"; // Import CSS file
import Skeleton from "@mui/material/Skeleton"; // Import Skeleton component

export default function PersonalProfile() {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem("userid"));
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const navigate = useNavigate(); // Get navigate function from useNavigate

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await UserService.getUserData(userId);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false); // Set loading status to false after fetching data
      }
    }

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Function to handle edit button click
  const handleEditClick = () => {
    navigate(`/updateprofile/${userId}`, { state: { userData: userData } }); // Navigate to /updateprofiles route
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            {isLoading ? ( // Render skeleton loading while data is fetching
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <MDBCardBody>
                  <Skeleton variant="rectangular" width={210} height={200} />
                </MDBCardBody>
              </MDBCard>
            ) : (
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <MDBRow className="g-0">
                  <MDBCol
                    md="4"
                    className="gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="Avatar"
                      className="rounded-circle my-5"
                      style={{ width: "80px", backgroundColor: "white" }}
                      fluid
                    />
                    <MDBTypography tag="h5">{userData.username}</MDBTypography>
                    <MDBCardText>{userData.designation}</MDBCardText>
                    <MDBIcon far icon="edit mb-5" onClick={handleEditClick} /> {/* Edit button */}
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">Information</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">
                            {userData.email}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Phone</MDBTypography>
                          <MDBCardText className="text-muted">
                            {userData.phone}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Role</MDBTypography>
                          <MDBCardText className="text-muted">
                            {userData.role}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Address</MDBTypography>
                          <MDBCardText className="text-muted">
                            {userData.address}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <div className="d-flex justify-content-start">
                        <a>
                          <MDBIcon fab icon="facebook me-3" size="lg" />
                        </a>
                        &nbsp;
                        <a>
                          <MDBIcon fab icon="twitter me-3" size="lg" />
                        </a>
                        &nbsp;
                        <a>
                          <MDBIcon fab icon="instagram me-3" size="lg" />
                        </a>
                      </div>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
