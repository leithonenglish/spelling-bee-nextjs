import { ReactNode } from 'react';

export default function GameLayout({ children }: { children?: ReactNode }) {
  return (
    <div className='flex h-full flex-col'>
      <div className='w-full border-b border-slate-300 p-6'>
        <div className='mx-auto flex h-full w-full max-w-[1080px] flex-col gap-2'>
          <h1 className='font-zillaSlab text-5xl font-bold'>Spelling Bee</h1>
          <h2 className='text-sm font-light text-black'>
            Edited by Leithon English
          </h2>
        </div>
      </div>
      <div className='relative flex flex-auto'>{children}</div>
    </div>
  );
}
