import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './Schema.js';    
import { resolvers } from './Resolver.js';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 5000 },
});

console.log(`🚀 Server ready at: ${url}`);
