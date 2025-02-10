import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/card/Card";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";

const Properties = () => {
  const [data, setData] = useState([]);
  const [details, setDetails] = useState({});
  const [query, setQuery] = useState("");
  const [type, setType] = useState("sale");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const paginateFunc = (type) => {
    if (type === "next" && details.pages?.next) {
      setQuery(details.pages.next);
    } else if (type === "previous" && details.pages?.previous) {
      setQuery(details.pages.previous);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const search = { sellorrent: type }


      try {
        setIsLoading(true); // Show loader

        const url = query
          ? `${process.env.REACT_APP_API}properties/?page=${query}&search[sellorrent]=${type}`
          : `${process.env.REACT_APP_API}properties/?search[sellorrent]=${type}`;

        const response = await axios.get(url);
        // Update states with data
        setData(response.data.data || []);
        setDetails(response.data.details || {});
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // Ensure empty data on error
      } finally {
        setIsLoading(false); // Hide loader
      }
    };

    fetchData();
  }, [query, type]);

  // Convert `data` to an array of entries for rendering
  const dataArray = Object.entries(data);

  // Loader handling
  if (isLoading) {
    return <div className="loader"></div>;
  }

  // No data handling
  if (!dataArray.length) {
    return (
      <div className="noProperty">
        {user && (
          <button>
            <Link to="/ilanyonetimi">İlanları yönet</Link>
          </button>
        )}
        <span className="noPropertyText">İlan bulunamadı</span>
      </div>
    );
  }

  // Main content
  return (
    <div className="properties">
   
      <div className="allInfos">
        {user && (
          <button>
            <Link to="/ilanyonetimi">İlanları yönet</Link>
          </button>
        )}
        <div className="rentInfos">
   <select className="select"
        value={type} // Bind the state to the select value
        onChange={(e) => { setType(e.target.value); setQuery("") }} // Update state on change
      >
        <option value="rent">kiralık</option>
        <option value="sale">satılık</option>
      </select>
      {type == "rent" &&
        (
          <h2> Kiralık ilanları görüntülemektesiniz.</h2>
        )
      }
      {type == "sale" &&
        (
          <h2> Satılık ilanları görüntülemektesiniz.</h2>
        )
      }
      </div>
      <div className="cards">
        {dataArray.map((item, index) => (
          <Card key={index} data={item} />
        ))}
   
        </div>
        <div className="pagination">
        <button
          className="arrow arrow-left"
          onClick={() => paginateFunc("previous")}
          disabled={!details.pages?.previous}
        >
          <IoIosArrowBack />
        </button>
        {details.pages.previous && <button onClick={() => setQuery(details.pages.previous)}>{details.pages.previous}</button>}
        <button className="currentPage" >{details.pages.current || 1}</button>
        {details.pages.next && <button onClick={() => setQuery(details.pages.next)}>{details.pages.next}</button>}

        <button
          className="arrow arrow-right"
          onClick={() => paginateFunc("next")}
          disabled={!details.pages?.next}
        >
          <IoIosArrowForward />
        </button>
      </div>
      </div>
     
    </div>
  );
};

export default Properties;
