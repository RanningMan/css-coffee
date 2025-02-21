import { NextApiRequest, NextApiResponse } from "next";
import cors, { runMiddleware } from "../../utils/cors";
import { Post } from "components/components.interface";
import getPosts from "utils/getPosts";

type Data = {
  content?: Post[];
  error?: string;
};

// GET posts?start=${startOrder}&limit={number}&locale={locale}
// today start is 0
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  const { start = "0", limit = "5", locale = "en-US" } = req.query;
  const startIndex = parseInt(start as string);
  const limitCount = parseInt(limit as string);

  const posts = await getPosts(
    startIndex,
    startIndex + limitCount - 1,
    locale as string
  );

  res.status(200).json({ content: posts });
}
