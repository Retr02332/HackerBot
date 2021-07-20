# v1.1.1 (2021-07-20)

### Internal Changes

**1.**

**1.1** Changed the name of the variable `tokens` to `h1_tokens` to make it easier to read and understand.

### Bug Fixes

**2.**

**2.1** Checked that the **severity** attribute in `report.relationships.severity` exists before being used. This was causing any user using the `/reports all` command to receive an error instead of the corresponding data.

Solved by:  [Carlos Bello (Retr02332)](https://github.com/Retr02332)

**Changes:**
* https://github.com/Retr02332/HackerBot/blob/master/Parsers/parsers.js#L20

**2.2** Split messages into parts when they are very long. Failure to do so caused data not to reach the user. Since the Telegram API only allows certain lengths in the message.

Solved by:  [Carlos Bello (Retr02332)](https://github.com/Retr02332)

**Changes:**
* https://github.com/Retr02332/HackerBot/blob/master/Parsers/parsers.js#L27
* https://github.com/Retr02332/HackerBot/blob/master/HackerBot.js#L54-L58
* https://github.com/Retr02332/HackerBot/blob/master/HackerBot.js#L125-L129 

**2.3** All alphabetic user input is normalized to lowercase. Failure to do so caused an error, as the hackerone API expects to receive such lowercase entries in order to operate correctly.
* https://github.com/Retr02332/HackerBot/blob/master/HackerBot.js#L44
* https://github.com/Retr02332/HackerBot/blob/master/HackerBot.js#L116
* https://github.com/Retr02332/HackerBot/blob/master/HackerBot.js#L150

### New Features

There were no new features.
