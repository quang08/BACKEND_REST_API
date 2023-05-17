//authentication helper

import crypto from "crypto";

const SECRET = "REST-API";

//to create random salt
export const random = () => crypto.randomBytes(128).toString("base64");

//helps hashing user's password with salt provided
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
