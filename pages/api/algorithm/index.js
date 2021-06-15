import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

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

            res.send({ data: algorithms.reverse() });
        } else {
            res.send({ error: "You need to be signed in to view job data" });
        }
    } else if (req.method === 'POST') {
        const session = await getSession({req});

        if(session) {
            const { userId } = session;
            const { db } = await connectToDatabase();
            console.log('req.body', req.body);

            // create job
            const newAlgorithm = await db
                .collection("algorithms")
                .insertOne({
                    _user: userId,
                    name: req.body.name,
                    slugTitle: req.body.name.replace(" ", "-"),
                    description: req.body.description,
                })
                .then((res) => {
                    console.log('res', res.ops[0]._id);
                })

            res.send({ data: null });
        } else {
            res.send({ error: "You need to be signed in to view project data" });
        }
    }
}
