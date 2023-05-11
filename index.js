const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { title } = require('process');
const app = express();
const port = 3000;

app.use(bodyParser.json());



app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/index.html');
});

let books = [];

app.get('/books',(req,res)=>{
    res.json(books);
});

app.post('/books',(req,res)=>{
    const {title,author,publishedDate} = req.body;

    const id = Date.now().toString();

    books.push({id,title,author,publishedDate});
    res.json({id,title,author,publishedDate});
});


app.delete('/books/:id',(req,res)=>{
    const {id} = req.params;
    const bookIndex = books.findIndex((book)=>book.id ===id);

    if(bookIndex >= 0){
        books.splice(bookIndex,1);
        res.json(`book is delete with id ${id}`);
    }else{
        res.status(404);
        res.json(`book id ${id} not found`);
    }

});

app.listen(port,()=>{
    console.log(`Server run successfully at ${port} port`);
});