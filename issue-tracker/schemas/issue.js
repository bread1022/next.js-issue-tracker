export default {
  title: 'Issue',
  name: 'issue',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Contents',
      name: 'contents',
      type: 'text',
    },
    {
      title: 'isOpen',
      name: 'isOpen',
      type: 'boolean',
    },
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      title: 'Assignee',
      name: 'assignee',
      type: 'array',
      of: [{type: 'reference', to: {type: 'user'}}],
    },
    {
      title: 'Labels',
      name: 'labels',
      type: 'array',
      of: [{type: 'reference', to: {type: 'label'}}],
    },
    {
      title: 'CommentsBy',
      name: 'commentsBy',
      type: 'array',
      of: [
        {
          title: 'Comment',
          name: 'comment',
          type: 'document',
          fields: [
            {
              title: 'Author',
              name: 'author',
              type: 'reference',
              to: [{type: 'user'}],
            },
            {
              title: 'Comment',
              name: 'comment',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      title: 'Created At',
      name: 'createdAt',
      type: 'datetime',
    },
    {
      title: 'Updated At',
      name: 'updatedAt',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.username',
    },
  },
}
