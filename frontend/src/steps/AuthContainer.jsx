// frontend/src/AuthContainer.jsx (または App.jsx)
import React, { useState } from "react";
import Step1OTP from "./Step1OTP";
import Step2OTP from "./Step2OTP";
import "../Auth.css";

const AuthContainer = () => {
  // 1 = 電話番号入力, 2 = コード入力
  const [step, setStep] = useState(1);
  const [requestId, setRequestId] = useState("");

  // Step1で成功したときに呼ばれる関数
  const handleSmsSent = (id) => {
    setRequestId(id); // 受け取ったIDを保存
    setStep(2); // 画面をステップ2（コード入力）へ切り替え
  };

  return (
    <div className="auth-container">
      {step === 1 ? (
        <Step1OTP onNext={handleSmsSent} />
      ) : (
        <Step2OTP requestId={requestId} onBack={() => setStep(1)} />
      )}
    </div>
  );
};

export default AuthContainer;
