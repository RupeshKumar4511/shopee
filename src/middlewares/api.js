//custom api middleware
export const api = ({dispatch})=>(next)=>(action)=>{
    
    const BASE_URL = 'https://fakestoreapi.com'
    if(action.type==='api/makeCall'){
        next(action); // to show it in the redux devtool
        const {url,onStart,onSuccess,onError } = action.payload;
        console.log(action.payload)

        dispatch({type:onStart})

        fetch(`${BASE_URL}/${url}`)
          .then(response => response.json())
          .then(data => 
            dispatch({
                type:onSuccess,
                payload:data
            }
          )).
          catch(()=>dispatch({
            type:onError
          }));
    }else{
        return next(action);
    }
    
}


export const fetchedData = (payload)=> ({type:'api/makeCall',payload})