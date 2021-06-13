const initState = []

export const postReducer = (state=initState,action)=>{
    console.log("postReducer ran")
    switch(action.type){
        case 'FETCH_POST':
            return action.payload

        case 'CREATE_POST':
            return [...state,action.payload]
        case 'UPDATE_POST':
        case 'LIKE_POST':
            return state.map(data=>data._id===action.payload._id?action.payload:data);
        case 'DELETE_POST':
            return state.filter(data=>data._id!==action.payload)
        default :
        return state;
    }

}

export const loadReducer = (state=false,action)=>{
    switch(action.type){
        case 'LOADING':
            console.log(state)
            return  true
        case 'NOTLOADING':
            console.log(state)
            return false
        default:
            return state
    }
}