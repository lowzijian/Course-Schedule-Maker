import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Group,
  Paper,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { useFieldArray } from "react-hook-form";
import { InfoCircle, Plus, Trash } from "tabler-icons-react";
import FormInput from "./components/FormInput";
import FormNumberInput from "./components/FormNumberInput";
import TimeSlotComponent, { timeSlotObj } from "./TimeSlotComponent";

const defaultSubjectObj = {
  subject: "",
  code: "",
  credit: 0,
  time_slot: [timeSlotObj],
};

const SubjectsForm = () => {
  const { fields, append, remove } = useFieldArray({
    name: "subjects",
  });

  const handleAddCourse = () => {
    append(defaultSubjectObj);
  };

  return (
    <Paper shadow="xs" p="md" mt="xl">
      <Group position="apart">
        <Box>
          <Title order={5}>Subject(s)</Title>
          <Text color="dimmed" size="sm">
            You currently have {fields.length} subjects(s).
          </Text>
        </Box>
        <Button
          type="button"
          variant="subtle"
          leftIcon={<Plus size={16} />}
          onClick={handleAddCourse}
          disabled={fields.length >= 10}
          compact
        >
          Add Subject
        </Button>
      </Group>
      <Space h="lg" />
      <Alert icon={<InfoCircle size={16} />} title="Guidelines">
        <Text size="sm">
          - You can add up to <strong>1-10</strong> subjects.
        </Text>
        <Text size="sm">
          - Time must be in <strong>24-hour</strong> format, minutes end with{" "}
          <strong>00</strong> or <strong>30</strong>.
        </Text>
        <Text size="sm">
          - One subject must have at least <strong>1</strong> time slot.
        </Text>
        <Text size="sm">
          - The time must be fallen between <strong>7:00AM</strong> until <strong>10:00PM</strong>.
        </Text>
      </Alert>
      <Space h="lg" />
      {Array.isArray(fields) &&
        fields.length > 0 &&
        fields.map((course, subIndex) => {
          return (
            <Box key={`course-${subIndex}`}>
              <Group mb={2}>
                <Text transform="uppercase" weight={500} size="sm" color="blue">
                  {`Subject ${subIndex + 1}`}
                </Text>
                <ActionIcon
                  color="red"
                  variant="hover"
                  onClick={() => remove(subIndex)}
                >
                  <Trash size={16} />
                </ActionIcon>
              </Group>
              <Space h="xs" />
              <Group>
                <FormInput
                  placeholder="Enter course subject"
                  required
                  style={{ flex: 2 }}
                  name={`subjects.${subIndex}.subject`}
                />
                <FormInput
                  placeholder="Enter course code"
                  required
                  name={`subjects.${subIndex}.code`}
                />
                <FormNumberInput
                  placeholder="Enter course credit"
                  required
                  min={0}
                  name={`subjects.${subIndex}.credit`}
                />
              </Group>
              <Space h="sm" />
              <TimeSlotComponent subIndex={subIndex} />
            </Box>
          );
        })}
    </Paper>
  );
};

export default SubjectsForm;
