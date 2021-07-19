let start="\
Welcome `USERNAME` with this bot you can easily consult any data\
 or statistics of your hackerone profile that you need in an easy\
 and fast way.\
 To know what you can do with this bot use\n\
the /help command."

let help="\
`/start`\
\nUse this command to start the bot and to have a welcome.\n\n\
`/help`\
\nUse this command to obtain details on the use of the following commands.\n\n\
`/config [hackerone_username] [hackerone_api_token]`\
\nYou must use this command before making any other API calls. This is because this\
 command is responsible for saving *'your session'* so that you can make calls to\
 endpoints that require the user to authenticate.\n\n\
`/reports [all] [unique Report_ID]`\
\nUse this command to get all your reports or a specific one.\n\n\
`/balance`\
\nUse this command to get your current balance.\n\n\
`/earnings`\
\nUse this command to get all your earnings.\n\n\
`/payouts`\
\nUse this command to get all your payouts.\n\n\
`/programs [weak_unique programName] [all] [unique programName]`\
\nUse this command to get all hackerone programs, to get a specific program, or to get all\
 disclosed weaknesses found in a specific program.\n\n"

let error="This can occur for the following reasons:\n\n\
\
1. If the name or token has been misconfigured. To reconfigure use the /config command.\n\n\
\
2. If you have provided an invalid or non-existent program name or report ID."

module.exports = { start, help, error }