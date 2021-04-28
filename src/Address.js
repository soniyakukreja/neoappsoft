import {useState, useEffect} from "react"
import { connect } from "react-redux"
import $ from 'jquery';

function Address(props){
    var [current_check_state,setCurrentCheckState] = useState(2)

   // console.log('add props',props)
    var [formerrors,setFormerrors] = useState({})
    var [address,setAddress] = useState({})

    var validate = function (elm){
        var errors= {}
        if(!elm.name.value && elm.name.value.trim !==''){
            errors.name= "Name is Required"
        }

        if(!elm.phone.value){
            errors.phone= "Phone is Required"
        }
        if(!elm.address.value){
            errors.address= "Address is Required"
        }
        
        if(!elm.city.value){
            errors.city= "City is Required"
        }
        if(!elm.pin.value){
            errors.pin= "Pin is Required"
        }
        
        var errorkeys = Object.keys(errors)
        if(errorkeys.length>0)
        return errors
        else
        return false
    }

    var saveAddress = function(e){
        e.preventDefault()
        var form = document.getElementById('Addressform')
        var errors = validate(form.elements)
        if(errors){
            setFormerrors(errors)
        }else{
            props.dispatch({
                type:"SAVE_ADDRESS",
                payload:address
            })
            props.history.push('/checkout/payment')
        }
    }

    let getName=(event)=>
    {
        setAddress({
            ...address,
            name:event.target.value,
        })
        delete formerrors.name; 
    }

    let getPhone=(event)=>
    {
        setAddress({
            ...address,
            phone:event.target.value,
        })
        delete formerrors.phone; 
    }
    let getAddress=(event)=>
    {
        setAddress({
            ...address,
            address:event.target.value,
        })
        delete formerrors.address; 
    }

    let getCity=(event)=>
    {
        setAddress({
            ...address,
            city:event.target.value,
        })
        delete formerrors.city; 
    }

    let getPin=(event)=>
    {
        setAddress({
            ...address,
            pin:event.target.value,
        })
        delete formerrors.pin; 
    }
    
    

    useEffect(() => {
     
        props.dispatch({
            type: "UPDATE_CURRENT_CHECKOUT_STEP",
            payload:2
        });

    }, []);

    return(
        <div style={{width:"90%" , margin:"auto"}}>
              <h2> Address Section </h2>
              <form id="Addressform">
                <div className="form-group">
                    <label>Name</label>
                <input type="text" id="name" name="name" onChange={getName} className="form-control" ></input>
                <div className="form-error">{formerrors?.name && <div>{formerrors.name}</div>}</div>
                </div>
                <div className="form-group">
                <label>Phone</label>
                <input type="text" name="phone" id="phone" onChange={getPhone}  className="form-control"></input>
                <div className="form-error">{formerrors?.phone && <div>{formerrors.phone}</div> }</div>
                </div>
                <div className="form-group">
                <label>Address</label>
                <input type="text" name="address" id="address" onChange={getAddress}  className="form-control"></input>
                <div className="form-error">{formerrors.address}</div>
                </div>
                <div className="form-group">
                <label>City</label>
                <input type="text" name="city" id="city" onChange={getCity}  className="form-control"></input>
                <div className="form-error">{formerrors.city}</div>
                </div>
                <div className="form-group">
                <label>Pin</label>
                <input type="text" name="pin" id="pin" onChange={getPin}  className="form-control"></input>
                <div className="form-error">{formerrors.pin}</div>
                </div>
                <button className="btn btn-success" onClick={saveAddress}>Place Order</button>
            </form>   
            </div>
    )
}
export default connect(function(state,props){
    return {
        token: state?.user?.token,
        // checkout_step : state?.checkout_step,
        // clicked_step: state?.clicked_step
        current_check_step: state?.current_check_step,
        done_check_steps: state?.done_check_steps
    };
})(Address)