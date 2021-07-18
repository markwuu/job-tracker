import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";
import mongoose from 'mongoose';

export default async (req, res) => {

    if (req.method === 'GET') {
        const session = await getSession({req});
        if(session) {
            const { userId } = session;
            const { db } = await connectToDatabase();

            //get settings
            const settings = await db
                .collection("settings")
                .find({_user: userId})
                .toArray();

            const data = {
                settings
            }

            res.send({ data });
        } else {
            res.send({ error: "You need to be signed in to view settings data" });
        }
    } else if (req.method === 'POST') {
        const session = await getSession({req});

        if(session) {
            const { userId } = session;
            const { db } = await connectToDatabase();
            const { name } = req.body;

            // update user profile
            const user = await db
                .collection("users")
                .findOneAndUpdate(
                    { _id: mongoose.Types.ObjectId(userId) },
                    { $set: {"name": name } }
                );

            res.send({ data: null });
        } else {
            res.send({ error: "You need to be signed in to view project data" });
        }
    }
}
