import * as React from "react";
import { makeStyles } from "@fluentui/react-components";
import PasswordDialog from "./PasswordDialog";

interface TextEncryptingProps {
  selectedText: () => Promise<string | null>;
}

const useStyles = makeStyles({
  textAreaDiv: {
    minHeight: "150px",
    fontSize: "15px",
    padding: "10px",
    backgroundColor: "#f1f1f1",
    color: "#333",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word",
    border: "1px solid #ddd",
  },
});

const TextEncrypting: React.FC<TextEncryptingProps> = (props: TextEncryptingProps) => {
  const [text, setText] = React.useState<string>("");
  const styles = useStyles();

  const handleSelectedText = async () => {
    const selectedText = await props.selectedText();
    setText(selectedText || "");
  };

  return (
    <div>
      <button onClick={handleSelectedText}>Show selected text</button>
      <div className={styles.textAreaDiv}>{text || "No text selected"}</div>
      <PasswordDialog />
    </div>
  );
};

export default TextEncrypting;
