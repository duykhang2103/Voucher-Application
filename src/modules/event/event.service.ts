import Event, { IEvent } from "./event.model";

const create = async (event: IEvent) => {
  const { name, date, location, description, quantity } = event;

  const newEvent = await Event.create({
    name,
    date,
    location,
    description,
    quantity,
  });
  return newEvent;
};

const startEditting = async (_id: string) => {
  const eventExists = await Event.findById(_id);
  if (!eventExists) {
    throw new Error("Event not found");
  }
  if (eventExists.isEditting) {
    return false;
  }

  eventExists.isEditting = true;
  eventExists.expiredEdittingDate = new Date(Date.now() + 60000 * 5); // 5 minute
  await eventExists.save();
  return true;
};

const checkStillEditting = async (_id: string) => {
  const eventExists = await Event.findById(_id);
  if (!eventExists) {
    throw new Error("Event not found");
  }
  if (
    !eventExists.expiredEdittingDate ||
    eventExists.expiredEdittingDate < new Date()
  ) {
    eventExists.isEditting = false;
    await eventExists.save();
    return false;
  } else {
    eventExists.expiredEdittingDate = new Date(Date.now() + 60000 * 5); // 5 minute
    await eventExists.save();
    return true;
  }
};

const update = async (event: IEvent) => {
  const { _id, name, date, location, description, quantity } = event;
  const eventExists = await Event.findById(_id);
  if (!eventExists) {
    throw new Error("Event not found");
  }
  if (!eventExists.isEditting) {
    throw new Error("Your session is expired");
  }
  const updatedEvent = await Event.findByIdAndUpdate(
    _id,
    { name, date, location, description, quantity, isEditting: false },
    { new: true }
  );
  return updatedEvent;
};

export const EventService = {
  create,
  startEditting,
  checkStillEditting,
  update,
};
