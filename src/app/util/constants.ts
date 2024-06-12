export const constants = {

    nameRequired: "Se requiere el nombre",

    descriptionRequired: "Se requiere la descripción",

    technologiesRequired: "Se requiere la tecnología",

    nameMaxLength: "El nombre solo puede tener maximo 50 caracteres",

    descriptionMaxLength: "La descripción solo puede tener maximo 90 caracteres",

    lastNameRequired: "Se requiere el apellido",

    dniRequired: "Se requiere el dni",
    
    dniMaxLength: "El dni solo puede tener maximo 12 caracteres",

    phoneNumberRequired: "Se requiere el teléfono",

    phoneNumberMaxLength: "El teléfono solo puede tener maximo 10 caracteres",

    phoneNumberInvalid: "El teléfono no es valido",

    phoneNumberPattern:  "^(300|3(?:0[1-3]|[1-2]\\d|3[0-3]))\\d{7}$",

    maximumCapacityRequired: "Se requiere la capacidad maxima",
    maximumCapacityMaxLength: "La capacidad maxima solo puede tener maximo 50 integrantes",
    maximumCapacityMinLength: "La capacidad maxima solo puede tener minimo 1 integrante",

    endDateBelowStartDate: "La fecha de fin no puede ser anterior a la fecha de inicio",

    startDateInvalid: "La fecha de inicio no puede ser antes de hoy",

    yearInvalid: "Solo se permiten crear versiones dentro de un rango de 2 años",
    startDateRequired: "Se requiere la fecha de inicio",
    endDateRequired: "Se requiere la fecha de fin",
    asc: "Asc",

    desc: "Desc",

    technologyRequired : "Se requieren tecnologías",
    technologyMaxLenght : "El maximo de tecnologías son 20",
    technologyMinLenght : "El minimo de tecnologías son 3",

    capacityRequired: "Se requieren capacidades",
    capacityMaxLenght: "El maximo de capacidades son 4",
    capacityMinLenght: "El minimo de capacidades son 1",

    emailRequired: "Se requiere el email",
    emailInvalid: "Email invalido",

    passwordRequired: "Se requiere la contraseña",
    capacityValidators: {

        min: 1,

        max: 4
    },
    
    technologyValidators: {

        min: 3,

        max: 20
    },

    maximumCapacityValidators: {  
        min: 1,
        max: 500
    },

    dataNotFound: "No data was found in the database",

    nameDescriptionError: "'Validation failed for: name (EL NOMBRE ES OBLIGATORIO), description (LA DESCRIPCION ES OBLIGATORIO)'",
    studentHome: "Usted todavia no forma parte de ningun bootcamp",

    teacherHome: "Usted todavia no esta asignado a ningun bootcamp",

    nameBlank: "El nombre no puede contener solo espacios en blanco.",

    descriptionBlank: "La descripción no puede contener solo espacios en blanco.",


    emptyTechnology: {
        name: "",
        description: ""
    },

    emptyCapacity: {
        name: "",
        description: "",
        technologyList: []
    },

    emptyBootcamp: {
        name: "",
        description: "",
        capacityList: []
    },

    emptyVersion: {
        maximumCapacity: 0,
        startDate: "",
        endDate: "",
        bootcampId: 0
    },

    emptyLogin: {
        email: "",
        password: ""
    },

    emptyUser: {
        name: "",
        lastName: "",
        dni: 0,
        phoneNumber: 0,
        email: "",
        password: ""
    }
}

