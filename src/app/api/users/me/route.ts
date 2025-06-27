import { getDataFromToken } from "@/helpers/getTokenData";
import { get } from "http";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbconfig/dbconfig";


export async function GET(request: NextRequest) {
  try {
    await connect();

    const { id } = await getDataFromToken(request);
    console.log("ID from token:", id);

    const user = await User.findById(id).select("-password");

    return NextResponse.json({
      message: "User data fetched successfully",
      data: user, // user is a dictionary like { id: "123", email: "us@ple.com", name: "John" }
    });

  } catch (error: any) {
    console.error("Error in /api/users/me:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
