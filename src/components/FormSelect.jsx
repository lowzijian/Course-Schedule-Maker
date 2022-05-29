import { Select } from "@mantine/core";
import { useController } from "react-hook-form";

const FormSelect = (props) => {
  const { name, control, ...rest } = props;
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
  });

  return (
    <Select
      {...rest}
      value={value}
      onChange={(value) => onChange(value)}
      ref={ref}
      onBlur={onBlur}
    />
  );
};

export default FormSelect;
