import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <div className='relative mt-[5%] flex items-center justify-center px-10'>
        <span className='text-[clamp(5rem,24vw+1rem,15rem)] font-bold'>4</span>
        <svg
          viewBox='0 0 120 103.92304845413263'
          className='h-[clamp(5rem,21vw+1rem,13rem)] text-center'
        >
          <polygon
            className='fill-amber-300'
            points='0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263'
            stroke='white'
            strokeWidth='7.5'
          ></polygon>
        </svg>
        <span className='text-[clamp(5rem,24vw+1rem,15rem)] font-bold'>4</span>
        <div className='absolute top-[12%] ml-[10%] h-[clamp(2rem,10vw+1rem,3rem)] w-[clamp(2rem,10vw+1rem,3rem)]'>
          <Image src='/bee.png' layout='fill' alt='bee' />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-center text-2xl font-light text-slate-700'>
          It seems you have strayed from the hive!
        </p>
        <Link
          href='/'
          className='mx-auto font-zillaSlab text-2xl text-amber-400 underline'
        >
          Head back home
        </Link>
      </div>
    </div>
  );
}
