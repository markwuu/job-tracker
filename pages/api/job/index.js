import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

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

            res.send({ data: jobs.reverse() });
        } else {
            res.send({ error: "You need to be signed in to view job data" });
        }
    } else if (req.method === 'POST') {
        const session = await getSession({req});

        if(session) {
            const { userId } = session;
            const { db } = await connectToDatabase();
            console.log('sanity check');
            console.log('req.body', req.body);
            console.log('req.body.company');

            // create job
            const newJob = await db
                .collection("jobs")
                .insertOne({
                    _user: userId,
                    company: req.body.company,
                    slugTitle: req.body.company.replace(" ", "-"),
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
