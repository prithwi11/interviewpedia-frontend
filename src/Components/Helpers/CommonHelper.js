const formateDateTime = (date) => {
    var moment = require('moment-timezone')
    return moment(date).format("DD-MM-YYYY")
}

module.exports = {
    formateDateTime
}