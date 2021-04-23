import { Link} from "react-router-dom"
function Cake(props) {
  return (
    <div className="card" style={{width: "18rem", cursor:"pointer",marginLeft:"3px",marginRight:"3px",marginBottom:"3px",marginTop:"3px"}}>
    	<Link to={'/cake/'+props.cakedat.cakeid}><img src={props.cakedat.image} style={{ width: "18rem",height:"200px",padding:"10px" }} className="card-img-top" alt="..." /></Link>
    	<h5 className="card-title text-center "><b>{props.cakedat.name}</b></h5>
    </div>	
  );
}

export default Cake;