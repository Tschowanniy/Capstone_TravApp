
function compareDate(startDate, endDate) {
    if (new Date(endDate) < new Date(startDate)) 
    {
        
        return 1;
    }
    return 0;
}

export{compareDate}