// frontend/src/steps/Step1_2OTP.jsx
import React, { useState } from "react";

const Step1_2OTP = ({ requestId, onBack, onSuccess }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/otp/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, code }),
      });

      const data = await response.json();

      if (response.ok) {
        // 認証成功後に次のステップへ
        onSuccess();
      } else {
        alert(`認証失敗: ${data.message}`);
      }
    } catch (err) {
      alert("サーバーとの通信に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-emerald-400/30 bg-slate-950/70 p-8 shadow-[0_0_40px_rgba(16,185,129,0.15)] backdrop-blur">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-cyan-100">認証コード入力</h2>
        <p className="text-sm text-slate-300">スマホに届いた6桁の数字を入力してください。</p>
        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            placeholder="123456"
            required
            className="w-full rounded-lg border border-cyan-400/40 bg-slate-800 px-3 py-2 text-cyan-100 placeholder-slate-400 focus:border-cyan-400 focus:outline-none text-center text-lg tracking-widest"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg border border-cyan-400/50 bg-cyan-500/10 px-4 py-2 font-semibold text-cyan-200 transition hover:bg-cyan-500/20 disabled:opacity-50"
            >
              {loading ? "認証中..." : "認証する"}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 font-semibold text-slate-300 transition hover:bg-slate-600"
            >
              戻る
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Step1_2OTP;
