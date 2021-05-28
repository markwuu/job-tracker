import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    console.log('req', req.query.id);
    const slug = req.query.id;
    const session = await getSession({req});
    if(session){
        const { userId } = session;
        const { db } = await connectToDatabase();

        //get project
        const project = await db
            .collection("projects")
            .find({_user: userId, slugTitle: slug})
            .toArray();
        console.log('project', project);

        res.send({ data: project });
    } else {
        res.send({ error: "You need to be signed in to view project data" });
    }
}
