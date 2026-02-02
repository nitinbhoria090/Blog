import jwt from "jsonwebtoken"

export const isAuthenticated = async(req, res, next)=>{
    // console.log("your cookies ", req.cookies);
    try {
        const token = req.cookies.token;
        console.log("your token", token)
        if(!token){
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY)
        if(!decode){
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            })  
        }
        
        req.id = decode.userId;

        next()



    } catch (error) {
        console.log(error);
        
    }
}




// import jwt from "jsonwebtoken";

// export const isAuthenticated = (req, res, next) => {
//   try {
//     const token = req.cookies?.token;
//     console.log(" the token is ",token)
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "User not authenticated",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     if (!decoded?.userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token payload",
//       });
//     }

//     req.id = decoded.userId;
//     next();

//   } catch (error) {
//     console.error("Auth error:", error.message);
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };
