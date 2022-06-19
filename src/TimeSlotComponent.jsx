import { ActionIcon, Group, Text, Box, Button, Space } from "@mantine/core";
import { useFieldArray } from "react-hook-form";
import { Plus, Trash } from "tabler-icons-react";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import FormTimeRangePicker from "./components/FormTimeRangePicker";
import { STUDY_TYPES, TIME_SLOT_TYPES } from "./Utils";
export const timeSlotObj = {
  title: "",
  type: "",
  date: "",
  venue: "",
  time: [null, null],
};



const TimeSlotComponent = ({ subIndex }) => {
  const { fields, remove, append } = useFieldArray({
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
              name={`subjects.${subIndex}.time_slot.${index}.date`}
            />
            <FormTimeRangePicker
              required
              style={{
                width: "20%",
              }}
              name={`subjects.${subIndex}.time_slot.${index}.time`}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddTimeSlot();
                }
              }}
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
