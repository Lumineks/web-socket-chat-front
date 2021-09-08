import { Box, Grid } from "@material-ui/core";
import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  // heading: {
  //   fontSize: theme.typography.pxToRem(15),
  //   flexBasis: "50%",
  //   flexShrink: 0,
  // },
  // secondaryHeading: {
  //   fontSize: theme.typography.pxToRem(15),
  //   color: theme.palette.text.secondary,
  // },
  // details: {
  //   overflow: "auto",
  //   maxHeight: 400,
  // },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

const InfoPanel = ({ usersOnline }) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const isMatchesSm = useMediaQuery(theme.breakpoints.up("sm"));

  const handleChange = () => {
    setExpanded((expanded) => (expanded ? false : true));
  };

  // const content = usersOnline.map((user) => {
  //   return (
  //     <Grid item key={user.name}>
  //       <Box borderBottom={1}>
  //         <Grid
  //           container
  //           spacing={isMatchesSm ? 3 : 1}
  //           align-items="flex-start"
  //         >
  //           <Grid item xs={12} sm={4}>
  //             <Typography>{user.name}</Typography>
  //           </Grid>
  //           <Grid item xs={12} sm="auto">
  //             <Typography>{user.email}</Typography>
  //           </Grid>
  //         </Grid>
  //       </Box>
  //     </Grid>
  //   );
  // });

  return (
    <Grid item xs={12} md={3}>
      <List dense>
        <ListItem>
          <ListItemText primary="Zoren harriss" secondary='someoneemail@gmail.com' />
        </ListItem>
        <ListItem>
          <ListItemText primary="Zoren harriss" secondary='someoneemail@gmail.com' />
        </ListItem>
        <ListItem>
          <ListItemText primary="Zoren harriss" secondary='someoneemail@gmail.com' />
        </ListItem>
        <ListItem>
          <ListItemText primary="Zoren harriss" secondary='someoneemail@gmail.com' />
        </ListItem>
        <ListItem>
          <ListItemText primary="Zoren harriss" secondary='someoneemail@gmail.com' />
        </ListItem>
        <ListItem>
          <ListItemText primary="Zoren harriss" secondary='someoneemail@gmail.com' />
        </ListItem>
        <ListItem>
          <ListItemText primary="Zoren harriss" secondary='someoneemail@gmail.com' />
        </ListItem>
        <ListItem>
          <ListItemText primary="Zoren harriss" secondary='someoneemail@gmail.com' />
        </ListItem>
        <ListItem>
          <ListItemText primary="Zoren harriss" secondary='someoneemail@gmail.com' />
        </ListItem>
        {/* {usersOnline.map((user) => (
          <ListItem>
            <ListItemText
              primary={user.name}
              secondary={user.email}
            />
          </ListItem>
        ))} */}
      </List>
    </Grid>
  );
};

export default InfoPanel;

// <Accordion expanded={expanded} onChange={handleChange}>
// <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1bh-header">
//   <Grid
//     container
//     alignItems="center"
//     justifyContent="flex-start"
//     spacing={isMatchesSm ? 2 : 1}
//   >
//     <Grid item sm="auto">
//       <Typography className={classes.heading}>
//         Пользователей онлайн
//       </Typography>
//     </Grid>
//     <Grid item sm="auto">
//       <Typography className={classes.secondaryHeading}>
//         {usersOnline.length}
//       </Typography>
//     </Grid>
//   </Grid>
// </AccordionSummary>
// <AccordionDetails className={classes.details}>
//   <Grid container direction="column" spacing={2}>
//     {content}

//   </Grid>
// </AccordionDetails>
// </Accordion>
