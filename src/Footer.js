import { Component } from "react"


function Footer(component) {
    return class extends Component{

        render (){
            return(
                <>
            <div className="row">
                <div className="col-4"><component/></div>
                <div className="col-4"></div>
                <div className="col-4"></div>
            </div>
            </>
            )
        }
            
             

    }
}
export default Footer
