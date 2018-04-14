/**
 * Created by Cral-Gates on 2018/4/1.
 */

var Poem = require("../db/poem");
/**
 * 插入朝代
 */
function insertDynasty(obj) {
    var data = new Poem({
        dynasty: obj.dynasty
    });

    data.save(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        } else {
            console.log("Res:" + res);
        }
    });
}

/**
 * 插入诗歌形式
 */
function insertPoemForm(obj) {
    var form = new Poem({
        type: obj.type
    });

    form.save(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        } else {
            console.log("Res:" + res);
        }
    });
}

/**
 * 插入诗歌类型
 */
function insertPoemType(obj) {
    var form = new Poem({
        type: obj.type
    });

    form.save(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        } else {
            console.log("Res:" + res);
        }
    });
}

/**
 * 插入诗人
 */
function insertAuthor(obj) {
    var form = new Poem({
        img: obj.img,
        name: obj.name,
        desc: obj.desc,
        star: obj.star
    });
    form.save(function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log('insert Author success');
        }
    });
}

/**
 * 查找
 * */
function findAuthorName(obj, callback) {
    var updateStr = {'name': obj.name};
    Poem.find(updateStr, function (err, res) {
        if (err) {
            console.log('find Author failure');
            callback(err);
        } else {
            console.log('find Author success');
            callback(res)
        }
    });
}

/*
 * 更新作者
 * */
function updateAuthor(obj) {
    var whereStr = {'name': obj.name};
    Poem.update(whereStr, obj, function (err, res) {
        if (err) {
            console.log("Error:" + err);
        } else {
            console.log("update Author success");
        }
    });
}

module.exports = {
    insertDynasty: insertDynasty,
    insertPoemForm: insertPoemForm,
    insertPoemType: insertPoemType,
    insertAuthor: insertAuthor,
    findAuthorName: findAuthorName,
    updateAuthor: updateAuthor
};