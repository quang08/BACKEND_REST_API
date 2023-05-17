import { merge } from "lodash";
import { getUserBySessionToken } from "../db/user";
import express from "express";

/* Check is authenticated
 - extract session token
 - check if there's an exisiting user
 - If yes, add the user's identity to the request object and allows route handlers to access the user's identity through req.identity.
 */

const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["RESTAPI-AUTH"];

    if (!sessionToken) return res.sendStatus(403);

    const exisitingUser = await getUserBySessionToken(sessionToken);

    if (!exisitingUser) return res.sendStatus(403);

    merge(req, { identity: exisitingUser });
    
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};
