import { useState, useEffect, useRef } from "react";
import { LoaderCircle, ScanFace } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

function GoogleMark() {
  return (
    <span className="text-base font-black" aria-hidden="true">
      <span className="text-blue-400">G</span>
      <span className="text-red-400">o</span>
      <span className="text-yellow-300">o</span>
      <span className="text-blue-400">g</span>
      <span className="text-green-400">l</span>
      <span className="text-red-400">e</span>
    </span>
  );
}

function Step4Google() {
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState("");

  const handleAuth = () => {
    setIsLoading(true);
    // OAuth遷移後に戻ってきたことを判定するための一時フラグ
    sessionStorage.setItem("oauth_pending_step", "google");
    window.location.href = `${API_BASE_URL}/auth/google`;
  };
  // 1. コンポーネントの内部でRefを定義する
  const audioRef = useRef(null);

  // 2. コンポーネントの内部でキー入力を監視する
  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey && (e.key === "l" || e.key === "L")) {
        if (audioRef.current) {
          audioRef.current
            .play()
            .catch((err) =>
              console.log("再生失敗（ユーザー操作が必要です）:", err),
            );
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="space-y-6 rounded-2xl border border-sky-400/30 bg-slate-950/65 p-6 shadow-[0_0_32px_rgba(56,189,248,0.2)] backdrop-blur">
      <div className="flex items-center gap-3 text-sky-300">
        <ScanFace className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Step 4: Google Auth</h2>
      </div>
      <audio ref={audioRef} src="/kazegahuiteiru.mp3" loop preload="auto" />

      <p className="text-sm text-slate-300">
        バックエンドの /auth/google 経由でGoogle認証画面に遷移します。
      </p>

      <button
        type="button"
        onClick={handleAuth}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-sky-400/50 bg-black/40 px-4 py-3 font-semibold text-slate-100 transition hover:bg-sky-500/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <GoogleMark />
        )}
        {isLoading ? "Google認証中..." : "Sign in with Google"}
      </button>

      {error && <p className="text-sm text-rose-400">{error}</p>}
    </div>
  );
}

export default Step4Google;
