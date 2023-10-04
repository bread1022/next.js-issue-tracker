import { ReactNode } from 'react';

interface NewPagelayoutProps {
  children: ReactNode;
}

const NewPagelayout = ({ children }: NewPagelayoutProps) => {
  return (
    <section className="px-4">
      <h1 className="h-12 min-w-max my-3 text-2xl leading-[48px]">
        새로운 이슈 작성
      </h1>
      {children}
    </section>
  );
};

export default NewPagelayout;
