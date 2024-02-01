/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import Item from "../Utilities/Item";
import { useNavigate } from "react-router-dom";

const API_URL = "https://api.tvmaze.com/search/shows?q=all";
const ShowListPage = () => {
  const navigate = useNavigate();
  const [shows, setShows] = useState();
  const [current, setCurrent] = useState();
  const Showdata = async () => {
    const response = await axios(API_URL);
    const data = response.data;
    setShows(data);

    data && localStorage.setItem("data", JSON.stringify(data));
    //console.log(data);
    setCurrent(data[0]);
  };

  useEffect(() => {
    Showdata();
  }, []);
  // console.log(shows);
  return (
    <div className="showlistpage_section bg-gradient-to-r from-black to-black justify-between relative ">
      <div className="obsolute logo font-bold text-white text-3xl text-center tracking-widest">
        MOVIES
      </div>
      <div className=" bottom-0 shows_section p-3 flex flex-wrap gap-5 items-center overflow-auto w-full">
        {shows?.map((s) => (
          <button
            key={s.show.id}
            type="button"
            onClick={() => navigate("/show/" + s.show.id)}
          >
            <Item
              id={s.show.id}
              image_url={s.show.image?.original}
              rating={s.show.rating.average}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShowListPage;
