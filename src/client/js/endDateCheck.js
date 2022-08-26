// checkers onto the date inputs. start date needs to be > than today. End date needs to be > start date
document.getElementById("end").addEventListener('input', endDateCheck);

function endDateCheck(event) {
    event.preventDefault()
    const startDate = document.getElementById("start").value;
    const endDate = document.getElementById("end").value;
    if (new Date(endDate) < new Date(startDate)) {
        alert('really? End date before start date?')
        document.getElementById("end").value = '';
        
    }
    return 1;
}