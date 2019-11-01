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
    containerNoWrap:{
      display: "flex",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      flexDirection: "line"
    },
    button: {
      margin: theme.spacing(1)
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    gridParent: {
      display: "flex",
      flexWrap: "wrap",
      border: "1px solid black",
    },
    gridChild: {
      margin: "5px",
      height: "150px",
      flex: "1 0 27%",
      fontSize: "30px",
      overflow: "auto",
      border: "1px solid black",
    }
  }));