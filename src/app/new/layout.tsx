import { ReactNode } from 'react';

interface NewPagelayoutProps {
  children: ReactNode;
}

const NewPagelayout = ({ children }: NewPagelayoutProps) => {
  return (
    <section className="p-5">
      <h1 className="h-12 min-w-max px-2 mb-5 text-2xl border-b border-border">
        새로운 이슈 작성
      </h1>
      <main className="web:grid web:grid-cols-[80px_1fr_auto] flex flex-col gap-3">
        {children}
      </main>
    </section>
  );
};

export default NewPagelayout;
