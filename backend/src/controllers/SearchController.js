const Dev = require('../models/Dev')
const parseStringArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response){
    // Buscar todos os Devs num raio de 10 km
    // Filtrar por tecnologias

    //console.log(request.query);
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringArray(techs);

    //console.log(techsArray);

    const devs = await Dev.find({
      //mongo operators
      techs:{
        $in: techsArray,
      },
      location:{
        $near:{
          $geometry:{
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return response.json({ devs }); 
  }
}