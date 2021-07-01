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
    } else if (req.method === 'POST') {
        const slug = req.query.id;
        const session = await getSession({req});
        if(session){
            const { userId } = session;
            const { db } = await connectToDatabase();
            console.log('req.body', JSON.parse(req.body));
            const { id, title, description, github, website, status, image, video} = JSON.parse(req.body);

            console.log('id', id);

            //update project
            const updatedProject = await db
                .collection("projects")
                .findOneAndUpdate(
                    {_id: mongoose.Types.ObjectId(id)},
                    {$set: {
                        title,
                        description,
                        github,
                        website,
                        status,
                        image,
                        video
                    }}
                )
            console.log('updatedProject', updatedProject);

            res.send({ data: null });
        } else {
            res.send({ error: "You need to be signed in to view project data" });
        }
    }
}
