// Import the js file to test
import{compareDate} from '../src/client/js/compare'
//import { endDateCheck } from "../src/client/js/function"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing the compareDate functionality, End date should be after starting date of the trip", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.
    test("Testing the compareDate() function", () => {
        const start = '2022-06-05';
        const end = '2022-06-04';
           // Define the input for the function, if any, in the form of variables/array
           // Define the expected output, if any, in the form of variables/array
        
           // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
           // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
           expect(compareDate(start, end)).toEqual(1);
})});


let geocity= [];
const geoNameApiURL = 'http://api.geonames.org/searchJSON?q=Munich&maxRows=1&username=tschowanniy';
app.post('/geoapi', async (req, res) => {
    geocity = req.body.latLong;
    const geoNameApiURL = 'http://api.geonames.org/searchJSON?q=Munich&maxRows=1&username=tschowanniy';//geoNamesBaseUrl + geocity + geoNamesUrlAdd + process.env.API_KEY_GEONAMES;
    console.log(geoNameApiURL);
    const fetchedFromAPI = await fetch(geoNameApiURL)
    .then((response) => response.json())
    .then((data) => {
        console.log(data),
        res.send(data)
    })
    }    
)