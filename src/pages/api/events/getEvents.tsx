import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const events = await prisma.event.findMany({
      include: {
        user: {
          select: {
            name: true,
            //Rajouter le photo
          }
        }
      }
    });

    console.log(events)
    res.status(200).json(events);
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
