var express = require('express');
var router = express.Router();
var env = require('./utils/envalid');
const request = require('request')
const { JIRA_URL, JIRA_NAME, JIRA_PASSWORD } = env;

router.get('/workingday', (req, res) => {
    console.log(req.query)
    const code = req.query.code
    const Startdate = req.query.Startdate
    const enddate = req.query.enddate
    const state = req.query.state
    const url = `${JIRA_URL}/login.jsp`
    const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36', 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' }
    const url1 = `${JIRA_URL}/rest/api/2/search?jql=status+in+(+${state}+)+AND+%E9%A6%96%E6%AC%A1%E8%A7%A3%E5%86%B3%E6%97%B6%E9%97%B4+%3E%3D++${Startdate}++AND+%E9%A6%96%E6%AC%A1%E8%A7%A3%E5%86%B3%E6%97%B6%E9%97%B4+%3C%3D++${enddate}++AND+%E5%BC%80%E5%8F%91%E8%80%85+in+(+${code}+)&maxResults=500`
    const data = {
        url,
        headers
    }
    request(data, (err, response, body) => {
        headers.cookie = response.headers['set-cookie']
        const data1 = {
            url: `${JIRA_URL}/login.jsp?os_username=${JIRA_NAME}&os_password=${JIRA_PASSWORD}&os_cookie=true&os_destination=&user_role=&atl_token=&login=%E7%99%BB%E5%BD%95`,
            method: "POST",
            headers
        }
        request.post(data1, (err, response1, body) => {
            // res.send(item.headers['set-cookie'])
            headers.cookie = response1.headers['set-cookie']
            const data2 = {
                url: url1,
                headers
            }
            request(data2, (err, response2, body2) => {
                res.send(body2)
            })
        })
    })
    // res.send('workingday')
})
module.exports = router;
