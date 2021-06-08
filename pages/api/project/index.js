import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {

    if (req.method === 'GET') {
        const session = await getSession({req});
        if(session) {
            const { userId } = session;
            const { db } = await connectToDatabase();

            //get projects
            const projects = await db
                .collection("projects")
                .find({_user: userId})
                .toArray();

            res.send({ data: projects.reverse() });
        } else {
            res.send({ error: "You need to be signed in to view project data" });
        }
    } else if (req.method === 'POST') {
        const session = await getSession({req});

        if(session) {
            const { userId } = session;
            const { db } = await connectToDatabase();
            console.log('req.body', req.body);

            // create project
            const newProject = await db
                .collection("projects")
                .insertOne({
                    _user: userId,
                    title: req.body.name,
                    slugTitle: req.body.name.replace(" ", "-"),
                    description: req.body.description,
                    status: "incomplete"
                });

            res.send({ data: null });
        } else {
            res.send({ error: "You need to be signed in to view project data" });
        }
    }
}
