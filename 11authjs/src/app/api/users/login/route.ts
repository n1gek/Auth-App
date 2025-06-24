import {connect} from '@/dbconfig/dbconfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function POST(request: NextRequest) {
    // Ensure the database is connected
    await connect();

    try {
        const reqBody  = await request.json();
        const {email, password} = reqBody;
        
        //check if user exists 
        const user = await User.findOne({email});

        //if user not found 
        if (!user) {
            return NextResponse.json({error: 'User not found'}, {status: 404});
        }

        //create token data 
        const tokenData = {
            id: user._id,
            email: user.email,
            name: user.name
        };

        //create token 
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET as string, {
            expiresIn: '1d' // Token expiration time
        });

        const response = NextResponse.json({
            message: 'Login successful',
            success: true,
        });

        response.cookies.set(
            "token", token, {httpOnly: true}
        );

        return response;

        // if password is not correct 
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({error: "Invalid password"}, {status: 401});
        }

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}