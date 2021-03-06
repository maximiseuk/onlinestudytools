import React, { useState, Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import MobileStepper from "@material-ui/core/MobileStepper";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import advice from "../api/advice.json";

const useStyles = makeStyles(theme => ({
    grid: {
        "& > *": {
            height: "100%",
            [theme.breakpoints.down(960)]: {
                borderRadius: 0,
            },
        },
        [theme.breakpoints.down(960)]: {
            height: "100%",
        },
        "& a": {
            color: theme.palette.text.primary,
            textDecoration: "none",
            "&:visited": {
                color: theme.palette.text.primary,
                textDecoration: "none",
            },
        },
        "& p p:last-child": {
            marginBottom: 0,
        }
    },
    container: {
        "&:first-of-type": {
            marginBottom: 16,
        },
    },
    swiper: {
        borderRadius: "8px 8px 0px 0px",
    },
}));

export default () => {
    const
        [activeStep, setActiveStep] = useState({
            Wellbeing: 0,
            Revision: 0,
        }),
        classes = useStyles(),
        isSmall = useMediaQuery("(min-width: 960px)"),
        Container = isSmall
            ? Grid
            : SwipeableViews,
        containerProps = type => (isSmall
            ? {
                container: true,
                spacing: 2,
                className: classes.container,
            }
            :{
                index: activeStep[type],
                onChangeIndex: step => {
                    setActiveStep({
                        ...activeStep,
                        [type]: step,
                    });
                },
                enableMouseEvents: true,
                className: classes.swiper,
            });
    return (
        <Paper className="fade padding">
            {advice && Object.keys(advice).map(type => (
                <Fragment key={type}>
                    <Typography variant="h4" gutterBottom>
                        {type}
                    </Typography>
                    <Container {...containerProps(type)}>
                        {advice[type].map(item => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={4}
                                lg={3}
                                key={item.title}
                                className={classes.grid}
                            >
                                <Card key={item.title}>
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            gutterBottom
                                            dangerouslySetInnerHTML={{
                                                __html: item.title
                                                    .replace(/{/g, "<span class='highlight'>")
                                                    .replace(/}/g, "</span>")
                                            }}
                                        />
                                        <Typography
                                            dangerouslySetInnerHTML={{
                                                __html: item.content
                                                    .replace(/{/g, "<span class='highlight'>")
                                                    .replace(/}/g, "</span>")
                                                    .replace(":--", "<ul><li>")
                                                    .replace("--:", "</li></ul>")
                                                    .replace("1--", "<ol><li>")
                                                    .replace("--1", "</li></ol>")
                                                    .replace(/--/g, "</li><li>")
                                                    .replace(/href='www/g, "href='https://www")
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Container>
                    {!isSmall && <MobileStepper
                        variant="dots"
                        style={{
                            marginBottom: type === "Wellbeing"
                                ? 16
                                : 0,
                            borderRadius: "0 0 8px 8px",
                        }}
                        steps={advice[type].length}
                        position="static"
                        activeStep={activeStep[type]}
                        nextButton={
                            <IconButton
                                size="small"
                                onClick={() => setActiveStep({...activeStep, [type]: activeStep[type] + 1})}
                                disabled={activeStep[type] === advice[type].length - 1}
                            >
                                <KeyboardArrowRightIcon />
                            </IconButton>
                        }
                        backButton={
                            <IconButton
                                size="small"
                                onClick={() => setActiveStep({...activeStep, [type]: activeStep[type] - 1})}
                                disabled={activeStep[type] === 0}
                            >
                                <KeyboardArrowLeftIcon />
                            </IconButton>
                        }
                    />}
                </Fragment>
            ))}
        </Paper>
    );
};