var express = require('express');
var router = express.Router();
var { Tag, Article } = require('../models/article')

router.get('/list/:page/:pageSize', (req, res) => {
    console.log(req.params)
    const page = +req.params.page || 1
    const pageSize = +req.params.pageSize || 10
    var query = Article.find({}).sort({"time":-1});
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

router.post('/create', (req, res) => {
    const article = new Article()
    article.title = req.body.title || ""
    article.code = req.body.code || ""
    article.tag = req.body.tag || []
    article.summary = req.body.summary || ""
    article.content = req.body.content || ""
    article.imgurl = req.body.imgurl || ""
    article.state = req.body.state || true
    article.time = req.body.imgurl || new Date().getTime()


    article.save(err => {
        if (err) {
            res.send(400, err);
            return
        }
        res.json({ message: '新建文章成功！' });
        return
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
            res.send(400, { message: '暂无标签，请先添加标签' })
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
