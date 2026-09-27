import { useEffect, useState } from "react";
import explosionImage from "./explosion.svg";

const START_TIME = 10;

function pickCorrectWire() {
  return Math.random() < 0.5 ? "red" : "blue";
}

export default function App() {
  const [time, setTime] = useState(START_TIME);
  const [result, setResult] = useState(null);
  const [correctWire, setCorrectWire] = useState(pickCorrectWire);

  // 選択するか0秒になるまで、1秒ずつ減らす
  useEffect(() => {
    if (result !== null || time === 0) return;

    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, result]);

  function cutWire(color) {
    if (result !== null || time === 0) return;
    setResult(color === correctWire ? "safe" : "boom");
  }

  function restart() {
    setTime(START_TIME);
    setResult(null);
    setCorrectWire(pickCorrectWire());
  }

  const outcome = result ?? (time === 0 ? "boom" : null);

  if (outcome === "safe") {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center bg-green-200 px-4 text-center text-green-950">
        <h1 className="text-7xl font-black sm:text-9xl">SAFE</h1>
        <p className="mt-5 text-lg font-bold">解除成功！</p>
        <button type="button" onClick={restart} className="mt-10 rounded-full bg-green-900 px-8 py-4 font-bold text-white">
          もう一度プレイ
        </button>
      </main>
    );
  }

  if (outcome === "boom") {
    return (
      <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 text-center text-white">
        <img src={explosionImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10">
          <p className="font-bold">{time === 0 ? "時間切れ" : "選択ミス"}</p>
          <h1 className="mt-3 text-7xl font-black sm:text-9xl">BOOM!</h1>
          <button type="button" onClick={restart} className="mt-10 rounded-full bg-white px-8 py-4 font-bold text-red-950">
            もう一度プレイ
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-black px-4 py-8 text-center text-white">
      <p className="mb-4 text-sm font-bold tracking-widest text-gray-400">残り時間</p>

      <div className="flex h-56 w-56 flex-col items-center justify-center rounded-full border-8 border-white sm:h-72 sm:w-72">
        <span className="text-8xl font-black tabular-nums sm:text-9xl">{time}</span>
        <span className="text-xs font-bold tracking-widest text-gray-400">SECONDS</span>
      </div>

      <p className="mt-8 text-sm text-gray-300 sm:text-base">10秒以内に正しい導線を切れ</p>

      <div className="mt-8 flex w-full max-w-sm flex-col gap-4">
        <button type="button" onClick={() => cutWire("red")} className="min-h-20 rounded-2xl border-2 border-red-500 bg-red-950 px-6 text-xl font-bold text-red-100 hover:bg-red-900">
          🔴 赤の導線を切る
        </button>
        <button type="button" onClick={() => cutWire("blue")} className="min-h-20 rounded-2xl border-2 border-blue-500 bg-blue-950 px-6 text-xl font-bold text-blue-100 hover:bg-blue-900">
          🔵 青の導線を切る
        </button>
      </div>
    </main>
  );
}
