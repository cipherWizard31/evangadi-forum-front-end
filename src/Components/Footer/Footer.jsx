import React from "react";
import classes from "./Footer.module.css";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={classes.footer__section}>
      <div className={classes.footer__container}>
        <div className={classes.footer__logo}>
          <Link to="/">
            <img
              src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-footer.png"
              alt=""
            />
          </Link>
          <div className={classes.footer__section__social}>
            <ul>
              <li>
                <Link
                  to="https://www.facebook.com/evangaditech"
                  target="_blank"
                >
                  {<FacebookRoundedIcon />}
                </Link>{" "}
              </li>
              <li>
                <Link to="https://www.instagram.com/evangaditech">
                  {<InstagramIcon />}
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.youtube.com/@EvangadiTech"
                  target="_blank"
                >
                  {<YouTubeIcon />}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={classes.footer__section__link}>
          <h2>Useful Link</h2>
          <ul>
            <li>
              <Link to="https://www.evangadi.com/legal/terms/">
                <span> Terms of Service</span>
              </Link>
            </li>
            <br />
            <li>
              <Link to="https://www.evangadi.com/legal/privacy/">
                <span>Privacy Policy</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={classes.footer__section__link}>
          <h2>Contact Info</h2>
          <ul>
            <li>support@evangadi.com</li>
            <br />
            <li>
              <span>+1-202-386-2702</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
