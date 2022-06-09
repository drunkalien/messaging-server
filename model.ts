import * as mongoose from "mongoose";

interface IMessage {
  from: String;
  to: String;
  title: String;
  body: String;
}

const MessageSchema = new mongoose.Schema<IMessage>({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Message", MessageSchema);
