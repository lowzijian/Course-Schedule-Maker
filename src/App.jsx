import {
  AppShell,
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
  useForm,
  useWatch,
} from "react-hook-form";
import { useState } from "react";
import { Calendar, Plus, Printer } from "tabler-icons-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "./components/FormInput";
import FormSwitch from "./components/FormSwitch";
import FormNumberInput from "./components/FormNumberInput";
import FormDatePicker from "./components/FormDatePicker";
import FormSelect from "./components/FormSelect";
import { timeSlotObj } from "./TimeSlotComponent";
import dayjs from "dayjs";
import TimeTable from "./Timetable";
import CopyButton from "./components/CopyButton";
import Summary from "./Summary";
import SubjectsForm from "./SubjectsForm";
import { SEM_DURATION_TYPES } from "./Utils";

const defaultSubjectObj = {
  subject: "",
  code: "",
  credit: 0,
  time_slot: [timeSlotObj],
};

const FormSelection = ({ reset }) => {
  const {
    field: { onBlur, value },
  } = useController({
    name: "form_type",
  });
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SegmentedControl
        data={[
          {
            label: "Form",
            value: "form",
          },
          { label: "Extract from copy", value: "copied" },
        ]}
        onChange={(value) =>
          reset({
            ...FORM_DEFAULT_VALUES,
            form_type: value,
          })
        }
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
        label="Title"
        placeholder="Enter schedule title"
        name="title"
        required
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
        />
        <FormNumberInput
          label="Week(s)"
          placeholder="Enter schedule weeks"
          required
          min={0}
          max={20}
          name="weeks"
        />
        <FormSelect
          label="Semester Type"
          placeholder="Pick one"
          required
          data={SEM_DURATION_TYPES}
          name="semester_type"
        />
      </Group>
    </Paper>
  );
};

const CopiedForm = ({ reset }) => {
  const _handleChangeCopyResult = (value) => {
    try {
      const copiedObj = JSON.parse(value);
      const finalValue = {
        ...copiedObj,
        form_type: "copied",
      };
      reset(finalValue);
    } catch (e) {
      return;
    }
  };

  return (
    <Box>
      <JsonInput
        label="Schedule From Copied Result"
        placeholder="Enter Copy of schedule"
        minRows={12}
        maxRows={16}
        onChange={_handleChangeCopyResult}
        validationError="Invalid json"
        formatOnBlur
      />
    </Box>
  );
};

const Review = ({ finalValues, handleCreateNewTimetable }) => {
  const totalCredits = finalValues?.subjects?.reduce((acc, curr) => {
    return acc + curr.credit;
  }, 0);

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

  return (
    <Paper shadow="xs" p="md" mt="xl">
      <Group position="apart" style={{ alignItems: "flex-start" }}>
        <Box>
          <Group>
            <Title order={5}>{finalValues?.title}</Title>
            {finalValues?.active && (
              <Code color="blue">
                {finalValues?.active ? "Active" : "Not Active"}
              </Code>
            )}
          </Group>
          <Space h="sm" />
          <Group>
            {finalValues?.semester_type && (
              <Code>{finalValues?.semester_type}</Code>
            )}
            {finalValues?.weeks && <Code>{finalValues?.weeks} week(s)</Code>}
            <Code>{finalValues?.subjects?.length} subject(s)</Code>
            <Code>{totalCredits} credits(s)</Code>
          </Group>
          <Space h="xs" />
          {finalValues.description && (
            <Text color="gray" size="sm">
              {finalValues?.description}
            </Text>
          )}
          <Text size="sm" color="dimmed">
            Starting from {dayjs(finalValues?.start_date).format("DD/MM/YYYY")}{" "}
            until
            {"  "}
            {dayjs(finalValues?.start_date)
              .add(finalValues?.weeks, "week")
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
          <CopyButton copyText={JSON.stringify(finalValues, undefined, 2)} />
        </Group>
      </Group>
      <Space h="md" />
      <TimeTable subjects={finalValues?.subjects} />
      <Space h="xl" />
      <Summary subjects={finalValues?.subjects} />
      <Space h="xl" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="gradient"
          gradient={{ from: "cyan", to: "indigo", deg: 105 }}
          onClick={handleCreateNewTimetable}
          leftIcon={<Plus size={18} />}
        >
          Create a new timetable
        </Button>
      </Box>
    </Paper>
  );
};

const FORM_DEFAULT_VALUES = {
  form_type: "form",
  title: "",
  description: "",
  active: true,
  weeks: 0,
  semester_type: "",
  start_date: new Date(),
  subjects: [defaultSubjectObj],
};

const App = () => {
  const [finalValues, setFinalValues] = useState();

  const validationSchema = yup
    .object({
      title: yup.string().required(),
      weeks: yup
        .number()
        .required()
        .min(1, "Must be at least 1 week")
        .max(20, "Must be at most 20 weeks"),
      semester_type: yup.string().required(),
      start_date: yup.date().required(),
      subjects: yup
        .array()
        .of(
          yup.object({
            subject: yup.string().required(),
            code: yup.string().required(),
            credit: yup.number(),
            time_slot: yup
              .array()
              .of(
                yup.object({
                  title: yup.string(),
                  type: yup.string().required(),
                  date: yup.string().required(),
                  venue: yup.string().required(),
                  time: yup
                    .array()
                    .of(
                      yup
                        .date()
                        .required()
                        .test(
                          "valid_time",
                          "Minutes must be end with 00 or 30",
                          (value) => {
                            //start time and end time must 30 or 00 minutes apart
                            const time = dayjs(value)
                              .format("HH:mm")
                              .split(":")[1];
                            return time === "30" || time === "00";
                          }
                        )
                        .test(
                          "valid_time_range",
                          "Time must be between 07:00 and 22:00",
                          (value) => {
                            const time = dayjs(value).hour();
                            return time >= 7 && time <= 22;
                          }
                        )
                    )
                    .min(2)
                    .max(2),
                })
              )
              .min(1, "Must have at least one time slot")
              .required(),
          })
        )
        .required()
        .min(1, "Must have at least 1 subject")
        .max(10, "Must be at most 10 subjects"),
    })
    .required();

  const methods = useForm({
    defaultValues: FORM_DEFAULT_VALUES,
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
  } = methods;
  const formType = useWatch({ name: "form_type", control });

  const onSubmit = (values) => {
    setFinalValues(values);
  };

  const _handleCreateNewTimetable = () => {
    setFinalValues(null);
    reset(FORM_DEFAULT_VALUES);
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
            Course Schedule Maker
          </Text>
        </Group>
        <Space h="xl" />
        {finalValues ? (
          <Review
            finalValues={finalValues}
            handleCreateNewTimetable={_handleCreateNewTimetable}
          />
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormSelection reset={reset} />
              {formType === "form" ? (
                <>
                  <ScheduleInfoForm />
                  <SubjectsForm />
                </>
              ) : (
                <CopiedForm reset={reset} />
              )}
              <Space h="xl" />
              <Group position="right">
                <Button
                  type="submit"
                  variant={!isValid ? "gray" : "gradient"}
                  gradient={{ from: "indigo", to: "cyan" }}
                  disabled={!isValid}
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
