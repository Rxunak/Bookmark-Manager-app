import NewUser from "../model/newUserModel.js";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  const { emailAddress, password } = req.body;
  console.log(password);

  try {
    const user = await NewUser.findOne({ emailAddress });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(user.password);
    console.log(isMatch);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in" });
  }
};
