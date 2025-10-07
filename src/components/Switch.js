import { Switch, FormControlLabel, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  switchBase: {
    "&$checked": {
      color: theme.palette.success.main,
    },
    "&$checked + $track": {
      backgroundColor: theme.palette.success.main,
    },
  },
  checked: {},
  track: {},
  unchecked: {
    "&$switchBase": {
      color: theme.palette.error.main,
    },
    "&$switchBase + $track": {
      backgroundColor: theme.palette.error.main,
    },
  },
}));

const SliderCheckbox = ({
  checked,
  onChange,
  labelChecked = "Activado",
  labelUnchecked = "Desactivado",
}) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={onChange}
          classes={{
            switchBase: classes.switchBase,
            checked: classes.checked,
            track: classes.track,
          }}
        />
      }
      label={checked ? labelChecked : labelUnchecked}
    />
  );
};

export default SliderCheckbox;
