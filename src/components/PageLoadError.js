import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";

const styles = theme => ({
    error: {
        backgroundColor: theme.palette.background.default,
    },
});

class Error extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {
            hasError: true,
        };
    }
    componentDidCatch(error, info) {
        console.error(error + info)
    }
    componentDidMount() {
        this.props.history.listen((location) => {
            this.setState({
                hasError: false
            })
        });
    }
    render() {
        const { classes } = this.props;
        if (this.state.hasError) {
            return (
                <Paper className={classes.error}>
                    <Typography variant="h4" component="h4">
                        Oh dear! Sorry, something went wrong loading this page.
                    </Typography>
                </Paper>
            );
        }
        return this.props.children;
    }
}
Error.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default withRouter(withStyles(styles, { withTheme: true, })(Error));