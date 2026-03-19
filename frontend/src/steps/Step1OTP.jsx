// frontend/src/steps/Step1OTP.jsx
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Step1_2OTP from "./Step1_2OTP";

const Step1OTP = ({ onSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); // タイトル画面から開始
  const [requestId, setRequestId] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/otp/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ number: phoneNumber }),
        },
      );

      const data = await response.json();

      if (response.ok && data.requestId) {
        setRequestId(data.requestId);
        setStep(3); // OTP入力に進む
      } else {
        alert(`エラー: ${data.message || "送信に失敗しました"}`);
      }
    } catch (err) {
      console.error(err);
      alert(
        "ネットワークエラーが発生しました。バックエンドは起動していますか？",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSuccess = () => {
    onSuccess();
  };

  const handleStartAuth = () => {
    setStep(2); // 直接電話番号入力に進む
  };

  // handleStartPhone は不要になるので削除

  return (
    <section className="rounded-2xl border border-emerald-400/30 bg-slate-950/70 p-8 shadow-[0_0_40px_rgba(16,185,129,0.15)] backdrop-blur">
      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="space-y-6 text-center"
          >
            <h2 className="text-3xl font-bold text-cyan-100">認証開始</h2>
            <p className="text-cyan-200">多層認証プロセスを開始します。</p>
            <button
              onClick={handleStartAuth}
              className="rounded-lg border border-cyan-400/50 bg-cyan-500/10 px-6 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
            >
              開始
            </button>
          </motion.div>
        ) : step === 2 ? (
          <motion.form
            key="phone"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onSubmit={handleSend}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-cyan-100">電話番号入力</h2>
            <div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="819012345678"
                required
                className="w-full rounded-lg border border-cyan-400/40 bg-slate-800 px-3 py-2 text-cyan-100 placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg border border-cyan-400/50 bg-cyan-500/10 px-4 py-2 font-semibold text-cyan-200 transition hover:bg-cyan-500/20 disabled:opacity-50"
            >
              {loading ? "送信中..." : "SMSを送る"}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Step1_2OTP
              requestId={requestId}
              onBack={() => setStep(2)} // 電話番号入力に戻る
              onSuccess={handleOtpSuccess}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Step1OTP;
