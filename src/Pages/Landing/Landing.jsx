import React, { useState } from "react";
import classes from "./Landing.module.css";
import About from "../../Components/About/About";
import SignIn from "../../Components/SignIn/SignIn";
import SignUp from "../../Components/SignUp/SignUp";
import LayOut from "../../Components/Layout/LayOut";

const LandingPage = () => {
  // state if the user is logges in or not
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin); 
  };

  return (
    <LayOut >
      <div className={classes.landingPage}>
        <div className={classes.background}></div>
        <div className={classes.content}>
          <section className={classes.formSection}>
            <div className={classes.formContainer}>
              {/* Conditionally render SignIn and SignUp with sliding effect */}
              <div
                className={`${classes.formSlide} ${
                  isLogin ? classes.signInActive : classes.signUpActive
                }`}
              >
                <SignIn onToggleForm={toggleForm} /> 
              </div>
              <div
                className={`${classes.formSlide} ${
                  isLogin ? classes.signUpActive : classes.signInActive
                }`}
              >
                <SignUp onToggleForm={toggleForm} />
              </div>
            </div>
          </section>
          <section className={classes.aboutSection}>
            <About />
          </section>
        </div>
      </div>
    </LayOut>
  );
};

export default LandingPage;
