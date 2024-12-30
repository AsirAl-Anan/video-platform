const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public")))



app.get('/', (req, res) => {


    fs.readdir(`./files`, (err, files) => {

        if (files.length > 0) {
            res.render('index', { files: files })
        }





    })


})
app.get('/file/:filename', (req, res) => {


    const filepath = path.join(__dirname, 'files', req.params.filename)
    console.log(__dirname)
    fs.readFile(filepath, 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        }
        res.render('show', { title: req.params.filename.split('.').join(''), details: data })
    })
})
app.post('/create', (req, res) => {
    fs.writeFile(`files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (e) => {
        if (e) {
            console.log(e)
            return res.status(500).send('Internal Server Error')
        }
        console.log('the file is created')
        res.redirect('/')

    })

})

app.get('/delete/:filename', (req, res)=>{
    console.log(path.join(__dirname, 'files/', req.params.filename))
    fs.unlink(path.join(__dirname, 'files/', req.params.filename), (e)=>{
        if(e){
            console.log(e)
            res.redirect('/')
        }
        res.redirect('/')
    })
})
app.post('/edit/:url', (req, res) => {

    const filePath = req.body.title + '.txt'
    const destination = path.join(__dirname, 'files', filePath)
    const currentDestination = path.join(__dirname, 'files', req.params.url)
    // fs.appendFile(destination, )
    // const currentTitle = fs.readdir()

    fs.readFile(currentDestination, 'utf-8', (e, details) => {
        if (e) {
            console.log(e)
        }



        if (destination === currentDestination) {
            fs.writeFile(destination, req.body.details, (e) => {
                if (e) {
                    console.log(e)
                }
                res.redirect('/')

            })
        } else if (req.body.details === details) {
            fs.rename(currentDestination, destination, (e) => {
                if (e) {
                    console.log(e)

                }

                res.redirect('/')


            })
        } else {


            fs.rename(currentDestination, destination, (e) => {
                if (e) {
                    console.log(e)
                    return res.redirect('/')
                }

                fs.writeFile(currentDestination, details, (e) => {
                    if (e) {
                        console.log(e)

                    } 
                    fs.unlink(currentDestination,(e)=>{
                        res.redirect('/')
                    })
                    
                })
            })
           
        }
    })



})
app.listen(3000, function () {
    console.log('the server is running')
})