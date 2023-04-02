import { sessionOptions } from "@/common";
import { User } from "@/data";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  req.session.destroy();
  res.json({ isLoggedIn: false, email: "" });
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);
