import {
  AppShell,
  ActionIcon,
  Box,
  Button,
  Code,
  Container,
  Group,
  Paper,
  Space,
  Text,
  Title,
  ThemeIcon,
  SegmentedControl,
  JsonInput,
} from "@mantine/core";
import {
  FormProvider,
  useController,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { randomId } from "@mantine/hooks";
import { useState } from "react";
import { Calendar, Plus, Printer, Trash } from "tabler-icons-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "./components/FormInput";
import FormSwitch from "./components/FormSwitch";
import FormNumberInput from "./components/FormNumberInput";
import FormDatePicker from "./components/FormDatePicker";
import FormSelect from "./components/FormSelect";
import TimeSlotComponent, { timeSlotObj } from "./components/TimeSlotComponent";
import dayjs from "dayjs";
import TimeTable from "./components/Timetable";
import CopyButton from "./components/CopyButton";
import Summary from "./components/Summary";

const SEM_DURATION_TYPES = ["Long Semester", "Short Semester", "Internship"];

const defaultSubjectObj = {
  subject: "",
  code: "",
  credit: 0,
  time_slot: [timeSlotObj],
};

const MOCK_DATA = {
  form_type: "form",
  id: "mantine-5h62nkcnw",
  title: "Year 1 Sem 1",
  description: "",
  active: true,
  weeks: 14,
  semester_type: "Long Semester",
  start_date: "2022-05-01T16:00:00.000Z",
  subjects: [
    {
      subject: "Introduction To Mass Communication",
      code: "SM101",
      credit: 4,
      time_slot: [
        {
          title: "L1",
          type: "Lecture",
          date: "Wednesday",
          venue: "G08-06 ",
          time: ["2022-05-29T07:30:00.000Z", "2022-05-29T09:00:00.000Z"],
        },
        {
          title: "L2",
          type: "Lecture",
          date: "Thursday",
          venue: "C203",
          time: ["2022-05-29T00:00:00.000Z", "2022-05-29T01:30:00.000Z"],
        },
      ],
    },
    {
      subject: "Film Studies",
      code: "SM106",
      credit: 4,
      time_slot: [
        {
          title: "L1",
          type: "Lecture",
          date: "Monday",
          venue: "C407",
          time: ["2022-05-29T01:30:00.000Z", "2022-05-29T03:00:00.000Z"],
        },
        {
          title: "L2",
          type: "Lecture",
          date: "Wednesday",
          venue: "C407",
          time: ["2022-05-29T01:30:00.000Z", "2022-05-29T03:00:00.000Z"],
        },
      ],
    },
    {
      subject: "Basic Photography",
      code: "SM109",
      credit: 4,
      time_slot: [
        {
          title: "L1",
          type: "Lecture",
          date: "Monday",
          venue: "CG04",
          time: ["2022-05-29T03:00:00.000Z", "2022-05-29T04:30:00.000Z"],
        },
        {
          title: "L2",
          type: "Lecture",
          date: "Wednesday",
          venue: "G0110",
          time: ["2022-05-29T06:00:00.000Z", "2022-05-29T07:30:00.000Z"],
        },
      ],
    },
    {
      subject: "Visual Communication",
      code: "SM110",
      credit: 4,
      time_slot: [
        {
          title: "L1",
          type: "Lecture",
          date: "Wednesday",
          venue: "CG03",
          time: ["2022-05-29T04:30:00.000Z", "2022-05-29T06:00:00.000Z"],
        },
        {
          title: "L2",
          type: "Lecture",
          date: "Thursday",
          venue: "C409 ",
          time: ["2022-05-29T01:30:00.000Z", "2022-05-29T03:00:00.000Z"],
        },
      ],
    },
    {
      subject: "University Life",
      code: "MPU3223",
      credit: 1,
      time_slot: [
        {
          title: "L1",
          type: "Lecture",
          date: "Monday",
          venue: "C302",
          time: ["2022-05-29T09:00:00.000Z", "2022-05-29T10:30:00.000Z"],
        },
        {
          title: "L2",
          type: "Lecture",
          date: "Thursday",
          venue: "GG07",
          time: ["2022-05-29T04:30:00.000Z", "2022-05-29T06:00:00.000Z"],
        },
      ],
    },
    {
      subject: "Penghayatan Etika dan Peradaban",
      code: "MPU31103",
      credit: 1,
      time_slot: [
        {
          title: "L1",
          type: "Lecture",
          date: "Tuesday",
          venue: "GG07",
          time: ["2022-05-29T06:00:00.000Z", "2022-05-29T09:00:00.000Z"],
        },
      ],
    },
  ],
};

const App = () => {
  const [finalValues, setFinalValues] = useState(MOCK_DATA);
  const schema = yup.object({
    title: yup.string().required(),
    weeks: yup
      .number()
      .required()
      .min(1, { message: "Must be at least 1 week" })
      .max(20, { message: "Must be at most 20 weeks" }),
    semester_type: yup.string().required(),
    start_date: yup.date().required(),
    subjects: yup
      .array()
      .of(
        yup.object({
          subject: yup.string().required(),
          code: yup.string(),
          credit: yup.number(),
          time_slot: yup.array().of(
            yup.object({
              title: yup.string().required(),
              type: yup.string(),
              date: yup.string().required(),
              venue: yup.string(),
              time: yup.array().of(yup.date().required()),
            })
          ),
        })
      )
      .max(10, { message: "Must be at most 10 subjects" }),
  });

  const methods = useForm({
    defaultValues: {
      form_type: "form",
      id: randomId(),
      title: "",
      description: "",
      active: true,
      weeks: 0,
      semester_type: "",
      start_date: new Date(),
      subjects: [defaultSubjectObj],
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit, control, reset } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });
  const formType = useWatch({ name: "form_type", control });

  const onSubmit = (values) => {
    setFinalValues(values);
  };

  const handleAddCourse = () => {
    append(defaultSubjectObj);
  };

  const _handlePrint = () => {
    let wnd = window.open("about:blank", "_blank");
    wnd.document.write(
      "<p>Generating timetable, please do not close this screen...</p>"
    );
    wnd.document.body.innerHTML = "";
    const summary = document.getElementById("summary").innerHTML;
    const timetable = document.getElementById("timetable").innerHTML;

    const data = `
      <html>
      <head>
        <title>${finalValues.title} Timetable</title>
        <script>
        window.addEventListener('DOMContentLoaded', (event) => {
          window.print();
         });
        </script>
        <style>
        :root {
          --black: #000000;
          --lightgray: #ededed;
          --normal-font-size: 12.5px;
        }
        body {
          font-size: var(--normal-font-size);
          line-height: 24px;
          font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
          color:  var(--black);
        }
        .wrapper {
          margin: auto;
          padding: 30px;
          max-width: 80%;
        }
         table, th, td {
          border: 1px solid black;
          border-collapse: collapse;
        }
        .summary-table th , td  {
          text-align: center;
        }

        .timetable-table   {
          margin-bottom: 30px;
        }

        .bordered-table {
          width: 100%;
        }
        .timetable-class {
          background-color: var(--lightgray) !important;
          text-align: center !important;
        }
        #subject-cell {
          text-align: left !important;
        }
        .summary-credit-code {
          display:none;
        }
        .summary-code , .summary-subject {
          text-transform: uppercase;
        }

        @media print {
          @page {size: landscape}
          .wrapper {
            padding: 0;
            -webkit-print-color-adjust: exact;
            color-adjust: exact; /* Non-Webkit Browsers */
            max-width: 100%;
          }
        }
        </style>
      </head>
      <body>
      <div class="wrapper">
        <table class="bordered-table timetable-table ">
        ${timetable}
        </table>
        <table class="bordered-table summary-table">
        ${summary}
        </table>
        </div>
      </body>
      </html>
    `;
    if (data) {
      wnd.document.write(data);
    } else {
      wnd.document.write("<p>Something wrong while generating table.</p>");
    }
    wnd.document.close();
  };

  const FormSelection = () => {
    const {
      field: { onChange, onBlur, value },
    } = useController({
      name: "form_type",
      control,
    });
    return (
      <Box>
        <Text>Select Form Type</Text>
        <Space h="sm" />
        <SegmentedControl
          data={[
            {
              label: "Form",
              value: "form",
            },
            { label: "JSON", value: "json" },
          ]}
          onChange={(value) => onChange(value)}
          onBlur={onBlur}
          value={value}
        />
        <Space h="lg" />
      </Box>
    );
  };

  const ScheduleInfoForm = () => {
    return (
      <Paper shadow="xs" p="md" mt="xl">
        <Group position="apart">
          <Title order={5}>Schedule Information</Title>
          <FormSwitch label="Active" name="active" />
        </Group>
        <Space h="lg" />
        <FormInput
          required
          label="Title"
          placeholder="Enter schedule title"
          name="title"
        />
        <Space h="sm" />
        <FormInput
          label="Description"
          placeholder="Enter brief description about the schedule ..."
          name="description"
        />
        <Space h="sm" />
        <Group grow>
          <FormDatePicker
            label="Start at"
            placeholder="Pick date"
            name="start_date"
            required
            control={control}
          />
          <FormNumberInput
            label="Week(s)"
            placeholder="Enter schedule weeks"
            required
            min={0}
            max={20}
            name="weeks"
            control={control}
          />
          <FormSelect
            label="Semester Type"
            placeholder="Pick one"
            required
            data={SEM_DURATION_TYPES}
            name="semester_type"
            control={control}
          />
        </Group>
      </Paper>
    );
  };

  const SubjectForm = () => {
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
        {Array.isArray(fields) &&
          fields.length > 0 &&
          fields.map((course, subIndex) => {
            return (
              <Box key={`course-${subIndex}`}>
                <Group mb={2}>
                  <Text
                    transform="uppercase"
                    weight={500}
                    size="sm"
                    color="blue"
                  >
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
                <TimeSlotComponent subIndex={subIndex} {...{ control }} />
              </Box>
            );
          })}
      </Paper>
    );
  };

  const JSONForm = () => {
    return (
      <JsonInput
        label="Schedule JSON"
        placeholder="Enter JSON of schedule"
        validationError="Invalid json"
        formatOnBlur
        minRows={4}
        onChange={(value) => reset(value)}
      />
    );
  };

  const Review = () => {
    const totalCredits = finalValues.subjects.reduce((acc, curr) => {
      return acc + curr.credit;
    }, 0);
    return (
      <Paper shadow="xs" p="md" mt="xl">
        <Group position="apart" style={{ alignItems: "flex-start" }}>
          <Box>
            <Group>
              <Title order={5}>{finalValues.title}</Title>
              {finalValues.active && (
                <Code color="blue">
                  {finalValues.active ? "Active" : "Not Active"}
                </Code>
              )}
            </Group>
            <Space h="sm" />
            <Group>
              {finalValues.semester_type && (
                <Code>{finalValues.semester_type}</Code>
              )}
              {finalValues.weeks && <Code>{finalValues.weeks} week(s)</Code>}
              <Code>{finalValues.subjects.length} subject(s)</Code>
              <Code>{totalCredits} credits(s)</Code>
            </Group>
            <Space h="xs" />
            {finalValues.description && (
              <Text color="gray" size="sm">
                {finalValues.description}
              </Text>
            )}
            <Text size="sm" color="dimmed">
              Starting from {dayjs(finalValues.start_date).format("DD/MM/YYYY")}{" "}
              until
              {"  "}
              {dayjs(finalValues.start_date)
                .add(finalValues.weeks, "week")
                .format("DD/MM/YYYY")}
            </Text>
          </Box>
          <Group>
            <Button
              leftIcon={<Printer size={18} />}
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
              onClick={_handlePrint}
            >
              Print
            </Button>
            <CopyButton copyText={JSON.stringify(finalValues)} />
          </Group>
        </Group>
        <Space h="md" />
        <TimeTable subjects={finalValues.subjects} />
        <Space h="xl" />
        <Summary subjects={finalValues.subjects} />
      </Paper>
    );
  };

  return (
    <AppShell
      styles={(theme) => ({
        root: {
          height: "100%",
        },
        body: {
          height: "100%",
        },
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          minHeight: "100vh",
          height: "100%",
        },
      })}
    >
      <Container size="lg" pt={25}>
        <Group position="center">
          <ThemeIcon
            size="lg"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            <Calendar size={20} />
          </ThemeIcon>
          <Text
            size="lg"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            weight="bold"
          >
            Course Schedule Planner
          </Text>
        </Group>

        <Space h="xl" />
        {finalValues ? (
          <Review />
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormSelection />
              {formType === "form" ? (
                <>
                  <ScheduleInfoForm />
                  <SubjectForm />
                </>
              ) : (
                <JSONForm />
              )}

              <Space h="xl" />
              <Group position="right">
                <Button
                  type="submit"
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan" }}
                >
                  Submit
                </Button>
              </Group>
            </form>
          </FormProvider>
        )}
      </Container>
    </AppShell>
  );
};

export default App;
