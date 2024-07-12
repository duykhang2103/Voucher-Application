import mongoose from "mongoose";

export interface IEvent {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  date: Date;
  location: string;
  description?: string;
  quantity: number;
  createdBy: mongoose.Schema.Types.ObjectId;
  isEditting?: boolean;
  expiredEdittingDate?: Date;
}

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
    default: "Online",
  },
  description: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isEditting: {
    type: Boolean,
    required: false,
    default: false,
  },
  expiredEdittingDate: {
    type: Date,
    required: false,
    default: Date.now(),
  },
});

const Event = mongoose.model<IEvent>("Event", eventSchema);

export default Event;
