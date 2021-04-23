var carousel1="carousel1.jpeg"
var carousel2="carousel2.jpeg"
var carousel3="carousel3.jpeg"

var carouselImage=
{
	height:"310px"
}
function Carousel() {
  return (
    <div  id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
	  <div className="carousel-inner">
	    <div className="carousel-item active">
	        <img src={carousel1}  style={carouselImage} className="d-block w-100" alt="..."/>
	    </div>
	    <div className="carousel-item">
	      <img src={carousel2} style={carouselImage} className="d-block w-100" alt="..."/>
	    </div>
	    <div className="carousel-item">
	      <img src={carousel3} style={carouselImage} className="d-block w-100" alt="..."/>
	    </div>
	  </div>
	</div>
  );
}

export default Carousel;