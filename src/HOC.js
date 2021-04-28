import {compoent} from "react"
function HOC(comp){
    return class extends Component{

        render(){
            return (
                <div>
                    <Comp />
                </div>
            )
        }
    }
}