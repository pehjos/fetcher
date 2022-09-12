const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const url = 'http://tenders.ppa.gov.gh/'
const url3 = 'https://deliverytracker.gov.gh/projects'
const url1 = 'http://tenders.ppa.gov.gh/contracts'
app.get('/', function (req, res) {
    res.json('This is my webscraper')
})
// UPCOMING TENDERS
app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('.list-wrap', html).each(function () { //<-- cannot be a function expression
                const title = $(this).find('a').text()
                const agency  =$(this).find('.list-agency').text()
                const desc  =$(this).find('.list-desc').text()
                const date  =$(this).find('.list-date').text()
                const url = $(this).find('a').attr('href')
                articles.push({
                    title,
                    date,
                    url,
                    agency,
                  desc
                })
            })
            res.json(articles)
        }).catch(err => console.log(err))
     
})

// ONGOINGS TENDERS
app.get('/results1', (req, res) => {
    axios(url1)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('.list-wrap', html).each(function () { //<-- cannot be a function expression
                const title = $(this).find('a').text()
                const agency  =$(this).find('.list-agency').text()
                const desc  =$(this).find('.list-desc').text()
                const date  =$(this).find('.list-date').text()
                const url = $(this).find('a').attr('href')
                articles.push({
                    title,
                    date,
                    url,
                    agency,
                  desc
                })
            })
            res.json(articles)
        }).catch(err => console.log(err))
     
})

app.get('/results3', (req, res) => {
    axios(url3)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('.clearfix::before', html).each(function () { //<-- cannot be a function expression
                const title = $(this).find('i').text()
                const agency  =$(this).find('h4').text()
                const desc  =$(this).find('.list-desc').text()
                const date  =$(this).find('.text-theme-color-2').text()
                const url = $(this).find('a').attr('href')
                articles.push({
                    title,
                    date,
                    url,
                    agency,
                  desc
                })
            })
            res.json(articles)
          
        }).catch(err => console.log(err))
    
})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))