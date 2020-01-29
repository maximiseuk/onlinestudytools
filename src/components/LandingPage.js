import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  loadingContainer: {
    height: "10vh",
    width: "100%",
    marginTop: "45vh",
    textAlign: "center",
    animation: "fadeout 0s 1.5s forwards"
  },
  btn: {
    padding: "16px 32px",
    marginRight: "1.12vw",
    marginTop: "2vw",
    height: "4vw"
  },
  textContainer: {
    display: "flex",
    position: "absolute",
    bottom: "10vh",
    left: "14vw"
  },
  text: {
    fontWeight: 500,
    opacity: 0,
    animation: "faderight 1s ease-in-out forwards",
    fontSize: "3.7vw",
    lineHeight: "4.2vw",
    width: "42vw"
  },
  fade: {
    fontWeight: 500,
    fontSize: "3.7vw",
    lineHeight: "4.2vw",
    width: "42vw",
    opacity: 0,
    animation: "fadeout 0.3s ease-in-out forwards"
  },
  flower: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "24.5vw"
  },
  book: {
    position: "absolute",
    bottom: "6vh",
    left: "-12.5vw",
    width: "27.6vw"
  },
  keyboard: {
    position: "absolute",
    top: "-28vw",
    right: "10vw",
    width: "35vw"
  },
  box: {
    position: "absolute",
    right: "-42.5vw",
    top: "-28vw",
    width: "72vw"
  },
  dots: {
    position: "absolute",
    top: "-0.7vw",
    right: "39.4vw",
    width: "14vw"
  },
  pen: {
    position: "absolute",
    top: "22vw",
    right: "8vw",
    width: "21vw",
    transform: "rotate(0.03turn)"
  },
  lines: {
    position: "absolute",
    width: "35vw",
    bottom: "-1.75vw",
    right: "-2vw"
  },
  logo: {
    position: "absolute",
    width: "7vw",
    right: "3.5vw",
    top: "3.5vw"
  },
  tipcard: {
    position: "absolute",
    width: "27vw",
    right: "18vw",
    bottom: "3.5vw",
    transform: "rotate(-0.03turn)",
    borderRadius: "30px",
    boxShadow: "0 4px 8px 2px rgba(0, 0, 0, 0.4)",
    filter: "hue-rotate(10deg) contrast(110%)"
  },
  rest: {
    position: "absolute",
    top: "100vh"
  },
  pageOne: {
    display: "flex",
    flexDirection: "column",
    width: "102vw",
    height: "110vh",
    marginLeft: "-2vw",
    backgroundImage:
      'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url("images/booksapple.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "0% 40%",
    boxShadow: "0 -2px 10px #000000"
  },
  pageOneText: {
    margin: "10vw",
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "25px",
    width: "40vw",
    padding: "2vw"
  },
  slogan: {
    fontSize: "3.7vw",
    lineHeight: "3.7vw",
    fontWeight: 500
  },
  description: {
    marginTop: "2vw",
    fontSize: "1.2vw"
  },
  pageTwo: {
    display: "flex",
    alignItems: "center",
    width: "100vw",
    height: "110vh"
  },
  pageTwoText: {
    width: "40vw",
    textAlign: "right"
  },
  imac: {
    width: "50vw"
  },
  pageThree: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "110vh",
    justifyContent: "space-around",
    padding: "2vw",
    textAlign: "center"
  },
  personRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2vw"
  },
  person: {
    width: "200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "1vw"
  },
  personPic: {
    width: "150px",
    height: "150px",
    borderRadius: "100%",
    border: "5px solid #3e7b63"
  },
  personText: {
    textAlign: "center",
    fontWeight: 300,
    marginTop: "1vw"
  },
  pageFour: {
    marginLeft: "-2vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: "102vw",
    height: "110vh",
    backgroundImage:
      'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url("images/server.png")',
    backgroundSize: "cover",
    boxShadow: "0 -2px 10px #000000"
  },
  pageFourText: {
    textAlign: "right",
    margin: "10vw",
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "25px",
    width: "40vw",
    padding: "2vw"
  }
}));

