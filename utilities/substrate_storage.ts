const component = {
  "0x01000000": {
    owner: "Davide Gallotti",
    max_borrows: 0,
    max_children: 0,
    properties: {
      type: "Bachelor",
      university: "Politecnico di Torino",
      vote: 110,
      date: "23/03/2018",
    },
  },
  "0x02000000": {
    owner: "Davide Gallotti",
    max_borrows: 0,
    max_children: 0,
    properties: {
      exam: "Computational Geometry",
      vote: 27,
      university: "Politecnico di Torino",
    },
  },
  "0x03000000": {
    max_borrows: 0,
    max_children: 0,
    owner: "Davide Gallotti",
    properties: {
      exam: "Mathematical Analysis",
      vote: 23,
      university: "Politecnico di Torino",
    },
  },
};

const outgoings = {
  "0x01000000": {
    passed_0: "0x02000000",
    passed_1: "0x03000000",
  },
};

const storage: any = {
  component: component,
  outgoings: outgoings,
};

export function storage_query(storage_name: string, args: string[]) {
  return storage[storage_name][args[0]];
}
