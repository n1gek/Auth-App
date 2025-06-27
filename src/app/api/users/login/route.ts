import {connect} from '@/dbconfig/dbconfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function POST(request: NextRequest) {
    await connect();

    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        
        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({error: 'User not found'}, {status: 404});
        }

        // Validate password FIRST
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({error: "Invalid password"}, {status: 401});
        }

        // Only create token after successful validation
        const tokenData = {
            id: user._id,
            email: user.email,
            name: user.name
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET as string, {
            expiresIn: '10d'
        });

        const response = NextResponse.json({
            message: 'Login successful',
            success: true,
        id: user._id,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/'
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}