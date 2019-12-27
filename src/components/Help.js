import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.primary.main,
    }
}));

export default () => {
    const
        classes = useStyles(),
        [expanded, setExpanded] = useState(false),
        handleChange = panel => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        },
        faqs = [
            {
                "q": "Question",
                "a": "Answer",
            },
            {
                "q": "Question",
                "a": "Answer",
            },
            {
                "q": "Question",
                "a": "Answer",
            },
            {
                "q": "Question",
                "a": "Answer",
            },
            {
                "q": "Question",
                "a": "Answer",
            },
            {
                "q": "Question",
                "a": "Answer",
            },
            {
                "q": "Question",
                "a": "Answer",
            },
            {
                "q": "Question",
                "a": "Answer",
            },
            {
                "q": "Question",
                "a": "Answer",
            }
        ];
    return (
        <Paper className="fade">
            {faqs.map((faq, i) => (
                <ExpansionPanel
                    expanded={expanded === i}
                    onChange={handleChange(i)}
                    key={i}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon className={classes.icon} />}
                        aria-controls="panel1bh-content"
                    >
                        <Typography variant="h5">{faq.q}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {faq.a}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </Paper>
    );
};