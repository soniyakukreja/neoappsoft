export function FirstMiddleWare(store){
    return function(next){
        return function(action){
            console.log('middleware executed.......')
            // if(){
            //     return next(action)
            // }else{
            //     return action 
            // }

            return next(action)
            
        } 
    }
}

export let logger = store=>next=>action=>{
   
  // console.log('before',action.type,store.getState)
    var result = next(action)
   // console.log('after ',store.getState)
    return result
    
}