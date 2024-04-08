import React from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom"; // Import Navigate and useParams
import Header from "./components/Menu";
import Layout from "./layout";
import Login from "./Pages/signin";
import UpdatePassword from "./Pages/UpdatePassword";
import UserCreation from "./Pages/UserCreation";
import AddCertifications from "./Pages/addCertifications";
import UserDetails from "./Pages/UserDetails";
import ForgotPassword from "./Pages/ForgotPassword";
import Project from "./Pages/UserPage";
import Profile from "./Pages/Profile";
import UserProfile from "./Pages/UserProfiles";
import Adminpage from "./Pages/Adminpage";
import ApproverPage from "./Pages/ApproverPage";
import UpdateProfiles from "./Pages/UpdateProfiles"

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/user-menu" element={<UserMenu />} />
          <Route path="/create-user" element={<ProtectedAddUser />} />
          <Route path="/updateprofile/:userId" element={<ProtectedUpdateProfile />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/add-certifications/:userId"
            element={<ProtectedAddCertifications />}
          />
          <Route path="/users/:userId/:skillId" element={<AddWithUserId />} />
          <Route path="/projects/:userId" element={<ProjectDetailsUserId />} />
          <Route path="/adminpage" element={<Adminpage/>}/>
          <Route path="/userprofiles" element={<UserProfile/>}/>
          <Route path="/approverpage" element={<ApproverPage/>}/>
        </Route>
      </Routes>
    </>
  );
};

const UserMenu = () => {
  return <Layout />;
};

const ProtectedAddCertifications = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  if (localStorage.getItem("role") !== "admin") {
    return isAuthenticated ? (
      <AddCertificationsWithUserId />
    ) : (
      <Navigate to="/" />
    );
  } else {
    return <Navigate to="/" />;
  }
};

const ProtectedAddUser = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (localStorage.getItem("role") === "admin") {
    return isAuthenticated ? <UserCreation /> : <Navigate to="/" />;
  } else {
    return <Navigate to="/" />;
  }
};

const AddCertificationsWithUserId = () => {
  const { userId } = useParams(); 
  return <AddCertifications userId={userId} />;
};
const ProtectedUpdateProfile = () => {
  const { userId } = useParams();
  return <UpdateProfiles userId={userId} />;
};

const AddWithUserId = () => {
  const { userId } = useParams(); 
  const { skillId }= useParams();
  return <UserDetails userId={userId} skillId={skillId}/>;
};

const ProjectDetailsUserId = () => {
  const { userId } = useParams()
  return <Project userId={userId} />;
};

export default App;
