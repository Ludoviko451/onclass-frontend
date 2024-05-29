// testing/mocks.ts
export const mocks = {
    technologies: [
      {
        id: 1,
        name: "Angular",
        description: "blabla"
      },
      {
        id: 2,
        name: "React",
        description: "blabla"
      }
    ],

    capacities: [
      {
        id: 1,
        name: "Capacidad 1",
        description: "blabla",
        technologiesList: []
      },
      {
        id: 2,
        name: "Capacidad 2",
        description: "blabla",
        technologiesList: []
      }
    ],
  
    onlyOne: {
      id: 1,
      name: "C#",
      description: "blabla"
    },


    version: {
      id: 1,
      bootcampName: 'Bootcamp 1',
      startDate: '01-01-2024',
      endDate: '01-01-2025',
      maximumCapacity: 20
    },

    versions: [
      {
        id: 1,
        bootcampName: 'Bootcamp 1',
        startDate: '01-01-2024',
        endDate: '01-01-2025',
        maximumCapacity: 20
      },
      {
        id: 2,
        bootcampName: 'Bootcamp 2',
        startDate: '01-01-2024',
        endDate: '01-01-2025',
        maximumCapacity: 20
      }
    ],

    versionRequest: {
      bootcampId: 1,
      maximumCapacity: 20,
      startDate: '01-01-2024',
      endDate: '01-01-2025'
    },

    bootcamp: {
      id: 1,
      name: 'Bootcamp 1',
      description: 'blabla',
      capacityList: []
    },

    bootcamps: [
      {
        id: 1,
        name: 'Bootcamp 1',
        description: 'blabla',
        capacities: []
      },
      {
        id: 2,
        name: 'Bootcamp 2',
        description: 'blabla',
        capacities: []
      }
    ],

    bootcampRequest: {
      name: 'Bootcamp 1',
      description: 'blabla',
      capacityList: []
    }
  };
  