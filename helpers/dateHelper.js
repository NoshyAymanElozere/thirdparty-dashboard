

export function convertDateTime(timestamp)
{
    var datetime = new Date(timestamp);
    var year = datetime.getFullYear();
    var month = ('0' + (datetime.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns zero-based month index
    var day = ('0' + datetime.getDate()).slice(-2);
    var hours = ('0' + datetime.getHours()).slice(-2);
    var minutes = ('0' + datetime.getMinutes()).slice(-2);

    // Form the desired format "Y-m-d H:i"
    var formattedDatetime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;

    // Output the formatted datetime
    return formattedDatetime;
}