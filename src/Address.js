import {useState} from "react"
import { connect } from "react-redux"

function Address(props){
    console.log('add props',props)
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

    var placeOrder = function(e){
        e.preventDefault()
        var form = document.getElementById('Addressform')
        var errors = validate(form.elements)
        if(errors){
            setFormerrors(errors)
        }else{

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
        console.log('formerrors',formerrors)
        //formerrors(errors)

        setAddress({
            ...address,
            phone:event.target.value,
        })
        delete formerrors.phone; 
    }

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
                <input type="text" name="phone" id="phone" className="form-control"></input>
                <div className="form-error">{formerrors?.phone && <div>{formerrors.phone}</div> }</div>
                </div>
                <div className="form-group">
                <label>Address</label>
                <input type="text" name="address" id="address" className="form-control"></input>
                <div className="form-error">{formerrors.address}</div>
                </div>
                <div className="form-group">
                <label>City</label>
                <input type="text" name="city" id="city" className="form-control"></input>
                <div className="form-error">{formerrors.city}</div>
                </div>
                <div className="form-group">
                <label>Pin</label>
                <input type="text" name="pin" id="pin" className="form-control"></input>
                <div className="form-error">{formerrors.pin}</div>
                </div>
                <button onClick={placeOrder}>Place Order</button>
            </form>   
            </div>
    )
}
export default connect(function(state,props){
    return {
        token: state?.user?.token,
        checkout_stage: state?.checkout_stage,
    };
})(Address)