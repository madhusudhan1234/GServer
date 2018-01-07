const axios = require('axios');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLSchema,
	GraphQLList
} = require('graphql');


// Hardcode customer data
const customers = [
	{id:1, name:"Ashok Adhikari", email:"ashok.adhikari92@gmail.com", age:25},
	{id:2, name:"Madhu Sudhan Subedi", email:"madhusudhan@gmail.com", age:23},
	{id:3, name:"Ramesh Pandey", email:"rameshpandey@gmail.com", age:21},
	{id:4, name:"Niraj Adhikari", email:"nirajadhikari@gmail.com", age:23},
	{id:5, name:"Anil Adhikari", email:"aniladhikari@gmail.com", age:20},
];

// Customer Type 
const CustomerType = new GraphQLObjectType({
	name: "Customer",
	fields: () => ({
		id: {type: GraphQLString},
		name: {type: GraphQLString},
		email: {type: GraphQLString},
		age: {type: GraphQLInt},
	})
});

// Root Query
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields:{
		customer:{
			type: CustomerType,
			args: {
				id: {type: GraphQLString}
			},
			resolve(parentValue, args){
				/*for(let i=0; i < customers.length; i++){
					if(customers[i].id == args.id){
						return customers[i];
					}
				}*/
				return axios.get('http://localhost:3000/customers/'+ args.id)
					.then(res => res.data);
			}
		},
		customers:{
			type: new GraphQLList(CustomerType),
			resolve(parentValue, args){
				return axios.get('http://localhost:3000/customers')
					.then(res => res.data);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});

