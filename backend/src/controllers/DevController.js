const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringArray = require('../utils/parseStringAsArray');

// funcoes
// index, show, store, update, destroy

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },
  async store(request, response) {
    // async pode demorar pra responder
  
    //console.log(request.query);
    //console.log(request.params);
    //console.log(request.body);
    const { github_username, techs, latitude, longitude } = request.body;
    
    //evitar store duplicado
    let dev = await Dev.findOne({ github_username });

    if (!dev){
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  
      //console.log(apiResponse.data);
    
      const {name = login, avatar_url, bio} = apiResponse.data
      //console.log(name, avatar_url, bio, github_username)
    
      const techsArray = parseStringArray(techs);
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })
    }
  
    //return response.send('Hello World');
    //return response.json({ message: 'Hello Omnistack'});
    return response.json(dev);
  }, 

  /*
  //fazer exercício dps
  async update(){

  },
  async destroy(){

  },*/
};