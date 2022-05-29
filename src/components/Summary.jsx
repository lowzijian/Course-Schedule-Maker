import { Code, Table, Text, useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";

const Summary = ({ subjects }) => {
  const theme = useMantineTheme();
  const flattenedSubjects = subjects
    .map(({ code, subject, time_slot, credit }) => {
      return time_slot.map((time) => {
        const start_time = dayjs(time.time[0]).format("hh:mm a");
        const end_time = dayjs(time.time[1]).format("hh:mm a");
        const interval = (
          dayjs(time.time[1]).diff(dayjs(time.time[0]), "minutes") / 60
        ).toFixed(1);
        return {
          ...time,
          subject,
          code,
          credit,
          start_time,
          end_time,
          interval,
        };
      });
    })
    .flat();

  let prevSub = "";
  let curIndex = 0;

  return (
    <Table
      id="summary"
      sx={{
        "table, th, td ": {
          border: `1px solid ${theme.colors.gray[7]}`,
          fontSize: 14,
          textAlign: "center !important",
        },
        "tbody tr:last-of-type td": {
          borderBottom: `1px solid ${theme.colors.gray[7]} !important`,
        },
        "#subject-cell": {
          textAlign: "left !important",
        },
      }}
    >
      <thead>
        <tr>
          <th width="3%">No</th>
          <th>Code</th>
          <th>Description</th>
          <th>Title</th>
          <th>Day</th>
          <th width="3%">Type</th>
          <th>Time</th>
          <th>Venue</th>
          <th>Hour</th>
        </tr>
      </thead>
      <tbody>
        {flattenedSubjects.map(
          (
            {
              subject,
              code,
              title,
              type,
              date,
              start_time,
              end_time,
              interval,
              venue,
              credit,
            },
            index
          ) => {
            prevSub = prevSub === subject ? "" : subject;
            let rowSpan = 1;
            if (prevSub) {
              const similarItem = flattenedSubjects.filter(
                (item) => item.subject === subject
              );
              rowSpan = similarItem.length;
              curIndex++;
            }
            return (
              <tr
                key={`subject-${index}`}
                style={{
                  verticalAlign: "top",
                }}
              >
                {prevSub && (
                  <>
                    <td rowSpan={rowSpan}>{curIndex}</td>
                    <td rowSpan={rowSpan} width="8%" className="summary-code">
                      {code}
                    </td>
                    <td rowSpan={rowSpan} id="subject-cell" width="30%">
                      <Text size="sm" className="summary-subject">
                        {subject}
                      </Text>
                      <Code className="summary-credit-code">
                        {credit} credit(s)
                      </Code>
                    </td>
                  </>
                )}
                <td>{title}</td>
                <td>{date.slice(0, 3)}</td>
                <td width="3%" align="center">
                  {type.slice(0, 1)}
                </td>
                <td align="center">
                  {start_time} - {end_time}
                </td>
                <td>{venue}</td>
                <td>{interval}</td>
              </tr>
            );
          }
        )}
      </tbody>
    </Table>
  );
};

export default Summary;
