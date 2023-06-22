import Entry from '../../../models/Entry';
import dbConnect from '../../../db/connect';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../../../errors';

dbConnect();
const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { category } = req.query;

        let entries = [];

        if (category && category === 'groupedPoints') {
          entries = await Entry.aggregate([
            {
              $group: {
                _id: '$name',
                totalPoints: { $sum: '$points' },
              },
            },
            {
              $project: {
                _id: 0,
                name: '$_id',
                totalPoints: '$totalPoints',
              },
            },
            {
              $sort: {
                totalPoints: -1,
              },
            },
          ]);
        } else {
          entries = await Entry.find({}).sort({ points: '-1' });
        }

        res.status(StatusCodes.OK).json({ entries });
      } catch (error) {
        console.log(error);
        res.send(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
      }
      break;

    case 'POST':
      try {
        const { name, points } = req.body;
        if (!name || !points) {
          throw new BadRequestError('Please provide all values');
        }

        const entry = await Entry.create({ name, points });
        res.status(StatusCodes.CREATED).json({ entry });
      } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
      }
      break;
  }
};

export default handler;
