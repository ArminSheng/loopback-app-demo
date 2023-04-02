import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions, ssgEndpoint } from "@/common";

async function update(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;

  if (!user || !user.id) {
    res.status(401).end();
    return;
  }

  try {
    const { data } = await ssgEndpoint.request<any[]>({
      url: `/reservations/${req.query.id}`,
      method: req.method || "get",
      data: req.body.data,
      params: req.query,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    // .catch((d) => console.log(d.data.error));

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message, error });
  }
}

export default withIronSessionApiRoute(update, sessionOptions);
