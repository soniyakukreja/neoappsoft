// function Admin(){

//     return (
//         <>
//         Admin Component
//         </>
//     )
// }
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate'
import axios from "axios"
import Cake from './Cake'

function Admin(){

const PER_PAGE = 2;
const offset = currentPage * PER_PAGE;    
const [currentPage, setCurrentPage] = useState(0);
const [cakes,setCakes]=useState([])
//const [data, setData] = useState([]);



useEffect(() => {
    axios({
        url:"https://apibyashu.herokuapp.com/api/allcakes",
        method:"get",
   }).then((response)=>{
      setCakes(response.data.data)
   },(error)=>{
      console.log("Error from AllCakes api",error) 
   })
  // fetchData();

}, []);
// function fetchData() {
//     fetch("https://ihsavru.me/Demo/uploads.json")
//       .then((res) => res.json())
//       .then((data) => {
//         const {
//           course: { uploads }
//         } = data;
//         setData(uploads);
//       });
//   }
// const currentPageData = data
//     .slice(offset, offset + PER_PAGE)
//    .map(({ thumburl }) => <img src={thumburl} style={{padding:"10px",width:"50px",height:"50px"}} />);

    const currentPageDataOne = cakes
    .slice(offset, offset + PER_PAGE).map((each, index)=>{
        return (<Cake cakedat={each} key={index}/>)
      })

     const pageCount = Math.ceil(data.length / PER_PAGE);


return (
    <div className="App">
      <h1>React Pagination</h1>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
      {currentPageDataOne}
    </div>
  );

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
}
}

export default Admin