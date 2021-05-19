import {useState, useEffect} from "react"
import { connect } from "react-redux"

function Address(props){
    var [formerrors,setFormerrors] = useState({})
    var [address,setAddress] = useState({
        name:"",address:"",pincode:"",phone:"",city:""
    })

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
            pincode:event.target.value,
        })
        delete formerrors.pin; 
    }

    useEffect(() => {
     
        props.dispatch({
            type: "UPDATE_CURRENT_CHECKOUT_STEP",
            payload:2
        });

        if (props.address?.name) {
            setAddress(props.address);
          }

    }, [props.address]);

    return(
        <div className="checkoutContainer">
              <h2 className="themeHead"> Add Your Address</h2>
              <form id="Addressform">
                <div className="form-group">
                    <label>Name</label>
                <input type="text" id="name" name="name" onChange={getName} value={address?.name} className="form-control" />
                {formerrors?.name && <div className="form-error">{formerrors.name}</div>}
                </div>
                <div className="form-group">
                <label>Phone</label>
                <input type="text" name="phone" id="phone" onChange={getPhone} value={address?.phone} className="form-control" />
                {formerrors?.phone && <div className="form-error">{formerrors.phone}</div> }
                </div>
                <div className="form-group">
                <label>Address</label>
                <input type="text" name="address" id="address" onChange={getAddress} value={address?.address} className="form-control" />
                {formerrors?.address && <div className="form-error">{formerrors.address}</div>}
                </div>
                <div className="form-group">
                <label>City</label>
                <input type="text" name="city" id="city" onChange={getCity} value={address?.city} className="form-control" />
                {formerrors?.city && <div className="form-error">{formerrors.city}</div>}
                </div>
                <div className="form-group">
                <label>Pin</label>
                <input type="text" name="pin" id="pin" onChange={getPin} value={address?.pincode} className="form-control" />
                {formerrors?.pincode && <div className="form-error">{formerrors.pin}</div> }
                </div>
                <center><button className="themebtn" onClick={saveAddress}>Place Order</button></center>
            </form>   
            </div>
    )
}
export default connect(function(state){
    return {
        current_check_step: state?.current_check_step,
        done_check_steps: state?.done_check_steps,
        address:state?.address
    };
})(Address)