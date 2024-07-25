// pages/api/events.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }


    if (!req.body.session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

  const { title, types, startDate, endDate, time, location, description, ticketLink } = req.body;

  try {
    const event = await prisma.event.create({
      data: {
        title,
        types: {
          connect: types.map((type: string) => ({ name: type })),
        },
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        time,
        location,
        description,
        ticketLink,
        user: {
          connect: { email: req.body.session.user?.email },
        },
      },
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Erreur lors de la création de l'événement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
