import clsx from 'clsx';

type CombProps = {
  text: string;
  primary?: boolean;
  tapped?: boolean;
};

const Comb = ({
  text,
  primary,
  tapped,
  className,
  ...rest
}: CombProps & React.HTMLAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      viewBox='0 0 120 103.92304845413263'
      className={clsx(
        className,
        'group absolute left-[30%] top-[calc(100%/3)] h-[calc(100%/3)] w-[40%] text-center transition-transform hover:cursor-pointer'
      )}
      {...rest}
    >
      <polygon
        className={clsx(
          { 'fill-amber-300 group-hover:fill-amber-400': primary },
          { 'fill-gray-200 group-hover:fill-gray-300': !primary },
          { 'scale-90 fill-gray-300': tapped && !primary },
          { 'scale-90 fill-amber-400': tapped && primary },
          'origin-center transition group-hover:scale-95 group-active:scale-90'
        )}
        points='0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263'
        stroke='white'
        strokeWidth='7.5'
      ></polygon>
      <text
        className='pointer-events-none text-3xl font-bold uppercase'
        x='50%'
        y='50%'
        dy='0.35em'
        textAnchor='middle'
      >
        {text}
      </text>
    </svg>
  );
};

export default Comb;
