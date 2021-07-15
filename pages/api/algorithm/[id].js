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

            //get algorithm
            const algorithm = await db
                .collection("algorithms")
                .find({_user: userId, slugTitle: slug})
                .toArray();

            res.send({ data: algorithm });
        } else {
            res.send({ error: "You need to be signed in to view algorithm data" });
        }
    } else if (req.method === 'POST') {
        const slug = req.query.id;
        const session = await getSession({req});
        if(session){
            const { userId } = session;
            const { db } = await connectToDatabase();
            const { id, name, description } = JSON.parse(req.body);

            //update algorithm
            const updatedAlgorithm = await db
                .collection("algorithms")
                .findOneAndUpdate(
                    {_id: mongoose.Types.ObjectId(id)},
                    {$set: {
                        name,
                        description
                    }}
                )
            console.log('updatedAlgorithm', updatedAlgorithm);

            res.send({ data: updatedAlgorithm });
        } else {
            res.send({ error: "You need to be signed in to view project data" });
        }
    }
}
