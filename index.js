const cors = require('cors'); //helps your app work on local network!
const express = require('express');
const api = express();


api.use(cors());

//example http://localhost:3000/?country=get&searchInMiddle=true    
//example http://localhost:3000/?country=ger&searchInMiddle=false  (only returns Germany)

api.get('/', (req, res) => {
    
    const validate = require('./validate');
    const countries = require('./countries');
    
    const { error } = validate(req.query);
    if (error) return res.status(400).send(`Invalid input: ${error.details[0].message}`)
    
    const result = countries.filter(country => { 
        let regex = new RegExp(req.query.country, "i"); //i makes it case-insensitive
        if ( req.query.searchInMiddle === 'false' )  
            regex = new RegExp(`^${req.query.country}`, "i");//the case it should start with the string
        if (country.name.search(regex) !== -1 ) return country;
    } )
    
    return res.json(result);

}); 

const port = 3000;
api.listen(port, () => console.log(`api listening at http://localhost:${port}`))