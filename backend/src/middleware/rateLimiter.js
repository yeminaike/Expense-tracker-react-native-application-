import rateLimit from "../config/upstash.js";


const rateLimiter = async(req, res, next)=> {
try {
    // it could be UserId , ip but we are just using my rate limit in the bracket
    const  {success} = await rateLimit.limit("my-rate-limit")

    if(!success){
        return res.status(429).json({
            message:"Too many requests, Please try again later."
        })
    }

    next()
} catch (error) {
    console.log("Rate limit error", error)
    next(error)
}

}
export default rateLimiter;