export default {
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    {
      title: 'UserId',
      name: 'userId',
      type: 'string',
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'Avatar',
      name: 'avatar',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'avatar',
      userId: 'userId',
      avatar: 'avatar',
    },
    prepare(selection) {
      const {avatar, userId} = selection
      return {
        title: avatar,
        subtitle: userId,
      }
    },
  },
}
