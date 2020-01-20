const socketio = require('socket.io');

const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = []; 

exports.setupWebsocket = (server) => {
  //console.log('opok')
  io = socketio(server);

  io.on('connection', socket => {
    //console.log(socket.id);
    //console.log(socket.handshake.query);
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coodinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs),
    });
    //setTimeout(()=> {
    //  socket.emit('message', 'Hello World')
    //}, 3000)
  });

};

exports.findConnections =  (coordinates, techs) => {
  return connections.filter(connection => {
    return calculateDistance(coordinates, connection.coodinates) < 10
      && connection.techs.some(item => techs.includes(item))
  })
}

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  })
}