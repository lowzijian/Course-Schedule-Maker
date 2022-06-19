export const MOCK_DATA = {
  title: "Year 1 Sem 1",
  description: "This is the year 1 sem 1 form",
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

export const SEM_DURATION_TYPES = [
  "Long Semester",
  "Short Semester",
  "Internship",
];

export const STUDY_TYPES = ["Lecture", "Tutorial", "Practical"];

export const TIME_SLOT_TYPES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];
