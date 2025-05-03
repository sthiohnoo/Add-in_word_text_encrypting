import * as React from "react";
import Header from "./Header";
import TextEncrypting from "./TextEncrypting";
import { makeStyles } from "@fluentui/react-components";
import { getSelectedText } from "../taskpane";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App: React.FC<AppProps> = (props: AppProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Header
        logo="assets/encryption-icon-15210.png"
        title={props.title}
        message="Welcome to my simple text en-/decrypting Add-in!"
      />
      <TextEncrypting selectedText={getSelectedText} />
    </div>
  );
};

export default App;
