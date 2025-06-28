import nodemailer from "nodemailer";
import User from "../models/userModel";
import bcrypt from "bcryptjs";


export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10 )
        // find the user by email 

        if (emailType === "verify") {
             await User.findByIdAndUpdate(userId,
            {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000},
            {new: true, runValidators: true})
        } else if (emailType === "reset") {
            await User.findByIdAndUpdate(userId,
                {forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000}) 
        } 
        // Create a transporter object
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
            });

        const mailOptions = {
            from: "tnashe.zw@gmail.com",
            to: email,
            subject: emailType === "verify" ? "Verify your account" : "Reset your password",
            html: `
                <p>
                    Click 
                    <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
                        here
                    </a> 
                    to ${emailType === "verify" ? "verify your account" : "reset your password"}, 
                    or copy and paste this link in your browser:
                </p>
                <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
                <p>This link will expire in 1 hour.</p>
            `
        };


        const mailResponse = await transport.sendMail(mailOptions);
        console.log("Email sent successfully!", mailResponse.response); 
        return mailResponse;

            
    } catch (error: any) {
        console.error("Error sending the email!", error.message);
        
    }
}