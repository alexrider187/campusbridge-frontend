export type ResourceType = {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  course: string;
  uploader: {
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
};
