import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate'
import axios from "axios"
import Cake from '../components/Cake'
import '../assets/pagination.css'
const api_base  = process.env.REACT_APP_BASE_URL


function Admin(){

const [currentPage, setCurrentPage] = useState(0);
const [cakes,setCakes]=useState([])
const PER_PAGE = 5;
const offset = currentPage * PER_PAGE;    

useEffect(() => {
    axios({
        url:api_base+"allcakes",
        method:"get",
   }).then((response)=>{
      setCakes(response.data.data)
   },(error)=>{
      console.log("Error from AllCakes api",error) 
   })
}, []);

const currentPageDataOne = cakes
.slice(offset, offset + PER_PAGE).map((each, index)=>{
return (
<Cake cakedat={each} key={index}/>
)
})

const pageCount = Math.ceil(cakes.length / PER_PAGE);


return (
    <div className="App">
      <div className="container mt-3 mb-3">
      <div className="row mt-3 mb-3">
      {currentPageDataOne}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={" prev_link"}
        nextLinkClassName={""}
        disabledClassName={"disabled"}
        activeClassName={"active"}
      />
      </div>
    </div>
  );

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
}
}

export default Admin