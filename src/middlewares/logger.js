export const logger = (store)=>(next)=>(action)=>{
    console.log(store,next,action);
    return next(action);
}