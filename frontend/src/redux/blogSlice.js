// import { createSlice } from "@reduxjs/toolkit";
// import authSlice from "../redux/authSlice.js"

// const blogSlice = createSlice({
//     name:"auth",
//     initialState:{
//         loading:false,
//         user:null,
//         blog:null
//     },
//     reducers:{
//         //actions
//         setLoading:(state, action) => {
//             state.loading = action.payload;
//         },
//         setBlog:(state, action) => {
//             state.blog = action.payload;
//         }
        
//     }
// });
// export const {setLoading, setBlog} = authSlice.actions;
// export default blogSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    loading: false,
    blog:[]
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBlog: (state, action) => {
      state.blog = action.payload;
    }
  }
});

export const { setLoading, setBlog } = blogSlice.actions;
export default blogSlice.reducer;
