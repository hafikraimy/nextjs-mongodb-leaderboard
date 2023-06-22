import Entry from '../../../models/Entry';
import dbConnect from '../../../db/connect';
import { StatusCodes } from 'http-status-codes';
import { readFile } from 'fs/promises';

dbConnect();

const handler = async (req, res) => {
  try {
    await Entry.deleteMany();
    const jsonProducts = JSON.parse(
      await readFile(
        new URL('../../../components/MOCK_DATA-1.json', import.meta.url)
      )
    );

    await Entry.create(jsonProducts)
    res.status(StatusCodes.CREATED).json({ msg: 'Success!!!' })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
};

export default handler;
