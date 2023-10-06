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
      title: 'AvatarUrl',
      name: 'avatarUrl',
      type: 'string',
    },
  ],
  preview: {
    select: {
      userId: 'userId',
      name: 'name',
      email: 'email',
    },
    prepare(selection) {
      const {userId, name, email} = selection
      return {
        title: `@${userId} - ${name}`,
        subtitle: email,
      }
    },
  },
}
