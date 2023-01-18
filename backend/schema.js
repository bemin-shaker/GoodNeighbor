const communities = {
  id: "string",
  name: "string",
  coordinates: {
    latitude: "number",
    longitude: "number",
  },
  memberCount: "number",
  members: [
    {
      id: "string",
      name: "string",
    },
  ],
  admins: [
    {
      id: "string",
      name: "string",
      isAdmin: "boolean",
    },
  ],
  posts: [
    {
      id: "string",
      title: "string",
      category: "string",
      image: "string",
      initialUpdate: "string",
      location: {
        latitude: "number",
        longitude: "number",
      },
      postedBy: {
        usersEmail: "string",
      },
      updates: [
        {
          id: "string",
          update: "string",
        },
      ],
      initialTimestamp: "int",
      timeSinceLastUpdate: "int",
    },
  ],
};

const users = {
  userId: "string",
  full_name: "string",
  email: "string",
  joinedCommunities: [
    {
      communityId: "string",
      admin: "boolean",
    },
  ],
};
