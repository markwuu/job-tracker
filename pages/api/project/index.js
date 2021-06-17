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

            //get logs
            const projectLogs = await db
                .collection("logs")
                .find({_user: userId, type: 'project'})
                .toArray();

            const data = {
                projects: projects.reverse(),
                logs: projectLogs.reverse()
            }

            res.send({ data });
        } else {
            res.send({ error: "You need to be signed in to view project data" });
        }
    } else if (req.method === 'POST') {
        const session = await getSession({req});

        if(session) {
            const { userId } = session;
            const { db } = await connectToDatabase();
            const { name, description} = req.body;

            // create project
            const newProject = await db
                .collection("projects")
                .insertOne({
                    _user: userId,
                    title: name,
                    slugTitle: name.replace(/ /g, "-").toLowerCase(),
                    description: description,
                    status: "incomplete"
                });

            // create log
            const newLog = await db
                .collection("logs")
                .insertOne({
                    _user: userId,
                    type: 'project',
                    description: `${name} project created`
                });

            res.send({ data: null });
        } else {
            res.send({ error: "You need to be signed in to view project data" });
        }
    }
}
