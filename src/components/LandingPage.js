import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
  loadingContainer: {
    height: "10vh",
    width: "100%",
    marginTop: "45vh",
    textAlign: "center",
    animation: "fadeout 0s 1.5s forwards",
    position: "fixed"
  },
  btn: {
    padding: "16px 32px",
    marginRight: "1.12vw",
    marginTop: "2vw",
    height: "4vw",
    [theme.breakpoints.down(1024)]: {
      padding: "24px 16px"
    }
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "absolute",
    height: "30vh",

    [theme.breakpoints.up(1024)]: {
      bottom: "10vh",
      left: "14vw"
    },
    [theme.breakpoints.down(1024)]: {
      top: "10vh",
      left: "7vw"
    }
  },
  text: {
    fontWeight: 500,
    opacity: 0,
    animation: "faderight 1s ease-in-out forwards",
    fontSize: "3.7vw",
    lineHeight: "4.2vw",
    width: "42vw",
    [theme.breakpoints.down(1024)]: {
      fontSize: "3.7vh",
      lineHeight: "4.2vh",
      width: "80vw"
    }
  },
  fade: {
    fontWeight: 500,
    fontSize: "3.7vw",
    lineHeight: "4.2vw",
    width: "42vw",
    opacity: 0,
    animation: "fadeout 0.3s ease-in-out forwards",
    [theme.breakpoints.down(1024)]: {
      fontSize: "3.7vh",
      lineHeight: "4.2vh",
      width: "80vw"
    }
  },
  flower: {
    display: "block",
    position: "absolute",
    top: "-8vw",
    left: 0,
    width: "24.5vw",
    [theme.breakpoints.down(1024)]: {
      display: "none"
    }
  },
  book: {
    position: "absolute",
    bottom: "6vh",
    left: "-9vw",
    width: "23vw",
    [theme.breakpoints.down(1024)]: {
      bottom: "-5vh",
      width: "40vh",
      left: "-25vh",
      transform: "rotate(26deg)"
    }
  },
  keyboard: {
    position: "absolute",
    top: "-28vw",
    right: "10vw",
    width: "35vw",
    [theme.breakpoints.down(1024)]: {
      display: "none"
    }
  },
  box: {
    position: "absolute",
    right: "-42.5vw",
    width: "72vw",
    clipPath: "view-box",
    [theme.breakpoints.up(1024)]: {
      top: "-28vw"
    },
    [theme.breakpoints.down(1024)]: {
      bottom: "-35vh",
      width: "72vh",
      right: "-35vh"
    }
  },
  dots: {
    position: "absolute",
    top: "-0.7vw",
    right: "39.4vw",
    width: "14vw",
    [theme.breakpoints.down(1024)]: {
      display: "none"
    }
  },
  pen: {
    position: "absolute",
    [theme.breakpoints.up(1024)]: {
      top: "15vw",
      width: "20vw",
      right: "8vw",
      transform: "rotate(-0.26turn)"
    },
    [theme.breakpoints.down(1024)]: {
      transform: "rotate(-0.01turn)",
      height: "40vh",
      bottom: "5vh",
      left: "6vw"
    }
  },
  lines: {
    position: "absolute",
    width: "35vw",
    bottom: "-1.75vw",
    right: "-2vw",
    [theme.breakpoints.down(1024)]: {
      right: "10vw",
      width: "50vh"
    }
  },
  logo: {
    position: "absolute",
    width: "7vw",
    right: "3.5vw",
    top: "3.5vw",
    [theme.breakpoints.down(1024)]: {
      width: "7vh"
    }
  },
  tipcard: {
    position: "absolute",
    width: "27vw",
    right: "16vw",
    bottom: "0",
    transform: "rotate(-0.03turn)",
    borderRadius: "30px",
    boxShadow: "0 4px 8px 2px rgba(0, 0, 0, 0.4)",
    filter: "hue-rotate(10deg) contrast(110%)",
    [theme.breakpoints.down(1024)]: {
      display: "none"
    }
  },
  rest: {
    position: "absolute",
    top: "100vh"
  },
  pageOne: {
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    height: "110vh",
    backgroundImage:
      'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url("images/Booksapple.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "0% 40%",
    [theme.breakpoints.down(1024)]: {
      backgroundPosition: "60% 40%"
    },
    boxShadow: "0 -2px 10px #000000"
  },
  pageOneText: {
    margin: "10vw",
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "25px",
    width: "40vw",
    [theme.breakpoints.down(1024)]: {
      width: "80vw"
    },
    padding: "2vw"
  },
  slogan: {
    fontSize: "3.7vw",
    lineHeight: "3.7vw",
    fontWeight: 500,
    [theme.breakpoints.down(1024)]: {
      fontSize: "3.7vh",
      lineHeight: "4.2vh"
    }
  },
  description: {
    marginTop: "1vw",
    fontSize: "1.2vw",
    [theme.breakpoints.down(1024)]: {
      fontSize: "1.7vh"
    }
  },
  pageTwo: {
    width: "100vw",
    [theme.breakpoints.up(1024)]: {
      height: "110vh"
    },
    [theme.breakpoints.down(1024)]: {
      display: "flex"
    }
  },
  pageTwoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100vw",
    marginBottom: "2vh",
    [theme.breakpoints.up(1024)]: {
      flexDirection: "row",
      width: "105vw",
      justifyContent: "space-between",
      position: "absolute",
      left: "-10vw"
    }
  },
  pageTwoText: {
    width: "40vw",
    textAlign: "right",
    [theme.breakpoints.down(1024)]: {
      width: "80vw",
      textAlign: "center"
    }
  },
  imac: {
    width: "60vw",
    [theme.breakpoints.down(1024)]: {
      width: "100vw"
    }
  },
  iphone: {
    width: "30vw",
    marginLeft: "-20vw",
    alignSelf: "flex-end",
    marginBottom: "11vh",
    [theme.breakpoints.down(1024)]: {
      display: "none"
    }
  },
  pageThree: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100vw",
    justifyContent: "center",
    position: "absolute",
    textAlign: "center",
    marginTop: "2vh"
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
    boxShadow: "0 0 0 2px #272727, 0 0 0 7px #3e7b63"
  },
  personText: {
    textAlign: "center",
    fontWeight: 300,
    marginTop: "1vw"
  },
  pageFour: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: "100vw",
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
    [theme.breakpoints.down(1024)]: {
      width: "80vw"
    },
    padding: "2vw"
  },
  footer: {
    backgroundColor: "#161616",
    padding: "2vw"
  },
  imacDots: {
    position: "absolute",
    width: "14vw",
    top: "-4.5vw",
    right: "3.5vw",
    transform: "rotate(90deg)",
    [theme.breakpoints.down(1024)]: {
      display: "none"
    }
  }
}));

