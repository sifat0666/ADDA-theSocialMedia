import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { allPostsQuery } from "../../../utils/queries";

export default async function handler (req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'GET'){
        const query = allPostsQuery()
        const data = await client.fetch(query)

        res.json(data)
        // res.end()
    }else if(req.method === 'POST'){
        const data = req.body

        client.create(data)
        .then(() => res.status(200).json('created'))
    }

}
