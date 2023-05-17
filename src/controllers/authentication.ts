//Authentication controllers: handles the incoming HTTP requests, acts as an intermediary between the client (usually a frontend application) and the backend services or data.

import express from "express";
import { authentication, random } from "../helpers";
import { createUser, getUserByEmail } from "../db/user";

/*Login:
- validates the user's credentials
  - retrieve email, password from req.body and validate
  - retrieve the user document and select user.authentication.salt to later get the expected hash
  - validate password:
    - expected hash: authentication(user.authentication.salt, password) 
    - compare user typed password to the hash
- generates session token for authed user
  - generate a random salt
  - access user.authentication.sesstionToken and assign it with authentication(salt, user._id.toString())
- saves the token to the user document
  - await user.save()
- sets a cookie containing the token and sends respsonse indicating success / failure
  - res.cookie(name, val, path)
  - return res.status(200).json(user).end()
*/

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "Missing email or password",
      });
    }

    //user retrieval
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(400).send({
        message: "No user found",
      });
    }

    // password validation
    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) return res.sendStatus(403);

    //session management
    const salt = random();

    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    //cookie and response handling
    res.cookie("RESTAPI-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (e) {
    console.log(e);
    return res.status(400);
  }
};

/* Registration
- validates user's credentials
  - retrieve username, email, password from the request body and validate them
- valdidates user's existence
  - use the retrieved email with getUserByEmail to see if there's smt returned
  - if yes then throw a 400
- generate a random salt
  - const salt = random();
- create a new user and put generated salt in the user's document
  - use createuser({username, email, authentication: {salt, password: authentication(salt, password)}})
  - have to hash the user's registered password
*/

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

    return res.status(200).json(user).end();
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};
