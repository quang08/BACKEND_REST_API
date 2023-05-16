//Authentication controllers: handles the incoming HTTP requests, acts as an intermediary between the client (usually a frontend application) and the backend services or data.

import express from "express";
import { authentication, random } from "helpers";
import { createUser, getUserByEmail } from "db/user";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({
        message: "Missing username, email or password",
      });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).send({
        message: "User already exists",
      });
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

// export const login = async (req: express.Request, res: express.Response) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).send({
//                 message: "Missing email or password",
//             });
//         }

//         const user = (await getUserByEmail(email)).select('+authentication.password +authentication.salt');
//     }
// }
