 const Joi = require('joi');
 const express = require('express');
 const app = express();

 app.use(express.json());

 let genres = [
     { id: 1, category: 'Horror' },
     { id: 2, category: 'Thriller' },
     { id: 3, category: 'Suspense' },
     { id: 4, category: 'Action' },
     { id: 5, category: 'Romantic' },
 ];

 app.get('/api/genres', (req, res) => {
    if(genres.length)
        res.send(genres);
 });

 app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));

    if (!genre) return res.status(404).send('ID not found');
    res.send(genre);
 });
 

 app.post('/api/genres', (req, res) => {

    const { error } = validateGenre(req.body);
    if ( error ) return res.status(400).send(error.details[0].message);

    const new_genre = {
        id: req.body.id,
        category: req.body.category
    };
    genres.push(new_genre);
    res.send(new_genre);
 });

 //app.delete()

app.put('/api/genres/:id', (req, res) => {
    const { error } = validateGenre(req.body);
    if ( error ) return res.status(400).send(error.details[0].message);

    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if (!genre)  return res.status(404).send('Not Found');
    const index = genres.indexOf(genre);
    genres[index].category = req.body.category;
    res.send(genre);
});


app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
  
    res.send(genre);
  });

 function validateGenre(genre) {
     const schema = {
         category: Joi.string().min(3).required(),  
         id: Joi.string().max(3).required()
     };

     return Joi.validate(genre, schema);
 }

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening to Port ${port}`))