import * as React from "react";
import { makeStyles, Text } from "@fluentui/react-components";
import CryptDialog from "./CryptDialog";

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

const Crypting: React.FC<TextEncryptingProps> = (props: TextEncryptingProps) => {
  const [text, setText] = React.useState<string>("");
  const styles = useStyles();

  React.useEffect(() => {
    const handler = async () => {
      const selectedText = await props.selectedText();
      setText(selectedText || "");
    };

    Office.context.document.addHandlerAsync(
      Office.EventType.DocumentSelectionChanged,
      handler,
      (result) => {
        if (result.status !== Office.AsyncResultStatus.Succeeded) {
          console.error("Failed to add handler:", result.error.message);
        }
      }
    );
  }, []);

  return (
    <div>
      <Text block>
        <strong>How to Encrypt or Decrypt:</strong>
        <ol>
          <li>Select the text in your Word document you want to encrypt or decrypt.</li>
          <li>Click the corresponding button below.</li>
          <li>Enter your password. Use the same password to decrypt.</li>
        </ol>
      </Text>
      <div className={styles.textAreaDiv}>{text || "No text selected"}</div>
      <CryptDialog selectedText={text} mode={"encrypt"} />
      <CryptDialog selectedText={text} mode={"decrypt"} />
    </div>
  );
};

export default Crypting;
