import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Sparkles, Trophy } from "lucide-react";

function Success({ onReset }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("自動再生がブロックされました:", error);
      });
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <audio
        ref={audioRef}
        src="/kazegahuiteiru.mp3" // publicフォルダに曲ファイルを置く
        loop
        preload="auto"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.6, -0.05, 0.01, 0.99],
          type: "spring",
          stiffness: 100,
        }}
        className="relative overflow-hidden rounded-3xl border border-emerald-400/30 bg-slate-950/90 p-8 shadow-[0_0_60px_rgba(16,185,129,0.3)] backdrop-blur-xl"
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-emerald-400/20"
              initial={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                opacity: 0,
              }}
              animate={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Success icon with glow effect */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="relative mb-6 flex justify-center"
        >
          <div className="absolute inset-0 animate-pulse rounded-full bg-emerald-400/20 blur-xl" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <CheckCircle className="h-24 w-24 text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
          </motion.div>
        </motion.div>

        {/* Success title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-4 text-center text-4xl font-bold text-white"
        >
          🎉 認証成功！ 🎉
        </motion.h1>

        {/* Success message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-8 text-center text-lg text-emerald-200"
        >
          すべてのセキュリティ層を突破しました！
          <br />
          あなたは本物のハッカーです。
        </motion.p>

        {/* Trophy icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 150 }}
          className="flex justify-center"
        >
          <Trophy className="h-16 w-16 text-yellow-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
        </motion.div>

        {/* Sparkle effects */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * 300,
                y: Math.random() * 300,
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <Sparkles className="h-6 w-6 text-yellow-300" />
            </motion.div>
          ))}
        </div>

        {/* Congratulatory text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-slate-400">
            システムへのアクセスが許可されました
          </p>
          <motion.button
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={onReset}
            className="mt-4 inline-block rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-2 text-white font-semibold shadow-lg hover:from-emerald-600 hover:to-cyan-600 transition-colors cursor-pointer"
          >
            チャレンジをリスタート
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Success;
