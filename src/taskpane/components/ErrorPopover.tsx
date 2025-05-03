import * as React from "react";
import { makeStyles, Popover, PopoverSurface, PopoverTrigger } from "@fluentui/react-components";

interface ErrorPopoverProps {
  open: boolean;
  trigger: React.ReactElement;
  message: string;
}

interface ErrorContentProps {
  message: string;
}

const useStyles = makeStyles({
  contentHeader: {
    marginTop: "0",
    color: "red",
  },
});

const ErrorContent: React.FC<ErrorContentProps> = ({ message }) => {
  const styles = useStyles();
  return (
    <div>
      <h3 className={styles.contentHeader}>Error</h3>

      <div>{message}</div>
    </div>
  );
};

const ErrorPopover: React.FC<ErrorPopoverProps> = ({ open, trigger, message }) => {
  return (
    <Popover open={open} withArrow>
      <PopoverTrigger disableButtonEnhancement>{trigger}</PopoverTrigger>
      <PopoverSurface tabIndex={-1}>
        <ErrorContent message={message} />
      </PopoverSurface>
    </Popover>
  );
};

export default ErrorPopover;
