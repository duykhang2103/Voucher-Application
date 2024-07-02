import Event, { IEvent } from "./event.model";

export const EventResolver = {
  Query: {
    events: async () => {
      const events = await Event.find();
      return events;
    },
    eventById: async (_: any, { _id }: { _id: string }) => {
      const event = await Event.findById(_id);
      return event;
    },
  },

  Mutation: {
    createEvent: async (_: any, { event }: { event: IEvent }) => {
      const { name, date, location, description, quantity } = event;

      const newEvent = await Event.create({
        name,
        date,
        location,
        description,
        quantity,
      });
      return newEvent;
    },

    startEdittingEvent: async (_: any, { _id }: { _id: string }) => {
      const eventExists = await Event.findById(_id);
      if (!eventExists) {
        throw new Error("Event not found");
      }
      if (eventExists.isEditting) {
        throw new Error("Event is being edited");
      }
      eventExists.isEditting = true;
      eventExists.expiredEdittingDate = new Date(Date.now() + 60000 * 5); // 5 minute
      await eventExists.save();
      return true;
    },

    checkStillEditting: async (_: any, { _id }: { _id: string }) => {
      const eventExists = await Event.findById(_id);
      if (!eventExists) {
        throw new Error("Event not found");
      }
      if (
        eventExists.expiredEdittingDate &&
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
    },

    updateEvent: async (_: any, { event }: { event: IEvent }) => {
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
    },
  },
};
