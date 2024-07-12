import Event, { IEvent } from "./event.model";
import { EventService } from "./event.service";

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
    eventByName: async (_: any, { name }: { name: string }) => {
      const event = await Event.findOne({ name });
      return event;
    },
  },

  Mutation: {
    createEvent: async (_: any, { event }: { event: IEvent }, context: any) => {
      const { userId } = context;
      const newEvent = await EventService.create(userId, event);
      return newEvent;
    },

    startEdittingEvent: async (_: any, { _id }: { _id: string }) => {
      const isAbleToEdit = await EventService.startEditting(_id);
      return isAbleToEdit;
    },

    checkStillEditting: async (_: any, { _id }: { _id: string }) => {
      const isStillEditting = await EventService.checkStillEditting(_id);
      return isStillEditting;
    },

    updateEvent: async (_: any, { event }: { event: IEvent }) => {
      const updatedEvent = await EventService.update(event);
      return updatedEvent;
    },
  },
};
