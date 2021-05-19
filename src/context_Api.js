import { Link} from "react-router-dom"
import { useContext } from "react"
import HOC,{ DiscountContext } from './HOC'

function Context_com(props) {

    var parentprop = useContext(DiscountContext)
    console.log('context',parentprop)
  return (
    <div className="card" style={{width: "18rem", cursor:"pointer",marginLeft:"3px",marginRight:"3px",marginBottom:"3px",marginTop:"3px"}}>
    	
    	<h5 className="card-title text-center "><b>This component uses parents prop that is context </b></h5>
    </div>	
  );
}

export default HOC(Context_com);