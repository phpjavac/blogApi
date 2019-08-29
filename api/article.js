var express = require('express');
var router = express.Router();
var { Tag, Article } = require('../models/article')


router.get('/list/tag', (req, res) => {
    const tag = req.query.tag
    console.log(req)
    Article.find({ tag: tag }, (err, re) => {
        if (err) {
            res.send(err);
            return
        }
        res.json({ data: { list: re } });
    }).sort({ "time": -1 });
})

router.get('/list', (req, res) => {
    const page = +req.query.page || 1
    const pageSize = +req.query.pageSize || 10
    var query = Article.find({}).sort({ "time": -1 });
    query.skip((page - 1) * pageSize);
    query.limit(pageSize);
    //计算分页数据
    query.exec(function (err, rs) {
        if (err) {
            res.send(err);
        } else {
            //计算数据总数
            Article.find(function (err, result) {
                jsonArray = { data: { list: rs }, page: page, pageSize: pageSize, total: result.length };
                res.json(jsonArray);
            });

        }
    });
    // Article.find({}, (error, body) => {
    //     const data = {
    //         code: 0,
    //         data: {
    //             list:body
    //         },
    //         message: ""
    //     }
    //     res.send(data);
    // })
})
router.delete('/', (req, res) => {
    Article.remove({ _id: req.query.id }, (error, success) => {
        if (success.deletedCount === 1) {
            Article.find({}, (err, data) => {
                res.send({
                    message: '删除成功',
                    list: data
                })
            })
        } else {
            res.send(400, {
                message: '删除失败，请稍后重试'
            })
        }
    })
})
router.post('/create', (req, res) => {
    const article = new Article()
    article.title = req.body.title || ""
    article.code = req.body.code || ""
    article.tag = req.body.tag || []
    article.summary = req.body.summary || ""
    article.content = req.body.content || ""
    article.imgurl = req.body.imgurl || ""
    article.state = req.body.state || true
    article.time = req.body.time || new Date().getTime()
    if (req.body._id) {
        // article._id = req.body._id
        const data = {
            title: req.body.title || "",
            code: req.body.code || "",
            tag: req.body.tag || [],
            summary: req.body.summary || "",
            content: req.body.content || "",
            imgurl: req.body.imgurl || "",
            state: req.body.state || true,
            time: req.body.time || new Date().getTime()
        }

        Article.findOneAndUpdate({ _id: req.body._id }, data, (err, body) => {
            res.send({ message: '编辑文章成功' })
        })
        return
    }

    article.save(err => {
        if (err) {
            return res.send(400, err);
        }
        return res.json({ message: '新建文章成功！' });
    })
})



router.get('/', (req, res) => {
    Article.findOne({ _id: req.query.id }, (error, body) => {
        if (error) {
            res.send({
                err: error
            })
        }
        res.send({
            data: body
        })
    })
})

router.post('/addtag', (req, res) => {
    var tag = new Tag();
    const tagName = req.body.tagName || ""
    Tag.find({ name: tagName }, (err, doc) => {
        if (doc.length > 0) {
            res.send(400, { message: '该标签已存在' })
        } else {
            tag.name = tagName
            tag.save(function (err) {
                if (err) {
                    res.send(400, err);
                };
                Tag.find({}, (err, data) => {
                    res.json({ message: '添加标签成功', list: data });
                })
            })
        }
    })
})
router.get('/taglist', (req, res) => {
    Tag.find({}, (err, list) => {
        if (list.length === 0) {
            res.send({ list: [] })
        } else {
            res.json({ list: list });
        }
    })
})
router.delete('/deletetag/:id', (req, res) => {
    Tag.remove({ _id: req.params.id }, (error, success) => {
        if (success.deletedCount === 1) {
            Tag.find({}, (err, data) => {
                res.send({
                    message: '删除成功',
                    list: data
                })
            })

        } else {
            res.send(400, {
                message: '删除失败，请稍后重试'
            })
        }
    })
})
module.exports = router;
