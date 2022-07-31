const express = require('express');
const app =express();
const PORT=5000
const connectDB = require('./db/connect');
const {ApolloServer} = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs/index');
const resolvers = require('./graphql/resolvers/index');
app.get('/',(req,res)=>{
    res.send('Hello World')
})

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({req}) => ({req})
})
const startServer = async()=>{
    await connectDB()
    await server.start()
    server.applyMiddleware({app})

    app.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}/graphql`)
    })
}
startServer().then(()=>{
    console.log('Server started')
}).catch((err)=>{
    console.log(err)
})

