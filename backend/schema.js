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
      initialUpdate: "string",
      coordinates: {
        latitude: "number",
        longitude: "number",
      },
      postedBy: {
        id: "string",
        name: "string",
      },
      updates: [
        {
          id: "string",
          update: "string",
        },
      ],
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
