import { CombProvider } from "src/context/word";
import MainLayout from "./main";

const GameLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainLayout>
      <CombProvider>
        <div className="flex flex-col h-full">
          <div className="w-full border-b border-slate-300 p-6">
            <div className="flex flex-col gap-2 w-full h-full max-w-[1080px] mx-auto">
              <h1 className="text-5xl font-zillaSlab font-bold">
                Spelling Bee
              </h1>
              <h2 className="text-sm text-black font-light">
                Edited by Leithon English
              </h2>
            </div>
          </div>
          <div className="relative flex-auto flex">{children}</div>
        </div>
      </CombProvider>
    </MainLayout>
  );
};

export default GameLayout;
