// Setup Server -- as also done in: Node & Express Environment → 6. Creating a Local Server I
const app = require('./server');
const port = 3000;
const startServer = app.listen(port, () => {
    console.log('server is up and running'),
        console.log(`running on localhost: ${port}`)
        return 1;
});

