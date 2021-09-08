import { Box, Grid } from "@material-ui/core";
import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "50%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const InfoPanel = (props) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const isMatchesSm = useMediaQuery(theme.breakpoints.up("sm"));

  const handleChange = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <Grid item xs={12} md={5}>
      <Accordion
        expanded={expanded === "panel"}
        onChange={handleChange("panel")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1bh-header">
          <Grid
            container
            alignItems="center"
            justifyContent="flex-start"
            spacing={isMatchesSm ? 2 : 1}
          >
            <Grid item sm="auto">
              <Typography className={classes.heading}>
                Пользователей онлайн
              </Typography>
            </Grid>
            <Grid item sm="auto">
              <Typography className={classes.secondaryHeading}>10</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Box borderBottom={1}>
                <Grid
                  container
                  spacing={isMatchesSm ? 3 : 1}
                  align-items="flex-start"
                >
                  <Grid item xs={12} sm="auto">
                    <Typography>PerfectNickname</Typography>
                  </Grid>
                  <Grid item xs={12} sm="auto">
                    <Typography> userEmail@gmail.com</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item>
              <Box borderBottom={1}>
                <Grid
                  container
                  spacing={isMatchesSm ? 3 : 1}
                  align-items="flex-start"
                >
                  <Grid item xs={12} sm="auto">
                    <Typography>PerfectNickname</Typography>
                  </Grid>
                  <Grid item xs={12} sm="auto">
                    <Typography> userEmail@gmail.com</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default InfoPanel;
