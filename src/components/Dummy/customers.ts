type CustomerProps = {
  key: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  id: number;
};

export const customers: CustomerProps[] = [
  {
    key: "1",
    name: "Francis Mitchman",
    id: Math.round(Math.random() * 1000000),
    email: "francismitchman@email.com",
    status: "Active",
    createdAt: "22 Sep 2023, 11:30 am",
  },
  {
    key: "2",
    name: "Francis Mitchman",
    id: Math.round(Math.random() * 1000000),
    email: "francismitchman@email.com",
    status: "Active",

    createdAt: "22 Sep 2023, 11:30 am",
  },
  {
    key: "3",
    name: "Francis Mitchman",
    id: Math.round(Math.random() * 1000000),
    email: "francismitchman@email.com",
    status: "Locked",

    createdAt: "22 Sep 2023, 11:30 am",
  },
  {
    key: "4",
    name: "Francis Mitchman",
    id: Math.round(Math.random() * 1000000),
    email: "francismitchman@email.com",
    status: "Active",
    createdAt: "22 Sep 2023, 11:30 am",
  },
];
