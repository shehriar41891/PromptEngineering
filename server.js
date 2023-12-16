const express = require('express')
const mysql = require('mysql')
const app = express();

//connecting our database to our local sql server
const connection = mysql.createConnection({
    host : 'localhost',
    database : 'name_of_your_database',
    user : 'username',
    password : 'your_password'
})

app.get('/genre/:type/list', (req, res) => {
    const type = req.params.type
    const query = ``; //provide the query here 

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching TV genres:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        else{
            console.log('The response we get is ',query)
        }

        res.json(results);
    });
});

app.get('/search/multi',(req,res)=>{
    const {query,page} = req.query

    if(!query || !page){
        res.status(400).json({error : 'Bad request the queries are missing here in the search route'})
        return
    }

    const searchquery = `` // write your query here using the retrived query above
    const offset = (page - 1) * 20;

    connection.query(searchquery,[`%${query}%`, `%${query}%`,offset],(error,result)=>{
        if(error){
            console.log('There is an error here',error)
            res.status(500).json({error: 'Internel Server Error'})
            return 
        }

        res.json(result) //sending the data in the format of json to the front end
    })
})

app.get('/:mediaType/top_rated', (req, res) => {
    const { mediaType } = req.params; //extracting the value of media type from the url

    const query = ``; //write the query here for the toprated movies 

    connection.query(query, [mediaType], (error, results) => {
        if (error) {
            console.error('Error fetching top-rated data:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
});

app.get('/:mediaType/popular', (req, res) => {
    const { mediaType } = req.params;

    const query = ``; //write the query here for the popular movies 

    connection.query(query, [mediaType], (error, results) => {
        if (error) {
            console.error('Error fetching top-rated data:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
});

app.get('/trending/all/:duration', (req, res) => {
    const { duration } = req.params;

    const query = ``;

    connection.query(query, [duration], (error, results) => {
        if (error) {
            console.error('Error fetching trending data:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        res.json(results);
    });
});



app.listen(3000,()=>{
    console.log('The server is listening at the port 3000')
})