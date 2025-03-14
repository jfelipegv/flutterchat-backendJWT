const {io} = require('../index');
const Band = require('../models/band')
const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand(new Band( 'AC/DC' ));
bands.addBand(new Band( 'Franz Ferdinand' ));
bands.addBand(new Band( 'Black Sabath' ));
bands.addBand(new Band( 'QUEEN' ));


//Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', ()=> {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload )=>{
        console.log('mensaje!!!!!',payload);
        io.emit( 'mensaje', {admin: 'Nuevo mensaje'});
    });

    client.on('vote-band', ( payload )=>{
        bands.voteBand(payload['id'] );
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', ( payload )=>{
        
        bands.addBand(new Band (payload));
        io.emit('active-bands', bands.getBands());

    });

    client.on('delete-band', ( band )=>{
        bands.deleteBand(band.id);
        io.emit('active-bands', bands.getBands());

    });



    // client.on('emitir-mensaje', (payload)=>{
    //     console.log(payload);
    //     //io.emit('nuevo-mensaje', payload);// Emite a todos!
    //     // client.broadcast.emit('mensaje-emitido', payload);// Emite a todos menos al que lo emitio
    //     client.broadcast.emit('emitir-mensaje', payload);
    // });

});