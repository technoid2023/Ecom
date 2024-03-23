import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast, { Toaster } from "react-hot-toast";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import './captcha.css';
import {
   
    MDBInput,
  } from "mdb-react-ui-kit";
  const generate = (len,type='mix') => {
    let code = "";
    if(type==='mix'){
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
      for (let i = 0; i < len; i++) {
          code += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return code;
    }
    if(type==='int'){
      for (let i = 0; i < len; i++) {
        code += Math.floor(Math.random() * 10);
      }
      return code;
    }
    
};

const Captcha = () => {
    const [captchaCode, setCaptchaCode] = useState(generate(4));
    const [userInput, setUserInput] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
  

  const regenerate = () => {
    setUserInput("");
    setCaptchaCode(generate(4));
    setIsCorrect(false);
  };

  const handleCaptchaSubmit = (e) => {
    const input = e.target.value;
    setUserInput(input);
    if (input === captchaCode) {
      setIsCorrect(true);
      console.log("ok captcha");
      toast.success('Correct')
      return true
    } else {
      setIsCorrect(false);
      console.log("error captcha");
      return false
    }
  };


  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
     <Toaster position="top-center" reverseOrder={false} />
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <input
          disabled
          value={captchaCode}
          style={{
            backgroundColor: "white",
            color: "black",
            width: `${captchaCode.length * 20}px`,
            border: "none",
            fontSize: "24px",
            letterSpacing: "5px",
            textShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
            position: "relative",
            zIndex: "1",
          }}
          onCopy={(e) => e.preventDefault()}
        />
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            width: "100%",
            height: "3px",
            backgroundColor: "green",
            transform: "rotate(-155deg)",
            zIndex: "4",
          }}
        ></span>
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            width: "100%",
            height: "5px",
            backgroundColor: "red",
            transform: "rotate(-0deg)",
            zIndex: "4",
          }}
        ></span><span
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          width: "100%",
          height: "3px",
          backgroundColor: "blue",
          transform: "rotate(-25deg)",
          zIndex: "4",
        }}
      ></span>
      </div>

      <button
        type="button"
        onClick={regenerate}
        style={{
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        {/* <FontAwesomeIcon
          icon={faRotate}
          size="2x"
          style={{ color: "black", marginLeft: "8px" }}
        /> */}
       <div className="recycle-icon"></div>
      </button>
      <form style={{ marginTop: "5px" }}>
        <MDBInput
          wrapperClass="mb-2"
          label="Enter Captcha"
          id="captcha"
          type="text"
          size="lg"
          contrast
          onChange={handleCaptchaSubmit}
          style={{ color: "black", fontWeight: "bolder" }}
          onPaste={(e) => {
            e.preventDefault();
            toast.error("Pasting is disabled.");
          }}
        />
      </form>
    </div>
  </div>
  );
};

export default Captcha;
