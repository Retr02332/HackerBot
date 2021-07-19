const strUtils = require('../Utils/StringUtils.js');

const parseReports = ({data}) => {
    let cleanReports = "";
    let reports = data;
    let count = 1

    if( !(reports instanceof Array) ) { reports = [reports] }

    for(let report of reports) {
        template = `\
Report #${count}

            ID: ${report.id}
            URL: https://hackerone.com/reports/${report.id}
            Title: ${strUtils.cutString(report.attributes.title)}
            State: ${report.attributes.state}
            Score: ${report.relationships.severity.data.attributes.rating} (${report.relationships.severity.data.attributes.score || ''})
            Reported by: ${report.relationships.reporter.data.attributes.name} (${report.relationships.reporter.data.attributes.username})
            Reported to: ${strUtils.capitalizeFirstLetter(report.relationships.program.data.attributes.handle)}
            Vulnerability: ${report.relationships.weakness.data.attributes.name}
            Created_at: ${report.attributes.created_at}\n\n`
        cleanReports += template;
        count++;
    }
    return cleanReports;
}

const parseBalance = ({balance}) => {
    return template = "`Balance:` " + (balance || 0)
}

const parseEarnings = (earnings) => {
    let cleanEarns= "";
    let count = 1

    if(earnings.data.length !== 0) {
        for(let earn of earnings.data) {
            template = `\
Earn #${count}
    
                Program: ${earn.relationships.program.data.attributes.name}
                Report:  ${strUtils.cutString(earn.relationships.bounty.relationships.report.data.attributes.title)} (${earn.relationships.bounty.relationships.report.data.attributes.state || ''})
                Amount:  ${earn.relationships.bounty.data.attributes.amount} ${earn.relationships.bounty.data.attributes.awarded_currency}
                Created_at: ${earn.relationships.bounty.relationships.report.data.attributes.created_at}
            `
            cleanEarns += template;
            count++;
        }
        return cleanEarns;
    }
    else {
        return "oops, still no earnings :/";
    }
}

const parsePayouts = (payouts) => {
    let cleanPayouts= "";
    let count = 1

    if(payouts.data.length !== 0) {
        for(let payout of payouts.data) {
            template = `\
Payout #${count}
    
                Program: ${payout.payout_provider}
                Status:  ${payout.status}
                Amount:  ${payout.amount}
                Paid at: ${payout.paid_out_at}
            `
            cleanPayouts += template;
            count++;
        }
        return cleanPayouts;
    }
    else {
        return "oops, still no payments :/";
    }
}

const parseWeaks = (weaks) => {
    let cleanWeaks= "";
    let count = 1

    if(weaks.data.length !== 0) {
        for(let weak of weaks.data) {
            template = `\
Weak #${count}

            ID: ${weak.id}
            Type: ${strUtils.cutString(weak.attributes.name)}\n\n`
            cleanWeaks += template;
            count++;
        }
        return cleanWeaks;
    }
    else {
        return "oops, you still haven't found any weaknesses :/";
    }
}

const parsePrograms = (programs) => {
    let cleanPrograms = "";
    let count = 1

    if(programs.data) { programs = programs.data }
    else { programs = [programs] }

    for(let program of programs) {
        template = `\
Program #${count}

        ID: ${program.id}
        Program: ${strUtils.cutString(strUtils.capitalizeFirstLetter(program.attributes.name))}
        State: ${(program.attributes.state && program.attributes.state.split("_")[0]) || null}
        Currency: ${(program.attributes.currency && program.attributes.currency.toUpperCase()) || null}
        Offer Bounty: ${program.attributes.offers_bounties || null}
        Bounty Splitting: ${program.attributes.allows_bounty_splitting}\n\n`
        cleanPrograms += template;
        count++;
    }
    return cleanPrograms;
}

module.exports = { parseReports, parseBalance, parseEarnings, 
                   parsePayouts, parseWeaks,   parsePrograms, };