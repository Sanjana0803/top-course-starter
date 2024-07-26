import React, { useEffect, useState } from "react";
import { apiUrl,filterData } from "./data";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";
import Card from "./components/Card";

// import { useState } from  "react";

const App = () => {

   const[courses,setCourses]=useState([]);
   const[loading,setLoading]=useState(true);
   const[category,setCategory]=useState(filterData[0].title);
    
   
   
 async function fetchData(){
  setLoading(true); 
  try{
    let response = await fetch(apiUrl);
    let output= await response.json();
    // output
    setCourses(output.data);
  }
  catch(error){
    toast.error("something went wrong");
  }
  setLoading(false);
}

      useEffect(()=>{
        fetchData();
      },[])
 
  return(
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
      <Navbar/>
      </div>
      <div className="bg-bgDark2">
      <div> 
         <Filter 
         filterData={filterData}
         category={category}
         setCategory={setCategory}/>
      </div>
    

      <div className="w-11/12 max-w-[1200px]
      mx-auto flex flex-wraps justify-center items-center min-h-[50vh]">
        {
          loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)
        }
      </div>
      </div> 
     


    </div>

  );
};
 
export default App
