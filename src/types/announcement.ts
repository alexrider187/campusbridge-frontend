export type AnnouncementType = {
  _id: string;
  title: string;
  content: string;
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  createdAt: string;
};
