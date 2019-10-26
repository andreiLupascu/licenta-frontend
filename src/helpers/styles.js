import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      flexDirection: "column"
    },
    button: {
      margin: theme.spacing(1)
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    gridParent: {
      display: "flex",
      flexWrap: "wrap"
    },
    gridChild: {
      margin: "5px",
      height: "200px",
      backgroundColor: "lightBlue",
      flex: "1 0 25%",
      fontSize: "30px",
      overflow: "auto"
    }
  }));