export type EventType = {
  _id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  createdAt: string;
};
