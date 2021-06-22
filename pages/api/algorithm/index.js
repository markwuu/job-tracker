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
            const algorithms = await db
                .collection("algorithms")
                .find({_user: userId})
                .toArray();

            //get logs
            const algorithmLogs = await db
                .collection("logs")
                .find({_user: userId, type: 'algorithm'})
                .toArray();

            const data = {
                algorithms: algorithms.reverse(),
                logs: algorithmLogs.reverse()
            }

            res.send({ data });
        } else {
            res.send({ error: "You need to be signed in to view job data" });
        }
    } else if (req.method === 'POST') {
        const session = await getSession({req});

        if(session) {
            const { userId } = session;
            const { db } = await connectToDatabase();
            const { name, description} = req.body;

            // create algorithm
            const newAlgorithm = await db
                .collection("algorithms")
                .insertOne({
                    _user: userId,
                    name: name,
                    slugTitle: name.replace(" ", "-"),
                    description: description,
                });

            // create log
            const newLog = await db
                .collection("logs")
                .insertOne({
                    _user: userId,
                    type: 'algorithm',
                    description: `${name} algorithm created`
                });

            // update user profile metric
            const user = await db
                .collection("users")
                .findOneAndUpdate({ _id: mongoose.Types.ObjectId(userId) }, { $inc: { "algorithms": 1 } });

            res.send({ data: null });
        } else {
            res.send({ error: "You need to be signed in to view project data" });
        }
    }
}
