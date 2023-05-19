import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const results = JSON.parse(req.body);
    const ballots = await prisma.ballot.findMany({
      where: {
        il_adi: results.city_name,
        ilce_adi: results.district_name,
        muhtarlik_adi: results.neighborhood_name,
        sandik_alani_adi: results.school_name,
      },
    });

    res.json(ballots);
  }
};
