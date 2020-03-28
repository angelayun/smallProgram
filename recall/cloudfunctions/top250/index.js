// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
const cheerio = require('cheerio')
cloud.init()

async function getDoubianTop () {
    let page = await axios.get('https://movie.douban.com/top250');
    let $ = cheerio.load(page.data)
    let ret = []
    $('.item').each((i, v) => {
        let title = $(v).find('.title').text()

        ret.push(title)
    })
    return ret
}

// 云函数入口函数
exports.main = async (event) => {
    let movies = await getDoubianTop()
    let { a, b } = event
    return {
        movies,
        sum: a + b
    }
}