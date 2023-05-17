import { deleteUserById, getUserById, getUsers } from "../db/user";
import express from "express";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.status(200).json(deletedUser);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) return res.sendStatus(400);

    const user = await getUserById(id);

    if (!user) return res.sendStatus(400);

    user.username = username;

    await user.save();

    return res.status(200).json(user).end();
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};
