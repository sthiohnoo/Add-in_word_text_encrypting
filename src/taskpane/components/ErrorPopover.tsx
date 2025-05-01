import * as React from "react";
import { makeStyles, Popover, PopoverSurface, PopoverTrigger } from "@fluentui/react-components";

interface ErrorPopoverProps {
  open: boolean;
  trigger: React.ReactElement;
}

const useStyles = makeStyles({
  contentHeader: {
    marginTop: "0",
    color: "red",
  },
});

const ErrorContent = () => {
  const styles = useStyles();
  return (
    <div>
      <h3 className={styles.contentHeader}>Error</h3>

      <div>No text selected. Please highlight text to encrypt.</div>
    </div>
  );
};

const ErrorPopover: React.FC<ErrorPopoverProps> = ({ open, trigger }) => {
  return (
    <Popover open={open} withArrow>
      <PopoverTrigger disableButtonEnhancement>{trigger}</PopoverTrigger>
      <PopoverSurface tabIndex={-1}>
        <ErrorContent />
      </PopoverSurface>
    </Popover>
  );
};

export default ErrorPopover;
