function capitalizeFirstLetter(companyName) {
    return companyName.charAt(0).toUpperCase() + companyName.slice(1);
}

const cutString = (title) => {
    return (title?.length > 47)? title.substr(0,47)+"..." : title
}

exports.cutString = cutString
exports.capitalizeFirstLetter = capitalizeFirstLetter