import {connect} from "@/dbconfig/dbconfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";

await connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log("Received token:", token);

        // find user by token 
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if (!user) {
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400});
        }

        console.log(user)

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({message: "Email Verified", success: true})
        
    } catch (error: any) {
        console.error("Error in POST /api/users/verifyemail:", error.message);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}


