import { HTMLAttributes } from 'react';
import TextArea from '../../Common/TextArea';
import MarkDownViewer from '@/components/Common/MarkdownViewer';

interface CommentEditorProps extends HTMLAttributes<HTMLTextAreaElement> {
  isEdit: boolean;
  comment: string;
}

const CommentEditor = ({ isEdit, comment, ...rest }: CommentEditorProps) => {
  return (
    <>
      {isEdit ? (
        <>
          <TextArea
            id="issue-comment-edit"
            placeholder="코맨트를 입력하세요."
            value={comment}
            half
            {...rest}
          />
        </>
      ) : (
        <div className="rounded-b-lg p-3 bg-white">
          <MarkDownViewer content={comment} />
        </div>
      )}
    </>
  );
};

export default CommentEditor;
