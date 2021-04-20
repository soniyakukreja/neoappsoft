import { Link} from "react-router-dom"
function Cake(props) {
  return (
    <div className="card" style={{margin:"auto",padding:"1px"}}>
    	<Link to={'/cake/'+props.cakedat.cakeid}><img src={props.cakedat.image} style={{ width: "18rem",height:"200px" }} className="card-img-top" alt="..." /></Link>
    	<h5>{props.cakedat.name}</h5>
    </div>	
  );
}

export default Cake;