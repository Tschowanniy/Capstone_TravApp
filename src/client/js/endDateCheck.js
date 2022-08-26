// checkers onto the date inputs. start date needs to be > than today. End date needs to be > start date
import{compareDate} from './compare'

document.getElementById("end").addEventListener('input', endDateCheck);


function endDateCheck(event) {
    event.preventDefault()
    const startDate = document.getElementById("start").value;
    const endDate = document.getElementById("end").value;
    if (compareDate(startDate, endDate) )
    {
        alert('dafuq? end before start? not possible...');
         document.getElementById("end").value = '';
    }
    return 1;
}

export { endDateCheck }