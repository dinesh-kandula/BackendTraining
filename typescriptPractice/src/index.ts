type Airplane = {
    flightnumber: string;
    airplaneModel: string;
    dateOfDeparture: string;
    timeOfDepature: string;
    from: string;
    to: string;
    seats : {
        [key: string] : string;
    }
}

const airPlane: Airplane ={
    flightnumber : '5Q34P',
    airplaneModel: 'A369',
    dateOfDeparture: '01/12/2022',
    timeOfDepature: '23:11',
    from: 'UAE',
    to: 'India',
    seats : {
        'A1': "DINESH KUMAR",
        'A2' : 'DINNUBUNNY',
    }
}

type Airplanes = Airplane[];

const airPlanes: Airplanes =[
    {
        flightnumber : '5Q34P',
        airplaneModel: 'A369',
        dateOfDeparture: '01/12/2022',
        timeOfDepature: '23:11',
        from: 'UAE',
        to: 'India',
        seats : {
            'A1': "DINESH KUMAR",
            'A2' : 'DINNUBUNNY',
        }
    },
    {
        flightnumber : 'ER345',
        airplaneModel: 'A934',
        dateOfDeparture: '22/12/2022',
        timeOfDepature: '22:26',
        from: '',
        to: 'India',
        seats : {
            'A1': "Rohit KUMAR",
            'A2' : 'BUNNY',
        }
    },
]

let a: number[] = [1,2,3,4,5] //number[]
let a1: Array<number> = [9,8,7] 
let b : string[] = ['a', 'b', 'e'] //string[]
let c : (string | number)[] = [1, 2, 4,'ab','c'] // (string | number)[]


//Array with fixed length and types
let person : [string, string, number]; // firstname, lastname, age
person = ["John", "Wick", 26];

// Optional Paramerers in Tuple
let women: [string, string, number?] = ["Ariana", "Cat Valentine"];


// [ NumberOfStudents : Number, passing: boolean, 'Jhon', 'Deo']

type listOfStudents = [number, boolean, ...string[]];
const passingStudents: listOfStudents = [3, true, 'Jhon', 'Deo', 'Setlla'];
const failingStudents: listOfStudents = [1, false, 'Bunny'];


// Read Only Array Immutable arrays
let number : readonly number[] = [1,2,3,2,5,6];

type readOnlyPerson = readonly [string, string, number];

const person1 : readOnlyPerson = ['John', 'Wick', 26];

type a = Readonly<string[]>;

type b = Readonly<[string, string, boolean, number]>;


type MyObject = {
    name: string;
    age: number;
    city: string;
  };
  
  type MyArray = MyObject[];
  
  const myArray: MyArray = [
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "San Francisco" },
    // Add more objects as needed
  ];

  enum Roles {
    admin = "admin",
    author = "author",
    editor = "editor"
  }
type Person = {
    name: string;
    email: string;
    password: string;
    role : Roles;
}

const employee : Person = {
    name : 'John',
    email: 'johnwick007@gmail.com',
    password: 'xyz123',
    role: Roles.admin
}


// Assignment

type Book = {
    title : string;
    pages: number;
    isbn: string;
}

type Books = Book[];

enum Type {
    NATIONAL = 'national',
    ACADEMIC= 'academic',
    PUBLIC='public',
}

type Member = {
    name : string,
    phone : string,
    [key : string] : string
}

type Members = Member[];

type Library = {
    name : string;
    address: string;
    numberOfBooks: number;
    type : Type;
    books: Books,
    genres: string[],
    members: Members
}

const library : Library = {
    name : 'Dinesh Kumar',
    address:'24 Some Street, New York',
    numberOfBooks: 25,
    type: Type.NATIONAL,
    books: [
        {
            title: 'Harry Potter',
            pages: 789,
            isbn: '993-244-24',
        },
        {
            title: 'Harry Potter',
            pages: 789,
            isbn: '993-244-24',
        }
    ],
    genres: ["fuction", "sci-fi", "fantasy", "crime", "horror"],
    members: [
        {
            name : "John Wick",
            phone: '+91 9974345678'
        },
        {
            name : "Mark Zukar",
            phone: "unknown",
            email: 'zukar@facebook.com'
        }
    ]
};

console.log(library);