export default () => {
  var classes = useStyles();
  const textList = [
    "{Maximise} is a young enterprise company based in the {UK} committed to helping students achieve the {best} possible {grades}.",
    "Our {PASSbox} contains revision {tips} and {tools} that are {scientifically} proven to increase your learning {efficiency} and reduce stress.",
    "Gain access to {guidance} and advice from {experienced students} who have achieved some of the {best grades in the country}.",
    "Use cutting-edge {machine learning} technology to {optimise} your revision schedule and {maximise} your academic potential.",
    "We put a focus on {mental wellbeing} by including {relaxing} scents and advice for {healthy} specifically tailored to {students}."
  ];
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let interval = null;
    interval = setTimeout(() => {
      setVisible(false);
      interval = setTimeout(() => {
        setCount(count => count + 1);
        setVisible(true);
      }, 1000);
    }, 11000);
  }, [count]);

  return (
    <div>
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
      <div style={{ opacity: 0, animation: "fadein 2s 1.5s forwards" }}>
        <img src="/images/flower.png" alt="" className={classes.flower} />
        <img src="/images/book.png" alt="" className={classes.book} />
        <img src="/images/keyboard.png" alt="" className={classes.keyboard} />
        <img src="/images/box.png" alt="" className={classes.box} />
        <img src="/images/dots2.png" alt="" className={classes.dots} />
        <img src="/images/pen.png" alt="" className={classes.pen} />
        <img src="/images/linesnew.png" alt="" className={classes.lines} />
        <img src="/images/logo.png" alt="" className={classes.logo} />
        <img src="/images/tipcard.png" alt="" className={classes.tipcard} />
        <div className={classes.textContainer}>
          <div>
            <Typography
              className={visible ? classes.text : classes.fade}
              dangerouslySetInnerHTML={{
                __html: textList[count % textList.length]
                  .replace(/{/g, "<span class='highlight'>")
                  .replace(/}/g, "</span>")
              }}
            />
            <Button
              component="a"
              href="https://jamarketplace.com/young-enterprise-uk"
              variant="contained"
              className={classes.btn}
            >
              Buy now
            </Button>
            <Button
              component={Link}
              to="/"
              variant="outlined"
              className={classes.btn}
            >
              Tools (Coming Soon)
            </Button>
          </div>
        </div>

        <div className={classes.rest}>
          <div className={classes.pageOne}>
            <div className={classes.pageOneText}>
              <Typography className={classes.slogan}>
                ELIMINATE STRESS,{" "}
                <span className="highlight">ACCELERATE SUCCESS</span>
              </Typography>
              <Typography className={classes.description}>
                According to the{" "}
                <a
                  href="https://academic.oup.com/chemse/article/30/suppl_1/i248/270387"
                  className="highlight"
                >
                  oxford journal
                </a>
                , fragrance can have a positive effect on your mood and
                productivity. The PASSbox contains aromatic pouches of lavender,
                rosemary and peppermint to create a calming work environment.
              </Typography>
            </div>
          </div>
          <div className={classes.pageTwo}>
            <img
              src="/images/imactimetable.png"
              alt=""
              className={classes.imac}
            />
            ,
            <div className={classes.pageTwoText}>
              <Typography className={classes.slogan}>
                <span className="highlight">Structure</span> your path to
                success with <span className="highlight">timetable</span>
              </Typography>
              <Typography className={classes.description}>
                Take it with you on your phone so that you always know your
                schedule. With room built in for revision as well as breaks, you
                can achieve your productivity goals with time left over to
                relax.
              </Typography>
              <Button
                component="a"
                href="https://jamarketplace.com/young-enterprise-uk"
                variant="contained"
                className={classes.btn}
              >
                Buy now
              </Button>
            </div>
          </div>
          <div className={classes.pageFour}>
            <div className={classes.pageFourText}>
              <Typography className={classes.slogan}>
                OPTIMISE REVISION WITH{" "}
                <span className="highlight">AI TECHNOLOGY</span>
              </Typography>
              <Typography className={classes.description}>
                Using advanced machine learning models dedicated to improving
                grades, the timetable adapts to account for your strengths and
                weaknesses in different subjects, so you're always making the
                most of your time.
              </Typography>
            </div>
          </div>
          <div className={classes.pageThree}>
            <Typography className={classes.slogan}>Meet the team</Typography>
            <div>
              <div className={classes.personRow}>
                <div className={classes.person}>
                  <img
                    src="/images/personpic.jpg"
                    alt=""
                    className={classes.personPic}
                  />
                  <Typography className={classes.personText}>
                    Oscar and Shannon
                    <br />
                    Managing Directors
                  </Typography>
                </div>
                <div className={classes.person}>
                  <img
                    src="/images/personpic.jpg"
                    alt=""
                    className={classes.personPic}
                  />
                  <Typography className={classes.personText}>
                    Hardik and Rosanna
                    <br />
                    Marketing Directors
                  </Typography>
                </div>
                <div className={classes.person}>
                  <img
                    src="/images/personpic.jpg"
                    alt=""
                    className={classes.personPic}
                  />
                  <Typography className={classes.personText}>
                    Jacob and Joseph
                    <br />
                    Operations Directors
                  </Typography>
                </div>
                <div className={classes.person}>
                  <img
                    src="/images/personpic.jpg"
                    alt=""
                    className={classes.personPic}
                  />
                  <Typography className={classes.personText}>
                    Tom and Dom
                    <br />
                    Finance Directors
                  </Typography>
                </div>
              </div>
              <div className={classes.personRow}>
                <div className={classes.person}>
                  <img
                    src="/images/personpic.jpg"
                    alt=""
                    className={classes.personPic}
                  />
                  <Typography className={classes.personText}>
                    Pratyaksh and Isaac
                    <br />
                    Digital and Technology Directors
                  </Typography>
                </div>
                <div className={classes.person}>
                  <img
                    src="/images/personpic.jpg"
                    alt=""
                    className={classes.personPic}
                  />
                  <Typography className={classes.personText}>
                    Raymond
                    <br />
                    Sales Director
                  </Typography>
                </div>
                <div className={classes.person}>
                  <img
                    src="/images/personpic.jpg"
                    alt=""
                    className={classes.personPic}
                  />
                  <Typography className={classes.personText}>
                    Ryan and Toby
                    <br />
                    Social Responsibility and HR
                  </Typography>
                </div>
                <div className={classes.person}>
                  <img
                    src="/images/personpic.jpg"
                    alt=""
                    className={classes.personPic}
                  />
                  <Typography className={classes.personText}>
                    Libi
                    <br />
                    Company Secretary
                  </Typography>
                </div>
              </div>
            </div>
            <div>
              <Typography>
                We are happy to help you with any problems or questions you may
                have - just email us at{" "}
                <a
                  href="mailto:contact.maximise@gmail.com"
                  className="highlight"
                >
                  contact.maximise@gmail.com
                </a>
              </Typography>
              <Typography style={{ color: "#aaaaaa" }}>
                Young Enterprise in England and Wales (including the Channel
                Islands) A Company Limited by Guarantee No. 712260 Charity No.
                313697 Registered office: Young Enterprise, Yeoman House,
                Sekforde Street, London EC1R 0HF
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
