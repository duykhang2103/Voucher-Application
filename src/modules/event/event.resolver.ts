import Event from "./event.model";

export const EventResolver = {
  Query: {
    events: async () => {
      const events = await Event.find();
      return events;
    },
    eventById: async (_: any, { _id }: any) => {
      const event = await Event.findById(_id);
      return event;
    },
  },

  Mutation: {
    createEvent: async (_: any, { event }: any) => {
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

    updateEvent: async (_: any, { event }: any) => {
      const { _id, name, date, location, description, quantity } = event;
      const updatedEvent = await Event.findByIdAndUpdate(
        _id,
        { name, date, location, description, quantity },
        { new: true }
      );
      return updatedEvent;
    },
  },
};
