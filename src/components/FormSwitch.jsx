import { Switch } from "@mantine/core";
import { useFormContext } from "react-hook-form";

const FormSwitch = (props) => {
  const { register } = useFormContext();
  const { name, ...rest } = props;
  return <Switch {...rest} {...register(name)} />;
};

export default FormSwitch;
