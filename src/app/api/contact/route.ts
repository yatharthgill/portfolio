import dbConnect from "@/lib/dbconnect";
import UserModel from "@/model/Usermodel";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { name, email, phonenumber } = await request.json();

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Email already exists. Contact you soon.",
                }),
                { status: 200 }
            );
        }

        // Create new user if no existing unverified user with the same email
        const newUser = new UserModel({
            name,
            email,
            phonenumber,
        });

        await newUser.save();

        return new Response(
            JSON.stringify({
                success: true,
                message: "Contact you soon.",
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error:", error);

        return new Response(
            JSON.stringify({
                success: false,
                message: "An error occurred. Please try again later.",
            }),
            { status: 500 }
        );
    }
}
