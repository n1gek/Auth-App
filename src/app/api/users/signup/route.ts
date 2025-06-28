import {connect} from '@/dbconfig/dbconfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';


export async function POST(request: NextRequest) {
    try {
        await connect(); 
        
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email: email });

        if (user) {
            return NextResponse.json({error: 'User already exists with this email'},
            { status: 400 });
        }

        //hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });

        //now save the user in the database
        const savedUser = await newUser.save();
        console.log('User created successfully:', savedUser);

        //send verification email
        await sendEmail({email, emailTtype: "VERIFY", userId: savedUser._id})


        return NextResponse.json({ message: 'User created successfully', success: true },
        { status: 201 });



        
    } catch (error: any) {
        console.error('Error in POST request:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' },
        { status: 500 });
    }
}
