const communities = {
  id: "string",
  name: "string",
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
    },
  ],
  posts: [
    {
      id: "string",
      title: "string",
      category: "string",
      initialUpdate: "string",
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
  id: "string",
  name: "string",
  joinedCommunities: [
    {
      id: "string",
      name: "string",
      isAdmin: "boolean",
    },
  ],
};
