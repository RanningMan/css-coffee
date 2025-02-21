import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

// Initialize the cors middleware
const cors = Cors({
  origin: ["http://localhost:3000", "https://csscoffee.dev"],
  methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
