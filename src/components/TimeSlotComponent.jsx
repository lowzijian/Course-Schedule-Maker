import { ActionIcon, Group, Text, Box, Button, Space } from "@mantine/core";
import { useFieldArray } from "react-hook-form";
import { Plus, Trash } from "tabler-icons-react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTimeRangePicker from "./FormTimeRangePicker";
export const timeSlotObj = {
  title: "",
  type: "",
  date: "",
  venue: "",
  time: [null, null],
};

const STUDY_TYPES = ["Lecture", "Tutorial", "Practical"];

const TIME_SLOT_TYPES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const TimeSlotComponent = ({ control, subIndex }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `subjects.${subIndex}.time_slot`,
  });

  const handleRemoveTimeSlot = (index) => {
    remove(index);
  };

  const handleAddTimeSlot = () => {
    append(timeSlotObj);
  };

  if (Array.isArray(fields) && fields.length > 0) {
    return (
      <Box>
        <Group ml={26} mb={12}>
          <Text
            size="sm"
            weight={500}
            style={{
              width: "20%",
            }}
          >
            Title
          </Text>
          <Text
            size="sm"
            weight={500}
            style={{
              width: "15%",
            }}
          >
            Study Type
          </Text>
          <Text
            size="sm"
            weight={500}
            style={{
              width: "15%",
            }}
          >
            Venue
          </Text>
          <Text
            size="sm"
            weight={500}
            style={{
              width: "15%",
            }}
          >
            Date
          </Text>
          <Text
            size="sm"
            weight={500}
            style={{
              width: "20%",
            }}
          >
            Time
          </Text>
        </Group>
        {fields.map((time_slot, index) => (
          <Group key={`time_slot-${index}`} ml={25} mb={8}>
            <FormInput
              style={{ width: "20%" }}
              placeholder="Enter title"
              required
              name={`subjects.${subIndex}.time_slot.${index}.title`}
            />
            <FormSelect
              style={{
                width: "15%",
              }}
              placeholder="Study Type"
              required
              data={STUDY_TYPES}
              control={control}
              name={`subjects.${subIndex}.time_slot.${index}.type`}
            />
            <FormInput
              style={{
                width: "15%",
              }}
              placeholder="Enter venue"
              required
              name={`subjects.${subIndex}.time_slot.${index}.venue`}
            />
            <FormSelect
              style={{
                width: "15%",
              }}
              placeholder="Pick one"
              required
              data={TIME_SLOT_TYPES}
              control={control}
              name={`subjects.${subIndex}.time_slot.${index}.date`}
            />
            <FormTimeRangePicker
              required
              style={{
                width: "20%",
              }}
              control={control}
              name={`subjects.${subIndex}.time_slot.${index}.time`}
            />
            <ActionIcon
              color="red"
              variant="hover"
              onClick={() => handleRemoveTimeSlot(index)}
            >
              <Trash size={16} />
            </ActionIcon>
          </Group>
        ))}
        <Space h="sm" />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="subtle"
            compact
            onClick={handleAddTimeSlot}
            leftIcon={<Plus size={16} />}
          >
            Add Time Slot
          </Button>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Text color="dimmed" size="sm" mb={6}>
          There are no time slot(s) yet.
        </Text>
        <Space h="sm" />
        <Button
          variant="subtle"
          compact
          onClick={handleAddTimeSlot}
          leftIcon={<Plus size={16} />}
        >
          Add Time Slot
        </Button>
      </Box>
    );
  }
};

export default TimeSlotComponent;
