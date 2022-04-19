import mysql from 'mysql';
import express from 'express';
import bodyparser from 'body-parser';

const app = express();

const cors = require('cors');

interface queryResults {
    item: string, 
    flow:string,
}

app.use(cors()) // Use this after the variable declaration

app.use(bodyparser.json());

const mysqlConnection = mysql.createConnection(
    {
        host:'localhost',
        user:'root', 
        password: 'your_current_password',
        database:'Booomtag'
    }
);

mysqlConnection.connect((err:any)=>{
    if(!err){
        console.log('DB is connected');     
    }
    else{
        console.log(JSON.stringify(err, undefined, 2));
    }
});

app.listen(3000, () => console.log("server is running"));

app.get('/', (req:any, res:any) => {
    res.json({message: 'ok'});   
});

app.get('/gear', (req:any, res:any) => {
    mysqlConnection.query('SELECT * FROM gear', (err:any, results:any, fields:any) =>{
        if(err) throw err;
        res.send(results);
    })
});

app.get('/brand', (req:any, res:any) => {
    const type = req.query.type;
    const sport = req.query.sport;
    const baseQuery = `SELECT DISTINCT brand FROM gear WHERE 1`;
    let query = baseQuery;
    if (type !== undefined){
        query = `${query} and type = "${(type)}"`;
    }
    if (sport !== undefined){
        query = `${query} and sport = "${(sport)}"`;
    }
    console.log(type, sport);

    try {
        mysqlConnection.query(query, (err:any, results:any, fields:any) =>{
            if(err) throw err;
            let list:queryResults[] = [];
            results.forEach((item: { brand: string, flow: string; }) => list.push({item: item.brand, flow: item.flow}));
            console.log(results);
            res.send({brand:'brand', data:list, message: 'users list'})
        })       } 
        catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
});

app.get('/models', (req:any, res:any) => {
    const type = req.query.type;
    const sport = req.query.sport;
    const brand = req.query.brand;
    const baseQuery = `SELECT DISTINCT model FROM gear WHERE 1`;
    let query = baseQuery;
    if (type !== undefined){
        query = `${query} and type = "${(type)}"`;
    }
    if (sport !== undefined){
        query = `${query} and sport = "${(sport)}"`;
    }
    if (brand !== undefined){
        query = `${query} and brand = "${(brand)}"`;
    }
    console.log(type, sport);
    try {
        mysqlConnection.query(query, (err:any, results:any, fields:any) =>{
            if(err) throw err;
            let list:queryResults[] = [];
            results.forEach((item: { model: string, flow: string }) => list.push({item: item.model, flow: item.flow}));;
            console.log(results);
            res.send({model:'model', data:list, message: 'users list'})
        })       } 
        catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
});

app.get('/type', (req:any, res:any) => {
    const sport = req.query.sport;
    const brand = req.query.brand;
    const baseQuery = `SELECT DISTINCT type, flow FROM gear WHERE 1`;
    let query = baseQuery;
    if (sport !== undefined){
        query = `${query} and sport = "${(sport)}"`;
    }
    if (brand !== undefined){
        query = `${query} and brand = "${(brand)}"`;
    }
    try {
        mysqlConnection.query(query, (err:any, results:any, fields:any) =>{
            if(err) throw err;
            let list:queryResults[] = [];
            results.forEach((item: { type: string, flow:string; }) => list.push({item: item.type, flow: item.flow}));
            console.log(results);
            res.send({type:'type', data:list, message: 'users list'})
        })       } 
        catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
});

app.get('/sport', (req:any, res:any) => {
    const baseQuery = `SELECT DISTINCT sport FROM gear WHERE 1`;
    let query = baseQuery;
    try {
        mysqlConnection.query(query, (err:any, results:any, fields:any) =>{
            if(err) throw err;
            let list:queryResults[] = [];
            results.forEach((item: { sport: string, flow:string; }) => list.push({item: item.sport, flow: item.flow}));
            console.log(results);
            res.send({type:'sport', data:list, message: 'users list'})
        })       } 
        catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
});

app.get('/items', (req:any, res:any) => {
    const baseQuery = `SELECT DISTINCT itemName, primaryFlow FROM general_items WHERE 1`;
    let query = baseQuery;
    try {
        mysqlConnection.query(query, (err:any, results:any, fields:any) =>{
            if(err) throw err;
            let list:queryResults[] = [];
            results.forEach((item: { itemName: string, primaryFlow:string; }) => list.push({item: item.itemName, flow: item.primaryFlow}));
            console.log(results);
            res.send({type:'items', data:list})
        })       } 
        catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
});

app.get('/items_keys', (req:any, res:any) => {
    const baseQuery = `SELECT DISTINCT name FROM items_keys WHERE 1`;
    let query = baseQuery;
    try {
        mysqlConnection.query(query, (err:any, results:any, fields:any) =>{
            if(err) throw err;
            let list:queryResults[] = [];
            results.forEach((item: { name: string, primaryFlow:string; }) => list.push({item: item.name, flow: item.primaryFlow}));
            console.log(results);
            res.send({type:'items', data:list})
        })       } 
        catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
});











