import React from "react";
import classes from "../../Pages/Home/home.module.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
function QueAnsBox({ data, content, transition }) {
  console.log(data);
  return (
    <section>
      <div
        className={`${classes.question__item} ${
          transition && classes.transition
        }`}
      >
        <div className={classes.avatar}>
          <span className={classes.icon}>
            <AccountCircleRoundedIcon fontSize="large" />
          </span>
          <span className={classes.user}>{data?.username}</span>
        </div>
        <div className={classes.details}>
          {content ? (
            <span className={classes.question}>{data?.content}</span>
          ) : (
            <span className={classes.question}>{data?.title}</span>
          )}
        </div>
        {transition && (
          <div className={classes.arrow}>
            <ArrowForwardIosRoundedIcon />
          </div>
        )}
        <hr />
      </div>
    </section>
  );
}

export default QueAnsBox;
