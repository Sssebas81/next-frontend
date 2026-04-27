import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type TextFieldProps = {
  id: string;
  label: string;
  variant: 'outlined' | 'filled' | 'standard';
};

export default function BasicTextFields({id, label, variant}: TextFieldProps) {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id={id} label={label} variant={variant} />
      <TextField id={id} label={label} variant={variant} />
      <TextField id={id} label={label} variant={variant} />

    </Box>
  );
}
