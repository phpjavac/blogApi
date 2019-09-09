var express = require('express');
var router = express.Router();
var env = require('../../utils/envalid');
const request = require('request')
var WorkingHours = require('../../models/tool')
var workinghours = new WorkingHours();

const {
    JIRA_URL,
    JIRA_NAME,
    JIRA_PASSWORD
} = env;
router.get("/getworkingHours", (req, res) => {
    WorkingHours.find({}, (error, body) => {
        if (error) {
            res.send({
                err: error
            })
        }
        res.send({
            data: body[0]
        })
    })
})
router.post("/synchronizationWorkingHours", (req, res) => {
    const dateArr = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const existenceData = {}
    dateArr.forEach(item => {
        workinghours[item] = req.body[item]
        existenceData[item] = req.body[item]
    })
    if (!req.body.id) {
        workinghours.save(function (err) {
            if (err) {
                res.send(err);
            };
            res.json({
                code:0,
                message: '同步成功'
            });
        })
    } else {
        WorkingHours.findOneAndUpdate({
            _id: req.body.id
        }, existenceData, (err, body) => {
            res.send({code:1,
                message: '同步成功'
            })
        })
    }

    // workinghours.January = req.body.January
    // workinghours.February = req.body.February
    // workinghours.March = req.body.March
    // workinghours.April = req.body.April
    // workinghours.May = req.body.May
    // workinghours.June = req.body.June
    // workinghours.July = req.body.July
    // workinghours.August = req.body.August
    // workinghours.September = req.body.September
    // workinghours.October = req.body.October
    // workinghours.November = req.body.November
    // workinghours.December = req.body.December
})
router.get('/workingday', (req, res) => {
    const code = req.query.code || "sunfucong"
    const Startdate = req.query.Startdate || "2019-01-01"
    const enddate = req.query.enddate || "2019-12-31"
    const state = req.query.state || "Resolved, Closed"
    const url = `${JIRA_URL}/login.jsp`
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
    }
    const url1 = `${JIRA_URL}/rest/api/2/search?jql=status+in+(+${state}+)+AND+%E9%A6%96%E6%AC%A1%E8%A7%A3%E5%86%B3%E6%97%B6%E9%97%B4+%3E%3D++${Startdate}++AND+%E9%A6%96%E6%AC%A1%E8%A7%A3%E5%86%B3%E6%97%B6%E9%97%B4+%3C%3D++${enddate}++AND+%E5%BC%80%E5%8F%91%E8%80%85+in+(+${code}+)&maxResults=5000`
    const data = {
        url,
        headers
    }
    request(data, async (err, response, body) => {
        headers.cookie = await response.headers['set-cookie']
        const data1 = {
            url: `${JIRA_URL}/login.jsp?os_username=${JIRA_NAME}&os_password=${JIRA_PASSWORD}&os_cookie=true&os_destination=&user_role=&atl_token=&login=%E7%99%BB%E5%BD%95`,
            method: "POST",
            headers
        }
        request.post(data1, async (err, response1, body) => {
            // res.send(item.headers['set-cookie'])
            headers.cookie = await response1.headers['set-cookie']
            const data2 = {
                url: url1,
                headers
            }
            request(data2, (err, response2, body2) => {
                const Month = ["2019-01", "2019-02", "2019-03", "2019-04", "2019-05", "2019-06", "2019-07", "2019-08", "2019-09", "2019-10", "2019-11", "2019-12"]
                const dateArr = {
                    "January": [],
                    "February": [],
                    "March": [],
                    "April": [],
                    "May": [],
                    "June": [],
                    "July": [],
                    "August": [],
                    "September": [],
                    "October": [],
                    "November": [],
                    "December": []
                };
                console.log(Object.keys(body2))
                res.send(body2)
                return
                let index = 0;
                for (const iterator of Object.keys(dateArr)) {
                    dateArr[iterator] = body2.issues.filter(value => {
                        return value.fields.customfield_10300.indexOf(Month[index])
                    })
                    index += 1
                }
                res.send(dateArr)
            })
        })
    })
    // res.send('workingday')
})
module.exports = router;