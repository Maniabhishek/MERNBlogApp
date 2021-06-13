export const authReducer = (state={profile:[],token:''},action) =>{
    switch(action.type){
        case 'AUTH':
            localStorage.setItem('profile',JSON.stringify(action.payload));
            return {...state,profile:action.payload.result,token:action.payload.token}
        case 'LOGOUT':
            localStorage.clear();
            return {profile:null,token:null}
        default :
            return state
    }
}