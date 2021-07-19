const DOMAIN_HACKERONE = "https://api.hackerone.com/v1";

let endpoints = {
    "reports": {
        "all":`${DOMAIN_HACKERONE}/hackers/me/reports`,
        "unique":`${DOMAIN_HACKERONE}/hackers/reports/ID`
    },
    "balance": {
        "current":`${DOMAIN_HACKERONE}/hackers/payments/balance`
    },
    "earnings" : {
        "all":`${DOMAIN_HACKERONE}/hackers/payments/earnings`
    },
    "payouts" : {
        "all": `${DOMAIN_HACKERONE}/hackers/payments/payouts`
    },
    "programs": {
        "weaknesses_unique":`${DOMAIN_HACKERONE}/hackers/programs/HANDLE/weaknesses`,
        "all":`${DOMAIN_HACKERONE}/hackers/programs`,
        "unique":`${DOMAIN_HACKERONE}/hackers/programs/HANDLE`
    }
};

exports.endpoints = endpoints;