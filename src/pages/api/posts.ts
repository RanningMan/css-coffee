import { Post } from 'components/components.interface';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getDaysAgo } from 'utils/getDates';
import getPosts from 'utils/getPosts';

type Data = {
  content?: Post[];
  error?: string;
}

// GET posts?start=${startday}&limit={number}&locale={locale}
// today start is 0
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {start, limit, locale} = req.query;
    if(req.method !== 'GET') {
        res.status(404).json({error: 'Not Implemented!'});
    }
    if(!locale || Array.isArray(locale)) {
        res.status(404).json({error: 'Invalid query param!'});
    } else if(!start || Array.isArray(start)) {
        res.status(404).json({error: 'Invalid query param!'});
    } else if(!limit || Array.isArray(limit)) {
        res.status(404).json({error: 'Invalid query param!'});
        return;
    } else {
        let startInt = parseInt(start);
        let limitInt = parseInt(limit);
        let endDay = getDaysAgo(startInt);
        let startDay = getDaysAgo(startInt + limitInt);
        const posts = await getPosts(startDay, endDay, locale);
        res.status(200).json({ content: posts });
    }
}