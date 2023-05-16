import mongoose from "mongoose";

//create User schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false }, //this field should be excluded from the query results by default.
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

//create User model
export const UserModel = mongoose.model("User", UserSchema);

//create User methods
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  UserModel.findOneAndDelete({ _id: id });
export const upateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);

