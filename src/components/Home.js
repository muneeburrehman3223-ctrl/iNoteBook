import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notes from "./Notes";

const Home = (props) => {
  const { showAlert } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      showAlert("Please login to access your notes", "warning");
      navigate("/login");
    }
  }, [navigate, showAlert]);

  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
