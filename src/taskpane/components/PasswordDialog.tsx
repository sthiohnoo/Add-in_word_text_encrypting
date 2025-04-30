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
} from "@fluentui/react-components";

const PasswordDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleEncrypt = () => {
    //TODO: Encrypt Logic
    setOpen(false); //
  };

  return (
    <Dialog open={open} onOpenChange={(_, data) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button onClick={() => setOpen(true)}>Encrypt</Button>
      </DialogTrigger>

      <DialogSurface>
        <DialogBody>
          <DialogTitle>Confirm Encryption</DialogTitle>
          <DialogContent>Please enter your password to encrypt the selected text.</DialogContent>
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
