import React from "react";
// import React, {useEffect, useState} from "react";
import Navbar from "./Components/Navbar";
import Filter from "./Components/Filter";
import Cards from "./Components/Cards";
import Spinner from "./Components/Spinner";
import { apiUrl, filterData } from "./data";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const App = () => {
  // const [courses, setCourses] = useState(null);
  const [courses, setCourses] = useState([]); //read button comment
  const [laoding, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);
  

  const fetchData = async () => {
    // we need to show loader until we get data
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      const output = await res.json();
      // save data into a variable
      // Save data
      setCourses(output.data);
      // setCourses(output);
    } catch (error) {
      toast.error("Something Went Wrong"+ error);
    }
    // hide loader once we get responce
    setLoading(false);
  };
  // need to execute it first time when component is rendered, so dependency list is empty
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex-col flex bg-bgDark2">
      {/* -----------navbar------------ */}
      <div>
        <Navbar />
      </div>

      <div className="bg-bgDark2">
        <div>
          <Filter
            filterData={filterData}
            category={category}
            setCategory={setCategory}
          />
        </div>

        <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center">
          {
            laoding ? (
              <Spinner />
            ) : (
              <Cards courses={courses} category={category} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default App;
