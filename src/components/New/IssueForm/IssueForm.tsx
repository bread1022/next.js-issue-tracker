'use client';

import TextArea from '@/components/Common/TextArea';
import TextInput from '@/components/Common/TextInput';
import CancleBtn from '../CancleBtn';
import { ChangeEvent, useState } from 'react';
import SubmitBtn from '../SubmitBtn';
import SideBar from './SideBar/SideBar';

interface IssueFormProps {}

const IssueForm = ({}: IssueFormProps) => {
  const [value, setValue] = useState('');
  const [text, setText] = useState('');
  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  const isSubmitReady = value.length > 0 && text.length > 0;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSelectMenuItem = (item: string) => {
    setSelectedItem((prev) => {
      if (prev.includes(item)) {
        return prev.filter((value) => value !== item);
      }
      return [...prev, item];
    });
  };

  const handleFormReset = () => {
    setValue('');
    setText('');
  };

  const handleFormSubmit = () => {
    // TODO: POST /api/issues
    console.log('완료');
  };

  return (
    <>
      <form className="w-full flex flex-col gap-2">
        <TextInput
          id="title"
          placeholder="제목"
          value={value}
          onChange={handleInputChange}
        />
        <TextArea
          id="contents"
          placeholder="코멘트를 입력하세요"
          value={text}
          onChange={handleTextAreaChange}
        />
      </form>
      <SideBar selectedItem={selectedItem} onSelect={handleSelectMenuItem} />
      <div className="col-start-2 flex place-content-end">
        <CancleBtn onClick={handleFormReset} />
      </div>
      <div className="h-10 col-start-3">
        <SubmitBtn active={isSubmitReady} onClick={handleFormSubmit} />
      </div>
    </>
  );
};

export default IssueForm;
