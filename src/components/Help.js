import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import faqs from "../api/faqs.json";

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.primary.main,
    },
    panel: {
        "& a": {
            "&, &:visited": {
                textDecoration: "none",
                color: theme.palette.text.primary,
            },
        },
        "& p": {
            margin: 0,
        },
    },
}));

export default () => {
    const
        classes = useStyles(),
        [expanded, setExpanded] = useState(false),
        handleChange = panel => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (
        <Paper className="fade">
            {faqs.map((faq, i) => (
                <ExpansionPanel
                    expanded={expanded === i}
                    onChange={handleChange(i)}
                    key={i}
                    className={classes.panel}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon className={classes.icon} />}
                        aria-controls="panel1bh-content"
                    >
                        <Typography
                            variant="h5"
                            dangerouslySetInnerHTML={{
                                __html: faq.q
                                    .replace(/{/g, "<span class='highlight'>")
                                    .replace(/}/g, "</span>")
                            }}
                        />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography
                            dangerouslySetInnerHTML={{
                                __html: faq.a
                                    .replace(/{/g, "<span class='highlight'>")
                                    .replace(/}/g, "</span>")
                            }}
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </Paper>
    );
};