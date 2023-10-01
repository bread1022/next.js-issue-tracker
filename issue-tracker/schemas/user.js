export default {
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    {
      title: 'Username',
      name: 'username',
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
      title: 'title',
      name: 'name',
      avatar: 'avatar',
    },
    prepare(selection) {
      const {title, name} = selection
      return {
        title: title,
        subtitle: name,
      }
    },
  },
}
