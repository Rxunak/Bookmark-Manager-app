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
    console.log(savedBookmark);
    res.status(200).json(savedBookmark);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const fetch = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();

    if (bookmarks.length === 0) {
      return res.status(404).json({ message: "Bookmark not found" });
    }
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBookmark = async (req, res) => {
  try {
    const id = req.params.id;
    const bookmarkExist = await Bookmark.findOne({ _id: id });

    if (!bookmarkExist) {
      return res.status(404).json({ message: "Bookmark Not Found." });
    }

    const updateBookmark = await Bookmark.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateBookmark);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const archiveBookmark = async (req, res) => {
  try {
    const id = req.params.id;
    const bookmarkExist = await Bookmark.findOne({ _id: id });

    if (!bookmarkExist) {
      return res.status(404).json({ message: "Bookmark Not Found." });
    }

    const archiveBookmark = await Bookmark.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(archiveBookmark);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const pinBookmark = async (req, res) => {
  try {
    const id = req.params.id;
    const bookmarkExist = await Bookmark.findOne({ _id: id });

    if (!bookmarkExist) {
      return res.status(404).json({ message: "Bookmark Not Found." });
    }

    const pinBookmark = await Bookmark.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(pinBookmark);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteBookmark = async (req, res) => {
  try {
    const id = req.params.id;
    const bookmarkExist = await Bookmark.findOne({ _id: id });

    if (!bookmarkExist) {
      return res.status(404).json({ message: "User Not Found." });
    }

    await Bookmark.findByIdAndDelete(id);
    res.status(200).json({ message: "Bookmark Deleted Succesfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
