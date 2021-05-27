import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../util/mongodb";
import mongoose from "mongoose";
// require('../../../models/Project');
// const Project = mongoose.model('projects')

export default async (req, res) => {
    const session = await getSession({req});
    const { userId } = session;
    console.log('userId', userId);

    const { db } = await connectToDatabase();

    const users = await db
        .collection("users")
        .find()
        .toArray();
    console.log('users', users);

    //create project
    // const project = await db
    //     .collection("projects")
    //     .insertOne({
    //         _user: userId,
    //         title: "test title 2",
    //         description: "test description 2",
    //         status: "incomplete"
    //     })

    //get projects
    const project = await db
        .collection("projects")
        .find({_user: userId})
        .toArray();
    console.log('project', project);



    if(session){
        res.send({ data: project });
    } else {
        res.send({ error: "You need to be signed in to view project data" });
    }
}
