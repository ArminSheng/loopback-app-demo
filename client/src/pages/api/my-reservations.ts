import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions, ssgEndpoint } from "@/common";
import { Roles } from "@/data";

async function myReservs(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  if (!user || !user.id) {
    res.status(401).end();
    return;
  }

  try {
    const { data } = await ssgEndpoint<any[]>(
      user.role === Roles.ADMIN
        ? "/reservations"
        : `/users/${user?.id!}/reservations`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(myReservs, sessionOptions);
