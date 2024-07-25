// pages/api/eventTypes.js
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';


const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const types = await prisma.eventType.findMany();
    res.status(200).json(types);
  } catch (error) {
    console.error('Error fetching event types:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
