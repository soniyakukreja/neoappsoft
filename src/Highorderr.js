import Hoc from './HOC';

function Highorderr(){
    return (
        <h5>This data is sent from Functional component</h5>
    )
} 

var fun_highorder = Hoc(Highorderr)
export default fun_highorder