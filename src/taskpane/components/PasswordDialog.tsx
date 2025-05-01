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
import { encryptText } from "../utils/crypting";

interface PasswordDialogProps {
  selectedText: string;
}

const useStyles = makeStyles({
  dialog: {
    display: "flex",
    flexDirection: "column",
  },
});

const PasswordDialog: React.FC<PasswordDialogProps> = ({ selectedText }) => {
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const styles = useStyles();

  const handleEncrypt = async () => {
    const encryptedText = await encryptText(selectedText, password);
    console.log("Selected text:", selectedText);
    console.log("Encrypted text:", encryptedText);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(_, data) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button onClick={() => setOpen(true)}>Encrypt</Button>
      </DialogTrigger>

      <DialogSurface>
        <DialogBody>
          <DialogTitle>Confirm Encryption</DialogTitle>
          <DialogContent className={styles.dialog}>
            Please enter your password to encrypt the selected text.
            <Input
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </DialogContent>
          <DialogActions>
            <Button appearance="primary" onClick={handleEncrypt}>
              Encrypt
            </Button>
            <Button appearance="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default PasswordDialog;
