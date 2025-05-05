import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Input,
  makeStyles,
} from "@fluentui/react-components";
import { decryptCipherText, encryptText } from "../utils/crypting";
import { replaceSelectedText } from "../taskpane";
import ErrorPopover from "./ErrorPopover";

interface PasswordDialogProps {
  selectedText: string;
  mode: string;
}

const useStyles = makeStyles({
  dialog: {
    display: "flex",
    flexDirection: "column",
  },
  encryptButton: {
    backgroundColor: "blue",
    color: "white",
  },
  decryptButton: {
    backgroundColor: "green",
    color: "white",
  },
});

const CryptDialog: React.FC<PasswordDialogProps> = ({ selectedText, mode }) => {
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [showPopover, setShowPopover] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const styles = useStyles();

  React.useEffect(() => {
    if (!open) {
      setPassword("");
    }
  }, [open]);

  const isEncryptMode = mode === "encrypt";
  const cryptButtonStyle = isEncryptMode ? styles.encryptButton : styles.decryptButton;
  const cryptButtonLabel = isEncryptMode ? "Encrypt" : "Decrypt";
  const dialogTitle = isEncryptMode ? "Confirm Encryption" : "Confirm Decryption";
  const dialogMessage = isEncryptMode
    ? "Please enter your password to encrypt the selected text."
    : "Please enter your password to decrypt the selected text.";

  const handleEncrypt = async () => {
    if (selectedText !== "") {
      const encryptedText = await encryptText(selectedText, password);
      await replaceSelectedText(encryptedText, "encrypt");
      setOpen(false);
    } else {
      setErrorMessage("No text selected. Please highlight text to encrypt.");
      setShowPopover(true);
      setTimeout(() => {
        setShowPopover(false);
      }, 3000);
    }
  };

  const handleDecrypt = async () => {
    if (selectedText !== "") {
      try {
        const decryptedText = await decryptCipherText(selectedText, password);
        await replaceSelectedText(decryptedText);
        setOpen(false);
      } catch (error) {
        setErrorMessage(error.message);
        setShowPopover(true);
        setTimeout(() => {
          setShowPopover(false);
        }, 3000);
      }
    } else {
      setErrorMessage("No text selected. Please highlight text to decrypt.");
      setShowPopover(true);
      setTimeout(() => {
        setShowPopover(false);
      }, 3000);
    }
  };

  const handleClick = isEncryptMode ? handleEncrypt : handleDecrypt;

  return (
    <Dialog open={open} onOpenChange={(_, data) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button className={cryptButtonStyle} onClick={() => setOpen(true)}>
          {cryptButtonLabel}
        </Button>
      </DialogTrigger>

      <DialogSurface>
        <DialogBody>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent className={styles.dialog}>
            {dialogMessage}
            <Input
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </DialogContent>
          <DialogActions>
            <ErrorPopover
              open={showPopover}
              trigger={
                <Button appearance="primary" onClick={handleClick} disabled={!password}>
                  {cryptButtonLabel}
                </Button>
              }
              message={errorMessage}
            />
            <Button appearance="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default CryptDialog;
