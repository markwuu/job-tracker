import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";
import mongoose from 'mongoose';

export default async (req, res) => {
    if (req.method === 'GET') {
        const slug = req.query.id;
        const session = await getSession({req});
        if(session){
            const { userId } = session;
            const { db } = await connectToDatabase();

            //get job
            const job = await db
                .collection("jobs")
                .find({_user: userId, slugTitle: slug})
                .toArray();

            res.send({ data: job });
        } else {
            res.send({ error: "You need to be signed in to view job data" });
        }
    } else if (req.method === 'POST') {
        const slug = req.query.id;
        const session = await getSession({req});
        if(session){
            const { userId } = session;
            const { db } = await connectToDatabase();
            const { id, company, description, offer, status, website} = JSON.parse(req.body);

            //update job
            const updatedJob = await db
                .collection("jobs")
                .findOneAndUpdate(
                    {_id: mongoose.Types.ObjectId(id)},
                    {$set: {
                        company,
                        description,
                        status,
                        offer,
                        website
                    }}
                )
            console.log('updatedJob', updatedJob);

            res.send({ data: null });
        } else {
            res.send({ error: "You need to be signed in to view project data" });
        }
    }
}
