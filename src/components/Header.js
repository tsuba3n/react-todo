import React, { useContext } from "react";
import dig from "object-dig";
import { signInWithGoogle, logOut } from "../service/firebase";
import { AuthContext } from "../providers/AuthProvider";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  toolbar: {
    justifyContent: 'space-between',
  },
  button: {
    color: '#FFF',
  }
}));

const Header = () => {
  const currentUser = useContext(AuthContext);
  // ログインしていたら
  const buttonRender = () => {
    let buttonDom
    if( dig(currentUser, "currentUser", "uid")){
      // digを利用せず、
      // if(currentUser.currentUser){}
      // ↑のようにすると、中身が存在しない！というエラーになるので、digを使う。
      // ※currentUser.currentUser.XXXXXという構造
      buttonDom = <Button variant="inherit" onClick={logOut}>ログアウト</Button>
    // ログインしていなかったら
    }else{
      buttonDom = <Button variant="inherit" onClick={signInWithGoogle}>ログイン</Button>
    }
    return buttonDom
  }
  const classes = useStyles();
  return(
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">
          ReactToDo
        </Typography>
        {buttonRender()}
      </Toolbar>
    </AppBar>
  )
}
export default Header;