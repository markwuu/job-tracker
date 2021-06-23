import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";
import mongoose from 'mongoose';

export default async (req, res) => {

    if (req.method === 'GET') {
        const session = await getSession({req});
        if(session) {
            const { userId } = session;
            const { db } = await connectToDatabase();

            //get algorithms
            const users = await db
                .collection("users")
                .findOne({_id: mongoose.Types.ObjectId(userId)});
            console.log('users', users);

            const data = {
                algorithms: users.algorithms,
                jobs: users.jobs,
                projects: users.projects
            }

            res.send({ data });
        } else {
            res.send({ error: "You need to be signed in to view job data" });
        }
    }
}
