const { cleanEnv, str } = require('envalid');

/** A sanitized, immutable environment object */
const validateEnv = () =>
    cleanEnv(process.env, {
        DB_URI: str(),
        DB_NAME: str(),
        HOST: str(),
        PORT: str(),
        JIRA_URL: str(),
        JIRA_NAME: str(),
        JIRA_PASSWORD: str()
    });

module.exports = validateEnv();
