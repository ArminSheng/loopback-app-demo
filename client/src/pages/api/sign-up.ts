import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions, ssgEndpoint } from "@/common";
import { User } from "@/data";

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, username, adminSecret } = await req.body;

  try {
    const { data } = await ssgEndpoint.post("/guests/signup", {
      email,
      username,
      password,
      adminSecret,
    });

    const user = data as User;
    user.isLoggedIn = true;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);
