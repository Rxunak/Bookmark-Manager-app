import NewUser from "../model/newUserModel.js";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  const { emailAddress, password } = req.body;

  try {
    const user = await NewUser.findOne({ emailAddress });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
};
