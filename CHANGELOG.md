# v1.1.2 (2021-12-07)

### Internal Changes

**1.**

**1.1** Changed the name of the file `Http_Utils.js` to `HttpUtils.js` programming practices.

Added by: [Carlos Bello (Retr02332)](https://github.com/Retr02332)

**Additions:**

* https://github.com/Retr02332/HackerBot/blob/master/Utils/HttpUtils.js

### Bug Fixes

**2.**

**2.1** The optional chaining operator is implemented. This is to control the inconsistency of Hackerone API responses and thus avoid errors that may disrupt the user experience.

Solved by:  [Carlos Bello (Retr02332)](https://github.com/Retr02332)

**Changes:**
* https://github.com/Retr02332/HackerBot/blob/master/HackerBot.js
* https://github.com/Retr02332/HackerBot/blob/master/Utils/StringUtils.js
* https://github.com/Retr02332/HackerBot/blob/master/Parsers/parsers.js

**2.2** Content length controllers were implemented in all missing parsers. This was done because Telegram does not support messages that are too long. Therefore, what the controller does is to split the message and send it in several messages.

Solved by:  [Carlos Bello (Retr02332)](https://github.com/Retr02332)

**Changes:**
* https://github.com/Retr02332/HackerBot/blob/master/Parsers/parsers.js

**2.3** Fixed the problem of displaying messages returned by some parsers. Some parsers were sending data in a way that was unpleasant and difficult to read for the user. In this new version of Hackerbot this problem no longer exists.

Solved by:  [Carlos Bello (Retr02332)](https://github.com/Retr02332)

**Changes:**
* https://github.com/Retr02332/HackerBot/blob/master/Parsers/parsers.js

### New Features

There were no new features.
