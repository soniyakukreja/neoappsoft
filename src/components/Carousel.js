import carousel2 from '../assets/images/carousel2.jpeg'
import carousel1 from '../assets/images/carousel1.jpeg'
import carousel3 from '../assets/images/carousel3.jpeg'
//can fetch images from public folder directly 
// we can put it in public if we need it in react and non-react files both to avoid duplicacy of image files
//var carousel4="carousel4.jpeg"


var carouselImage=
{
	height:"310px"
}
function Carousel() {
  return (
    <div  id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
	  <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
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
	  <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
	</div>
  );
}

export default Carousel;