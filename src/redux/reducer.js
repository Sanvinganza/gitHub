import * as actionType from "./actionTypes";

const initialState = {
    user:{
        login: null,  
        name: null,
        public_repos: null,
        followers: null,
        following: null,
        userFound: null,
        html_url: null,
        avatar_url: null,
    },
    repositories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_USER:
      return { ...state,
        user: {
            ...state.user,
            login: action.payload.login, 
            name: action.payload.name,
            public_repos: action.payload.public_repos,
            followers: action.payload.followers,
            following: action.payload.following,
            html_url: action.payload.html_url,
            avatar_url: action.payload.avatar_url,
            userFound: true,
        }
     };
    case actionType.USER_NOT_FOUND:
      return { ...state, 
        user: {
            userFound: false,
        }};
    case actionType.ADD_REPOSITORIES:
        return { ...state,
            repositories: action.payload,
        }    
    default:
      return state;
  }
};
