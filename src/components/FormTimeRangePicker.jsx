import { TimeRangeInput } from "@mantine/dates";
import { useController } from "react-hook-form";

const FormTimeRangePicker = (props) => {
  const { name, control, ...rest } = props;
  const {
    field: { onChange, onBlur, value = [null, null], ref },
  } = useController({
    name,
    control,
  });

  return (
    <TimeRangeInput
      {...rest}
      value={value}
      onChange={(value) => onChange(value)}
      ref={ref}
      onBlur={onBlur}
    />
  );
};

export default FormTimeRangePicker;
