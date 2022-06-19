import { Box, Table, Text, useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";
import { TIME_SLOT_TYPES } from "./Utils";

const TimeTable = ({ subjects = [] }) => {
  const theme = useMantineTheme();
  const daysRows = TIME_SLOT_TYPES;

  const flattenedSubjects = subjects
    .map(({ code, subject, time_slot }) => {
      return time_slot.map((time) => {
        const start_time = dayjs(time.time[0]).format("HH:mm");
        const end_time = dayjs(time.time[1]).format("HH:mm");
        const interval =
          dayjs(time.time[1]).diff(dayjs(time.time[0]), "minutes") / 60;
        return {
          ...time,
          subject,
          code,
          start_time,
          end_time,
          interval,
        };
      });
    })
    .flat();

  //earliest start time
  const earliestStartTime = flattenedSubjects.reduce((acc, curr) => {
    return dayjs(curr.time[0]).isBefore(dayjs(acc)) ? curr.time[0] : acc;
  }, 7);

  const startTime = earliestStartTime;

  const endTime = 20;

  const timeInterval = 0.5;

  const cellsPerDate = 1 / timeInterval;

  //construct time rows start from 7am to 12am using dayjs
  const firstTimeRows = [...Array(endTime - startTime).keys()].map((hour) => {
    const time = new Date(0, 0, 0, startTime + hour, 0, 0, 0);
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  });
  const secondTimeRows = [...Array(endTime - startTime).keys()].map((hour) => {
    const time = new Date(0, 0, 0, startTime + hour + 1, 0, 0, 0);
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  });

  const groupedTimeSlotsByDay = daysRows.reduce((acc, curr) => {
    const timeSlots = flattenedSubjects.filter(
      (timeSlot) => timeSlot.date === curr
    );
    return {
      ...acc,
      [curr]: timeSlots,
    };
  }, {});

  let skipTimeSlot = 0;

  return (
    <Table
      id="timetable"
      sx={{
        "table, th, td ": {
          border: `1px solid ${theme.colors.gray[7]}`,
          fontSize: 14,
        },
        "tbody tr:last-of-type td": {
          borderBottom: `1px solid ${theme.colors.gray[7]} !important`,
        },
        td: {
          padding: `0px !important`,
        },
        th: {
          padding: "7px 10px",
        },
      }}
    >
      <thead>
        <tr>
          <th></th>
          {firstTimeRows.map((time) => (
            <th key={`${time}-first`} colSpan={cellsPerDate}>
              {time}
            </th>
          ))}
        </tr>
        <tr>
          <td></td>
          {secondTimeRows.map((time) => (
            <th key={`${time}-second`} colSpan={cellsPerDate}>
              {time}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.keys(groupedTimeSlotsByDay).map((day) => {
          const values = groupedTimeSlotsByDay[day];
          //sort values by start position
          const sortedValues = values.sort(
            (a, b) => a.startPosition - b.startPosition
          );

          return (
            <tr key={day}>
              <th align="left">{day}</th>
              {Array(firstTimeRows.length * cellsPerDate)
                .fill(0)
                .map((o, index) => {
                  //check if the current index is odd or even
                  const timeFrame =
                    firstTimeRows[Math.floor(index / cellsPerDate)];

                  //remove :00 from time frame
                  const timeFrameWithoutSeconds = timeFrame.slice(0, -3);

                  //check if the current index is odd or even
                  const isOdd = index % 2 === 0;

                  const time = isOdd
                    ? timeFrame
                    : timeFrameWithoutSeconds + ":30";
                  let matchTimeSlot = null;
                  if (time) {
                    matchTimeSlot = matchTimeSlot = sortedValues.find(
                      (val) => val.start_time === time
                    );
                  }
                  if (matchTimeSlot) {
                    if (matchTimeSlot.interval > 1) {
                      skipTimeSlot = matchTimeSlot.interval * cellsPerDate;
                    } else {
                      skipTimeSlot = cellsPerDate;
                    }

                    return (
                      <td
                        key={`${day}-${time}-${matchTimeSlot.code}`}
                        colSpan={skipTimeSlot}
                        style={{
                          background: theme.colors.gray[8],
                          border: `1px solid ${theme.colors.gray[7]}`,
                        }}
                        className="timetable-class"
                      >
                        <Box
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Text weight={500} size="sm">
                            {matchTimeSlot.code}({matchTimeSlot.title})
                          </Text>
                          <Text size="xs" color="dimmed">
                            {matchTimeSlot.venue}
                          </Text>
                        </Box>
                      </td>
                    );
                  }
                  if (skipTimeSlot > 1) {
                    skipTimeSlot--;
                    return false;
                  }
                  return <td key={`${day}-${time}`}></td>;
                })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TimeTable;
