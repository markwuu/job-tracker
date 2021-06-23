import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";
import mongoose from 'mongoose';

export default async (req, res) => {

    if (req.method === 'GET') {
        const session = await getSession({req});
        if(session) {
            const { userId } = session;
            const { db } = await connectToDatabase();

            //get jobs
            const jobs = await db
                .collection("jobs")
                .find({_user: userId})
                .toArray();

            //get logs
            const projectLogs = await db
                .collection("logs")
                .find({_user: userId, type: 'job'})
                .toArray();

            const data = {
                jobs: jobs.reverse(),
                logs: projectLogs.reverse()
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
            const { company, description} = req.body;

            // create job
            const newJob = await db
                .collection("jobs")
                .insertOne({
                    _user: userId,
                    company: company,
                    slugTitle: company.replace(" ", "-"),
                    description: description,
                });

            // create log
            const newLog = await db
                .collection("logs")
                .insertOne({
                    _user: userId,
                    type: 'job',
                    description: `Applied to ${company}`
                });

            // update user profile metric
            const user = await db
                .collection("users")
                .findOneAndUpdate({ _id: mongoose.Types.ObjectId(userId) }, { $inc: { "jobs": 1 } });

            res.send({ data: null });
        } else {
            res.send({ error: "You need to be signed in to view project data" });
        }
    }
}
