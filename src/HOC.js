import React, {Component} from 'react';
export const DiscountContext  = React.createContext()


export default function HOC(Hoc){
    return class extends Component{
        render(){
            return (
                <>
                <DiscountContext.Provider value="discountchahiye-gareeb-log" >
                    <p>My High Order Component
                    Inside this component we accept other components data
                    Content given below is dynamic</p>
                    <br/><br/>
                    <Hoc></Hoc>
                    </DiscountContext.Provider>
                </>

            );
        }
    } 
}