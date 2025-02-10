import React, { useEffect, useState, useContext } from "react";
import photo from "../../assets/1708471157665.jpeg";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";

const About = () => {
  const [aboutData, setAboutData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API || "http://localhost:5000/"}about`);
      setAboutData(response.data.data[0]?.about); // Handle case where no data exists
    } catch (error) {
      console.error("Error fetching about data:", error);
    } finally {
      setIsLoading(false); // Stop the loader regardless of success or failure
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="mainDiv">
    <div className="about">
      {user && (
        <Link to={"/hakkimdayonetimi"}>
          <button>Hakkımda yönetimi</button>
        </Link>
      )}
      <div className="paragraph">
        <img src={photo} alt="About section visual" />
        <p>{aboutData}</p>
      </div>
    </div>
    {/* <Footer/> */}

    </div>
  );
};

export default About;
