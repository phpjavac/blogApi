var express = require('express');
var router = express.Router();
var { Tag } = require('../models/article')
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
                    list:data
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
