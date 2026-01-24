import Bookmark from "../model/bookmarkModel.js";

export const createBookmark = async (req, res) => {
  try {
    const bookmarkData = new Bookmark(req.body);
    const { title } = bookmarkData;

    const bookmarkExist = await Bookmark.findOne({ title });
    if (bookmarkExist) {
      return res.status(400).json({ message: "Bookmark already exists." });
    }

    const savedBookmark = await bookmarkData.save();
    res.status(200).json(savedBookmark);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const fetch = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();

    if (bookmarks.length === 0) {
      return res.status(404).json({ message: "Bookmarks not found" });
    }
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
