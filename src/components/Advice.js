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

const useStyles = makeStyles(theme => ({
    grid: {
        "& > *": {
            height: "100%",
            [theme.breakpoints.down(960)]: {
                borderRadius: "8px 8px 0 0"
            },
        },
        [theme.breakpoints.down(960)]: {
            height: "100%",
        },
    },
    container: {
        "&:first-of-type": {
            marginBottom: 16,
        },
    },
    swiper: {
        borderRadius: "8px 8px 0 0",
    }
}));

export default () => {
    const
        [activeStep, setActiveStep] = useState({
            Wellbeing: 0,
            Revision: 0,
        }),
        classes = useStyles(),
        advice = {
            Wellbeing: [
                {
                    title: "Give to {others}",
                    content: [
                        "Acts of {giving} can help {giving} your mental health and by:",
                        "- creating {positive} feelings and a sense of reward - giving you a feeling of purpose and {self-worth}.",
                        "- They will often be {returned} in kind actions",
                    ],
                },
                {
                    title: "{Connect} with others",
                    content: [
                        "{Healthy relationships} are crucial for your {mental health}. They can contribute to:",
                        "- Helping you to build {confidence}",
                        "- Giving you an opportunity to relate {positive} events in your life",
                        "- Providing emotional {support} for yourself and others",
                    ],
                },
                {
                    title: "Be physically {active}",
                    content: [
                        "Being {active} is not only great for your physical {health} and {fitness}. Evidence also shows it can contribute to  mental wellbeing by:",
                        "- Allowing you to {connect} to others",
                        "- Helping you aim high and set {goals}",
                        "- Release {endorphins} causing improved mood",
                    ],
                },
                {
                    title: "{Learn} new skills",
                    content: [
                        "{Learning} new skills can improve your mental wellbeing by:",
                        "- {Boosting} confidence and sense of purpose",
                        "- Helping you {achieve} future {goals}",
                        "- Allowing you to {broaden} your skill set",
                    ],
                },
            ],
            Revision: [
                {
                    title: "Revise... Test... {Rest}",
                    content: [
                        "Here's our {3 step} plan for {success}:",
                        "1. {Revise} for about {35 minutes}. This could be active revision, instead of just making notes",
                        "2. {Test} yourself for about {15 minutes}. You could use Quizlet for this, ask a friend or find some exam questions online",
                        "3. Take a {rest} for about {10 minutes} - do whatever you want!"
                    ],
                },
            ],
        },
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
        <Paper className="fade">
            {Object.keys(advice).map(type => (
                <Fragment key={type}>
                    <Typography variant="h4" gutterBottom>
                        {type}
                    </Typography>
                        {console.log(containerProps(type))}
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
                                        {item.content.map(line => (
                                            <Typography
                                                key={line}
                                                dangerouslySetInnerHTML={{
                                                    __html: line
                                                        .replace(/{/g, "<span class='highlight'>")
                                                        .replace(/}/g, "</span>")
                                                }}
                                            />
                                        ))}
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