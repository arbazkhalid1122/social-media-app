import { NextApiRequest, NextApiResponse } from "next";
import { AddUser } from "../../schema/schema";
import db from "../../db/db";
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt';

type ResponseData = {
  success: boolean;
  result: any;
};

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await db();
    const { username, password } = req.body;

    const user = await AddUser.findOne({ username });
console.log(user.password);

  if (user !== '') {

    
      const isMatch = await bcrypt.compare(password, user.password);
    
    
    if (isMatch) {
      res.status(200).json({ result: true, success: true });
    } else {
      res.status(409).json({ result: 'Invalid password', success: false });
    }
  } else {
    res.status(409).json({ result: 'User not found', success: false });
  }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({
      success: false,
      result: undefined,
    });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    await handlePost(req, res);
  } else {
    res.status(405).json({
      success: false,
      result: undefined,
    });
  }
}
