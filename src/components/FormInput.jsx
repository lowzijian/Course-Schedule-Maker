import { TextInput } from "@mantine/core";
import { useFormContext } from "react-hook-form";

const FormInput = (props) => {
  const {
    register,
    formState: { errors = {} },
  } = useFormContext();
  const { name, ...rest } = props;
  return (
    <TextInput {...rest} {...register(name)} error={errors?.[name]?.message} />
  );
};

export default FormInput;
