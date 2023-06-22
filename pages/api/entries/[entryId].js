import Entry from '../../../models/Entry';
import dbConnect from '../../../db/connect';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../../../errors';

dbConnect();

const handler = async (req, res) => {
  const { method } = req;
  const { entryId } = req.query;

  switch (method) {
    case 'GET':
      try {
        const entry = await Entry.findById({ _id: entryId })
        res.status(StatusCodes.OK).json({ entry });
      } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
      }
    break;

    case 'PATCH':
      try {
        const { name, points } = req.body;

        if (!name || !points) {
          throw new BadRequestError('Please provide all values')
        }

        const entry = await Entry.findOne({ _id: entryId });
        if (!entry) {
          throw new BadRequestError(`No Entry with Id: ${entryId}`);
        }

        const updatedEntry = await Entry.findOneAndUpdate(
          { _id: entryId },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

        res.status(StatusCodes.OK).json({ updatedEntry });
      } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
      }
      break;

    case 'DELETE':
      try {
        const entry = await Entry.findOne({ _id: entryId });
        if (!entry) {
          throw new NotFoundError(`No entry with Id: ${entryId}`);
        }

        await Entry.findOneAndDelete({ _id: entryId })
        res.status(StatusCodes.OK).json({ msg: 'Success! Entry removed' });
      } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
      }
      break;
  }
};

export default handler;
