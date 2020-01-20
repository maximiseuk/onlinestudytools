import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    btn: {
        padding: "16px 32px",
        margin: 8,
    },
    textContainer: {
        width: "50vw",
        display: "flex",
        position: "absolute",
        bottom: 0,
    },
    flower: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    book: {
        position: "absolute",
        bottom: 64,
        left: -200,
        
    },
}));

export default () => {
    const classes = useStyles();
    return (
        <div>
            <img
                src="/images/flower.png"
                alt=""
                className={classes.flower}
            />
            <img
                src="/images/book.png"
                alt=""
                className={classes.book}
            />
            <div className={classes.textContainer}>
                <div>
                    <Typography variant="h2" style={{fontWeight: 500}}>
                        <span className="highlight">
                            Maximise{" "}
                        </span>
                        is a company based in the
                        <span className="highlight">
                            {" "}UK{" "}
                        </span>
                        committed to helping students achieve the
                        <span className="highlight">
                            {" "}best{" "}
                        </span>
                        possible 
                        <span className="highlight">
                            {" "}Grades 
                        </span>.
                    </Typography>
                    <Button
                        component="a"
                        href="https://jamarketplace.com/young-enterprise-uk"
                        variant="contained"
                        className={classes.btn}
                    >
                        Buy Now
                    </Button>
                    <Button
                        component={Link}
                        to="/login"
                        variant="outlined"
                        className={classes.btn}
                    >
                        Go To Tools
                    </Button>
                </div>
            </div>
        </div>
    );
};