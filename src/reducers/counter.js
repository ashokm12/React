const counterReducer = (state=0, action) => {

    switch(action.type) {
      case "INCREMENT": 
        return state + action.payload;
      case "DECREMENT": {
        if(action.payload){
          return state -  action.payload;
        }
        return state - 1;
      }
      default:
          return state;
    }
  }
  
  export default counterReducer;