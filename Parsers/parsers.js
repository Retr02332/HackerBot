const strUtils = require('../Utils/StringUtils.js');

const parseReports = ({data}) => {
    let permissionsToSplit = true;
    let parsedReports = "";
    let reports = data;
    let count = 0

    if( !(reports instanceof Array) ) { reports = [reports] }
    if(reports?.length === 10) { permissionsToSplit = false; }

    for(let report of reports) {
        template = `\
Report #${count+1}

            ID: ${report?.id}
            URL: https://hackerone.com/reports/${report?.id}
            Title: ${strUtils.cutString(report?.attributes?.title)}
            State: ${report?.attributes?.state}
            Score: ${(report?.relationships?.severity?.data?.attributes?.rating)} (${report?.relationships?.severity?.data?.attributes?.score || ""})
            Reported by: ${report?.relationships?.reporter?.data?.attributes?.name} (${report?.relationships?.reporter?.data?.attributes?.username})
            Reported to: ${strUtils.capitalizeFirstLetter(report?.relationships?.program?.data?.attributes?.handle)}
            Vulnerability: ${report?.relationships?.weakness?.data?.attributes?.name}
            Created_at: ${report?.attributes?.created_at}\n\n`
        parsedReports += template;
        count++;
        if( (permissionsToSplit) && ((count !== 0) && (count % 10) == 0) ) { parsedReports += "SPLIT_HERE\n\n" }
    }
    return parsedReports
}

const parseBalance = ({balance}) => {
    return template = "`Balance:` " + (balance || 0)
}

const parseEarnings = (earnings) => {
    let permissionsToSplit = true;
    var earnings = earnings?.data;
    let parsedEarns= "";
    let count = 1
    
    if(earnings?.length !== 0) {
        for(let earn of earnings) {
            template = `\
Earn #${count}
    
            Program: ${earn?.relationships?.program?.data?.attributes?.name}
            Report:  ${strUtils.cutString(earn?.relationships?.bounty?.data?.relationships?.report?.data?.attributes?.title) || strUtils.cutString(earn?.relationships?.report_retest_user?.data?.relationships?.report_retest?.data?.relationships?.report?.data?.attributes?.title)}
            State:  (${earn?.relationships?.bounty?.data?.relationships?.report?.data?.attributes?.state || earn?.relationships?.report_retest_user?.data?.relationships?.report_retest?.data?.relationships?.report?.data?.attributes?.state})
            Amount:  ${earn?.relationships?.bounty?.data?.attributes?.amount || earn?.attributes.amount} USD
            Created_at: ${earn?.relationships?.bounty?.data?.relationships?.report?.data?.attributes?.created_at || earn?.attributes.created_at }\n\n`
            parsedEarns += template;
            count++;
            if( (permissionsToSplit) && ((count !== 0) && (count % 10) == 0) ) { parsedEarns += "SPLIT_HERE\n\n" }
        }
        return parsedEarns;
    }
    else {
        return "oops, still no earnings :/";
    }
}

const parsePayouts = (payouts) => {
    let permissionsToSplit = true;
    var payouts = payouts?.data;
    let parsedPayouts = "";
    let count = 1

    if( !(payouts instanceof Array) ) { payouts = [payouts] }
    if(payouts?.length === 10) { permissionsToSplit = false; }

    if(payouts?.length !== 0) {
        for(let payout of payouts) {
            template = `\
Payout #${count}
    
            Program: ${payout?.payout_provider}
            Status:  ${payout?.status}
            Amount:  ${payout?.amount}
            Paid at: ${payout?.paid_out_at}\n\n`
            parsedPayouts += template;
            count++;
            if( (permissionsToSplit) && ((count !== 0) && (count % 10) == 0) ) { parsedPayouts += "SPLIT_HERE\n\n" }
        }
        return parsedPayouts;
    }
    else {
        return "oops, still no payments :/";
    }
}

const parseWeaks = ({data}) => {
    let permissionsToSplit = true;
    let parsedWeaks= "";
    let weaks = data;
    let count = 0

    if(weaks?.length !== 0) {
        if(weaks?.length === 54) { permissionsToSplit = false; }
        for(let weak of weaks) {
            template = `\
Weak #${count+1}

            ID: ${weak?.id}
            Type: ${strUtils.cutString(weak?.attributes?.name)}\n\n`
            parsedWeaks += template;
            count++;
            if( (permissionsToSplit) && ((count !== 0) && (count % 54) == 0) ) { parsedWeaks += "SPLIT_HERE\n\n" }
        }
        return parsedWeaks;
    }
    else {
        return "oops, you still haven't found any weaknesses :/";
    }
}

const parsePrograms = (programs) => {
    let permissionsToSplit = true;
    let parsedPrograms = "";
    let count = 0

    if(programs?.data) { programs = programs?.data }
    else { programs = [programs] }

    if(programs?.length === 22) { permissionsToSplit = false; }

    for(let program of programs) {
        template = `\
Program #${count+1}

            ID: ${program?.id}
            Program: ${strUtils.cutString(strUtils.capitalizeFirstLetter(program?.attributes?.name))}
            State: ${program?.attributes?.state?.split("_")[0]}
            Currency: USD
            Offer Bounty: ${program?.attributes?.offers_bounties}
            Bounty Splitting: ${program?.attributes?.allows_bounty_splitting}\n\n`
            parsedPrograms += template;
        count++;
        if( (permissionsToSplit) && ((count !== 0) && (count % 22) == 0) ) { parsedPrograms += "SPLIT_HERE\n\n" }
    }
    return parsedPrograms;
}

module.exports = { parseReports, parseBalance, parseEarnings, 
                   parsePayouts, parseWeaks,   parsePrograms, };