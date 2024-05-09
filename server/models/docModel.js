import mongoose from "mongoose";

const docSchema = new mongoose.Schema(
  {
    ownerId: { type: String, required: true },
    owner: { type: String, required: true },
    sharedWithId: {type: String, required: true},
    sharedWithEmail: {type: String, required: true},
    fileType: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    file: { type: Object, required: true },
  },
  { timestamps: true }
);

const Document = mongoose.model("document", docSchema);

export default Document;
