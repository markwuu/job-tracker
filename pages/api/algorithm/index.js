import { getSession } from "next-auth/client";

export default async (req, res) => {
    const session = await getSession({req});
    const { userId } = session;

    // Use user id to grab user model and algorithms data


    if(session){
        res.send({ content: "Algorithm overview data" });
    } else {
        res.send({ error: "You need to be signed in to view algorithm data" });
    }
}
