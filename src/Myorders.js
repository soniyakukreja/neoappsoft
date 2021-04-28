import axios from "axios"
import {useEffect, useState} from "react"

function Myorders(){

    var [myorders,setMyorders] = useState()
    var i =0;
    useEffect(()=>{
        axios({
            url: 'https://apibyashu.herokuapp.com/api/cakeorders',
            method: "post",
            headers: {
            authtoken:  localStorage.token
            },
            data:{}
        }).then((response) => {
            setMyorders(response.data.cakeorders)
            // props.dispatch({
            // type: "ORDER_DONE",
            // })

        }, (error) => {
            console.log("response from cakeorders api : ", error)
        })
    },[])

    return(
        
        <>
        <h4 className="text-center text-bold m-2">MY Orders</h4>
        <table className="table table-hover"><thead><tr>
            <th>Order Number</th>
            <th>Date</th>
            <th>Status</th>
            <th>Pay Mode</th>
            <th>Order Total</th>
            <th>Products</th>
            </tr></thead>
            <tbody>

            
        {myorders?.length >0 && myorders.map((each,index) => {
i++;
            return(
            
            <tr id={index}>
                <td>{i}</td>
                <td>{each.orderdate}</td>
                <td>{(each.pending)?'Pending':'Completed'}</td>
                <td>{each.mode}</td>
                <td>{each.price}</td>
                <td>{
                    //var prod = each.cakes
                    each.cakes.map((p,index) => {
                        return(
                        <>
                        <img src={p.image} className=""  alt="..." style={{height:"40px", width:"40px"}}  />
                       <br/>
                        </>
                        )
                    })
                    }</td>
            </tr>
            )
      
        
        })
        }
         
   </tbody>
   </table>
        </>
    )
}

export default Myorders