import NewUser from "../model/newUserModel.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const userData = new NewUser(req.body);
    const { fullName, emailAddress, password } = userData;
    const saltRounds = 10;

    const userExist = await NewUser.findOne({ emailAddress });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const savedUser = new NewUser({
      fullName,
      emailAddress,
      password: hashedPassword,
    });
    await savedUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
