import { DatePicker } from "@mantine/dates";
import { useController } from "react-hook-form";

const FormDatePicker = (props) => {
  const { name, control, ...rest } = props;
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
  });

  return (
    <DatePicker
      {...rest}
      value={value}
      onChange={(value) => onChange(value)}
      ref={ref}
      onBlur={onBlur}
    />
  );
};

export default FormDatePicker;
