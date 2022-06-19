import { Select } from "@mantine/core";
import { useController } from "react-hook-form";

const FormSelect = (props) => {
  const { name, ...rest } = props;
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error = {} },
  } = useController({
    name,
  });
  return (
    <Select
      {...rest}
      value={value}
      onChange={(value) => onChange(value)}
      ref={ref}
      onBlur={onBlur}
      error={error?.message}
    />
  );
};

export default FormSelect;
