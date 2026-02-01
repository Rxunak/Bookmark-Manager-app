import NewUser from "../model/newUserModel.js";

export const createUser = async (req, res) => {
  console.log("Running");
  try {
    const userData = new NewUser(req.body);
    const { fullName } = userData;

    const userExist = await NewUser.findOne({ fullName });
    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const savedUser = await userData.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
