import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../Components/Layout/Layout";
import Cookies from "js-cookie";
import { encrypt, extractSubstrings } from "../Auth/PrivateRoute";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faRotate } from "@fortawesome/free-solid-svg-icons";

import image from "../Assests/login2.jpg";
import wheel from "../Assests/wheel.gif";

const generateRandomCode = () => {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += Math.floor(Math.random() * 10); // Generate random digit (0-9)
  }
  return code;
};

function UserLogin() {
  const navigate = useNavigate();
  // State to manage form inputs
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    showPassword: false, // state to manage password visibility
  });
  const [captchaCode, setCaptchaCode] = useState(generateRandomCode());
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const checkFormValidity = () => {
    // Check if user ID, password, and captcha are filled
    const isUserIdValid = formData.userId.trim() !== "";
    const isPasswordValid = formData.password.trim() !== "";

    setIsFormValid(isUserIdValid && isPasswordValid);
  };
  // Update form data when inputs change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    checkFormValidity();
  }, [formData]);
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };
  console.log(userInput);
  const regenerateCaptcha = () => {
    setUserInput("");
    setCaptchaCode(generateRandomCode());
    setIsCorrect(false);
  };

  const handleCaptchaSubmit = (e) => {
    const input = e.target.value;
    setUserInput(input);
    if (input === captchaCode) {
      setIsCorrect(true);
      console.log("ok captcha");
    } else {
      setIsCorrect(false);
      console.log("error captcha");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isCorrect === true) {
      let mainModules = [];
      if (formData.userId !== "" && formData.password !== "") {
        axios.post('https://edu-tech-bwe5.onrender.com/v1/login', {"email": formData.userId, "password": formData.password,})
          // .get("./user1.json")
          .then((response) => {
            console.log("tested");
            let data = response.data;
            console.log(data);
            if (data.Success === true) {
              let rawToken = data.Token;

              let encryptToken = encrypt(JSON.stringify(rawToken));
              Cookies.set('_TK',encryptToken)
              

              let userData = data.Data[0]

              let encryptUser = encrypt(JSON.stringify(userData));

              Cookies.set("_UR", encryptUser, { expires: 1 });
              setTimeout(() => {
                navigate("/dashboard");
              }, 100);
              toast.success(`Welcome Back ${userData.name}`);
              regenerateCaptcha();
              
            }
            else{
              toast.error('Invalid User Credentials !')
              regenerateCaptcha();
            }
          })
          .catch((error) => {
            toast.error("Bad Credentials !");
            console.error("Error fetching data:", error);
            if (error.response) {
              console.error(
                "Server responded with status:",
                error.response.status
              );
              console.error("Response data:", error.response.data);
            }
          });
      } else {
        toast.error("Give Login Credentials ");
      }
    } else {
      toast.error("Wrong Captcha !!");
      regenerateCaptcha();
    }
  };

  return (
    <Layout>
      <MDBContainer className="my-3">
        <Toaster position="top-center" reverseOrder={false} />

        <MDBCard
          className="mt-1"
          style={{
            borderRadius: "10px",
            boxShadow:
              "rgba(0, 0, 0, 0.6) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(0, 0, 0, 0.4) 0px -2px 6px 0px inset",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            height: "35rem",
          }}
        >
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column justify-content-center align-items-center">
                <div className="d-flex flex-row mt-2">
                  <img
                    src={wheel}
                    alt="P O M S Logo"
                    className="me-5"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                  <span
                    className="h1 fw-bold mb-0"
                    style={{ color: "wheat", fontFamily: "monospace" }}
                  >
                    P O M S
                  </span>
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{
                    letterSpacing: "1px",
                    color: "sienna",
                    fontWeight: "bolder",
                  }}
                >
                  Sign Into Your Account
                </h5>

                <form onSubmit={handleSubmit}>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email ID"
                    id="userId"
                    type="text"
                    size="lg"
                    name="userId"
                    contrast
                    onChange={handleInputChange}
                    value={formData.userId}
                    style={{ color: "goldenrod" }}
                    onPaste={(e) => {
                      e.preventDefault();
                      toast.error("Pasting is disabled.");
                    }}
                  />
                  <div className="position-relative">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Password"
                      id="password"
                      contrast
                      type={formData.showPassword ? "text" : "password"}
                      size="lg"
                      name="password"
                      onChange={handleInputChange}
                      value={formData.password}
                      style={{ color: "silver" }}
                      onPaste={(e) => {
                        e.preventDefault();
                        toast.error("Pasting is disabled.");
                      }}
                    />
                    <FontAwesomeIcon
                      icon={formData.showPassword ? faEye : faEyeSlash}
                      onClick={togglePasswordVisibility}
                      className="position-absolute end-0 top-50 translate-middle-y me-3"
                      style={{ cursor: "pointer" }}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
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
                            width: "80px",
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
                        onClick={regenerateCaptcha}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faRotate}
                          size="2x"
                          style={{ color: "black", marginLeft: "8px" }}
                        />
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
                  <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span>
                        <MDBBtn
                          className="mb-1 px-5"
                          color="success"
                          size="lg"
                          type="submit"
                          disabled={!isFormValid}
                          style={{ marginRight: "5rem", marginTop: "1rem" }}
                        >
                          Login
                        </MDBBtn>
                      </span>
                      <span style={{ marginLeft: "1px", color: "white" }}>
                        <Link
                          className="small mb-1"
                          to="/signup"
                          style={{
                            color: "lightblue",
                            fontWeight: "bold",
                            marginTop: "2px",
                          }}
                        >
                          Don't Have Account
                          <br />
                          SignUp Here
                        </Link>
                      </span>
                    </div>
                  </div>
                </form>

                <Link
                  className="small "
                  to="/reset"
                  style={{
                    color: "sandybrown",
                    fontWeight: "bold",
                    marginRight: "12rem",
                  }}
                >
                  Forgot password?
                </Link>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </Layout>
  );
}

export default UserLogin;
