import { useMemo } from "react";

type ProgressBarProps = {
  percentage: number;
};

const ProgressBar = ({ percentage = 0 }: ProgressBarProps) => {
  const progression = useMemo(() => {
    const progressions = [
      {
        text: `Your just getting started`,
        gradient: `from-red-400 to-red-200`,
      },
      { text: `Ooh! Good job!`, gradient: `from-red-500 to-red-300` },
      { text: `Keep it up!`, gradient: `from-cyan-400 to-blue-200` },
      { text: `👏👏🏼👏🏽👏🏿`, gradient: `from-cyan-500 to-blue-300` },
      { text: `🤩 Half-way there!`, gradient: `from-cyan-500 to-blue-500` },
      {
        text: `You're really good at this!`,
        gradient: `from-cyan-500 to-violet-400`,
      },
      {
        text: `Impressive, quite impressive!`,
        gradient: `from-violet-500 to-pink-500`,
      },
      {
        text: `💪🏽 You coming up on the final lap!`,
        gradient: `from-pink-500 to-orange-300`,
      },
      { text: `Almost There!`, gradient: `from-orange-300 to-yellow-300` },
      { text: `🎉 You got em' all!`, gradient: `from-yellow-400 to-amber-400` },
    ];
    const numerator = percentage > 100 ? 100 : percentage < 1 ? 1 : percentage;
    const index = Math.round(numerator / progressions.length);
    return progressions[index === 0 ? index : index - 1];
  }, [percentage]);

  if (!progression) return null;
  return (
    <div className="flex flex-col gap-2 items-center w-full min-w-[200px]">
      <span className="flex-shrink-0 font-bold text-slate-700">
        {percentage === 0 ? `Comon' you can do it!` : progression.text}
      </span>
      <div className="flex-auto w-full h-3 bg-slate-100 rounded-lg">
        {percentage > 0 && (
          <div
            className={`h-3 rounded-lg bg-gradient-to-r transition-[width,backgound] ${progression.gradient}`}
            style={{ width: `${percentage}%` }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
