export const initialStore=()=>{
  return{
    token: localStorage.getItem('token') || null,
    user: null
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'login_success':
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user
      };
      
    case 'logout':
      localStorage.removeItem('token');

      return {
        ...store,
        token: null,
        user: null
      };
    default:
      throw Error('Unknown action.');
  }    
}
