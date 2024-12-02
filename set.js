const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEcyYWNtWnNGeG1QbmhVZXhGSXBUTC9CVUdjaDkwQkdDQVlxRjhrdExWYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSzNGczU2MndoUXI2NWJnSnlDam82cXp3TUUyakIvajc5WFROMWQ3ZlJ6ND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SjBnc0lFRkdhME9iQW5pZDNGaUk3ZnkvSEVUZzNoVUpLeFlFZEpCWVdFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIemNnOGtCbnBPdGxpZzBkS0puc3hZcUlyR2JyekFNVm82U3JWZExSUFNNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9DbnNPajNEM2sxdEplVXVmdXE2eFdpQ0d0STFSOVRjTkFDWitJK0o0WDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imw2MGtPR2V1SjMwSmpBejMxSHZMTVN5NzdFd1FqZFpwTjRvUVBad1R5WFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUVlamRJZFF4QnhPSktlN0JrUXlzL0ZCZEJvd1F5dzMxNmU3ZmNTT0ZFUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWU9meHE5Z21KNURWVlAvejdtNnBLZFBwMHJsNVg5cGhya2J0dmk3cmxVND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkQwdis0UFJOcEZXMXRVS3BwMDdRZVgzbzI2TTh2RUNDZkJKS0owYStKZkJhbXFyeUFTUE05UXFWQjYxVGY0ZWNVTlNocTRhZ0RjMnpJUEtKRzltYWhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMsImFkdlNlY3JldEtleSI6Ijk4dXBGY3gwOE5EdmZqQVlQLzJHSTEzdDJTVzFLdmFzSUM1bG5UemhvNVE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InM4LVZfU1VyUUQ2M3ZULUh1RjVtN1EiLCJwaG9uZUlkIjoiZTgxMThjMzQtMzlhMi00MTEyLTllMWYtZGQ3NTAxYzYyZjEzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjN0QnhqQlBQbXhBUlArcWlVWFhDdFFjRnVGcz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZRjhKTkEybk9NZ3E2b3RRNUx3bFN1bmxjclE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNDk5VkhYOUgiLCJtZSI6eyJpZCI6IjI0MjA2ODE3MDk0NDo0MkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJvayJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS2FCK3IwSEVQMkZ1TG9HR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZmpZUHFzUjdTQWV3TEZEbHhkM0RVb0RJc0E0WXcwWmhZQ2g4a1R3dndDND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUGVpcUFaOWJMaER6aXpyekhENUdnL3N4S3VkKzQrTFBoUWVxbVkxNEgza0J5a1VZTUd2RkxSZ2t5b2kvUko5dVc3QXR4WFdSeTZGSkJyZFpqMi81Q0E9PSIsImRldmljZVNpZ25hdHVyZSI6IjRRSjRGMTFsQWJiNjUrQnRvc3hnS1h4SDg4YkM5dVJQU1EyL1d1dUFiK2s1czZLeFRuUTduckMxYTBVTFZIOWRUT0lFNnM0U1d5bVhLN2tVOVBpV2dBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjQyMDY4MTcwOTQ0OjQyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlg0MkQ2ckVlMGdIc0N4UTVjWGR3MUtBeUxBT0dNTkdZV0FvZkpFOEw4QXUifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzMxNjU4MzMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUDc2In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 242068170944",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
