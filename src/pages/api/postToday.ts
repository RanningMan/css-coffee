import { Post } from 'components/components.interface';
import type { NextApiRequest, NextApiResponse } from 'next'
import getPosts from 'utils/getPosts';

type Data = {
  content?: Post;
  error?: string;
}

// GET postToday?locale={locale}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {locale} = req.query;
    if(req.method !== 'GET') {
        res.status(404).json({error: 'Not Implemented!'});
    }
    if(!locale || Array.isArray(locale)) {
        res.status(404).json({error: 'Invalid query param!'});
    } else {
        const posts = await getPosts(new Date(), new Date(), locale);
        if(posts.length !== 1) {
          res.status(500).json({error: 'Something went wrong!'});
        }
        res.status(200).json({ content: posts[0] });
    }
}