export default () => {
  var classes = useStyles();
  const textList = [
    "{Maximise} is a young enterprise company based in the {UK} committed to helping students achieve the {best} possible {grades}.",
    "Our {PASSbox} contains revision {tips} and {tools} that are {scientifically} proven to increase your learning {efficiency} and reduce stress.",
    "Gain access to {guidance} and advice from {experienced students} who have achieved some of the {best grades in the country}.",
    "Use cutting-edge {machine learning} technology to {optimise} your revision schedule and {maximise} your academic potential.",
    "We focus on {mental wellbeing} by including {relaxing} scents and advice for {healthy living} specifically tailored to {students}."
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
    <div id="page" style={{ marginLeft: "-8px" }}>
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
      <div style={{ opacity: 0, animation: "fadein 2s 1.5s forwards" }}>
        <img src="/images/Plant.png" alt="" className={classes.flower} />
        <img src="/images/keyboard.png" alt="" className={classes.keyboard} />
        <img src="/images/linesnew.png" alt="" className={classes.lines} />
        <img src="/images/dots2.png" alt="" className={classes.dots} />
        <img src="/images/Book.png" alt="" className={classes.book} />
        <img src="/images/box.png" alt="" className={classes.box} />
        <img src="/images/Pen.png" alt="" className={classes.pen} />
        <img src="/images/logo.png" alt="" className={classes.logo} />
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
            <Tooltip title="Contact us to preorder">
              <Button
                component="a"
                href="#footer"
                variant="contained"
                className={classes.btn}
              >
                Buy now
              </Button>
            </Tooltip>
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
                <br />
                <br />
                It also contains stationery, revision tip cards, sticky notes
                and blank flashcards to equip you with the tools that helped us
                with our revision.
              </Typography>
            </div>
          </div>
          <div className={classes.pageTwo}>
            <div className={classes.pageTwoContainer}>
              <img src="/images/dots.png" alt="" className={classes.imacDots} />
              <img
                src="/images/imactimetable.png"
                alt=""
                className={classes.imac}
              />
              <img
                src="/images/iphonetimetable.png"
                alt=""
                className={classes.iphone}
              />
              <div className={classes.pageTwoText}>
                <Typography className={classes.slogan}>
                  <span className="highlight">Structure</span> your path to
                  success with your online{" "}
                  <span className="highlight">timetable</span>
                </Typography>
                <Typography className={classes.description}>
                  Take it with you on your phone so that you always know your
                  schedule. With room built in for revision as well as breaks,
                  you can achieve your productivity goals with time left over to
                  relax.
                </Typography>
                <Tooltip title="Contact us to preorder">
                  <Button
                    component="a"
                    href="#footer"
                    variant="contained"
                    className={classes.btn}
                  >
                    Buy now
                  </Button>
                </Tooltip>
              </div>
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
                <br />
                <br />
                The website also includes advice from succesful students, daily
                agendas and long-term goals. The effects of target-setting are
                "robust, typically yielding a success rate of 90%" according to
                studies such as{" "}
                <a
                  href="https://www.sehity.com/uploads/4/2/2/4/42243697/locke_-_1996_-_motivation_through_conscious_goal_setting.pdf"
                  className="highlight"
                >
                  this one from the University of Maryland
                </a>
                .
              </Typography>
            </div>
          </div>
          <div className={classes.pageThree}>
            <Typography className={classes.slogan}>Meet the team</Typography>
            <div>
              <div className={classes.personRow}>
                <div className={classes.person}>
                  <img
                    src="https://api.adorable.io/avatars/150/oscar.png"
                    alt=""
                    className={classes.personPic}
                  />
                  <Typography className={classes.personText}>
                    Oscar
                    <br />
                    Managing Director
                  </Typography>
                </div>
                <div className={classes.person}>
                  <img
                    src="https://api.adorable.io/avatars/150/hardik"
                    alt=""
                    className={classes.personPic}
                  />
                  <Typography className={classes.personText}>
                    Hardik
                    <br />
                    Marketing Director
                  </Typography>
                </div>
                <div className={classes.person}>
                  <img
                    src="https://api.adorable.io/avatars/150/jacob"
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
                    src="https://api.adorable.io/avatars/150/tom"
                    alt=""
                    className={classes.personPic}
                  />
                  <Typography className={classes.personText}>
                    Tom
                    <br />
                    Finance Director
                  </Typography>
                </div>
              </div>
              <div className={classes.personRow}>
                <div className={classes.person}>
                  <img
                    src="https://api.adorable.io/avatars/150/pratyaksh"
                    alt=""
                    className={classes.personPic}
                  />
                  <Typography className={classes.personText}>
                    Pratyaksh
                    <br />
                    Digital and Technology Director
                  </Typography>
                </div>
                <div className={classes.person}>
                  <img
                    src="https://api.adorable.io/avatars/150/raymond"
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
                    src="https://api.adorable.io/avatars/150/toby"
                    alt=""
                    className={classes.personPic}
                  />
                  <Typography className={classes.personText}>
                    Toby
                    <br />
                    Human Resources Director
                  </Typography>
                </div>
                <div className={classes.person}>
                  <img
                    src="https://api.adorable.io/avatars/150/libi"
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
            <div className={classes.footer} id="footer">
              <Typography className="highlight" style={{ fontWeight: 500 }}>
                Contact us now to preorder the PASSbox!
              </Typography>
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
              <a href="https://www.facebook.com/maximise.ye/">
                <Icon
                  className="fab fa-facebook"
                  style={{ color: "#ffffff", padding: "0.5vw" }}
                />
              </a>
              <a href="https://www.instagram.com/maximiseuk/">
                <Icon
                  className="fab fa-instagram"
                  style={{ color: "#ffffff", padding: "0.5vw" }}
                />
              </a>
              <a href="https://www.tiktok.com/@maximiseuk">
                <Icon
                  className="fab fa-tiktok"
                  style={{ color: "#ffffff", padding: "0.5vw" }}
                />
              </a>
              <Typography style={{ color: "#aaaaaa" }}>
                Young Enterprise in England and Wales (including the Channel
                Islands) A Company Limited by Guarantee No. 712260 Charity No.
                313697 Registered office: Young Enterprise, Yeoman House,
                Sekforde Street, London EC1R 0HF
              </Typography>
            </div>
          </div>
        </div>
        <img src="/images/tipcard.png" alt="" className={classes.tipcard} />
      </div>
    </div>
  );
};
