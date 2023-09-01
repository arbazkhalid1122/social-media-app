import { NextApiRequest, NextApiResponse } from "next";
import { AddUser } from "../../schema/schema";
import db from "../../db/db";
import { v4 as uuidv4 } from "uuid";

type ResponseData = {
  success: boolean;
  result: any;
};

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await db();
    const data = await AddUser.find();
    res.status(200).json({ result: data, success: true });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({
      success: false,
      result: undefined,
    });
  }
}

async function handlePost(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await db();
    const { name, email, username, password } = req.body;
    const users = await AddUser.find({ username: username });
    console.log(users);
    const _id = uuidv4();
    if (users.length) {
      res
        .status(409)
        .json({ result: "name or email already axist", success: false });
    } else {
      const newUser = new AddUser({ _id, name, email, username, password });
      const savedUser = await newUser.save();
      res.status(201).json({ result: savedUser, success: true });
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
  if (req.method === "GET") {
    await handleGet(req, res);
  } else if (req.method === "POST") {
    await handlePost(req, res);
  } else {
    res.status(405).json({
      success: false,
      result: undefined,
    });
  }
}
