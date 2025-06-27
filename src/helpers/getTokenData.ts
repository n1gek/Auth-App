import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (request: NextRequest) => {

    try {
        const token = request.cookies.get("token")?.value || "";
        jwt.verify(token, process.env.JWT_SECRET as string);
        const decodedToken = jwt.decode(token)
        return decodedToken as { id: string };

        
    } catch (error:any) {
        throw new Error(error.message);
        
    }
}