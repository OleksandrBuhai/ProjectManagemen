const Project = require('../models/Project');
const Client = require('../models/Client');
const Developers = require('../models/Developers')

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');

// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
    frontendDeveloper: { 
      type: DevelopersType,
      resolve(parent, args) {
        return Developers.findById(parent.frontendDeveloperId); 
      },
    },
    backendDeveloper: { 
      type: DevelopersType,
      resolve(parent, args) {
        return Developers.findById(parent.backendDeveloperId);
      },
    },
    designDeveloper: { 
      type: DevelopersType,
      resolve(parent, args) {
        return Developers.findById(parent.designDeveloperId); 
      },
    },
  }),
});

// Client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//Developers Position
const DeveloperPositionEnum = new GraphQLEnumType({
  name: 'DeveloperPosition',
  values: {
    frontend: { value: 'Front End' },
    backend: { value: 'Back End' },
    design: { value: 'UI/UX Design' },
  },
});

//Developers Type 
const DevelopersType = new GraphQLObjectType({
  name: 'Devs',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    position: { type: DeveloperPositionEnum },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    projectId: { type: GraphQLString }
  }),
});



const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
    developers: {
      type: new GraphQLList(DevelopersType),
      args: {
        position: { type: GraphQLString}
      },
      resolve(parent, args) {
        if(args.position){
          return Developers.find({ position: args.position})
        } else {
          return Developers.find()
        }
      },
    },
    developer: {
      type: DevelopersType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Developers.findById(args.id);
      },
    }
  },
});

// Mutations

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },
    // Delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        try {
          const client = await Client.findById(args.id);
          const projects = await Project.find({ clientId: args.id });

          for (const project of projects) {
            await project.deleteOne();
          }

          await client.deleteOne();

          return client;
        } catch (error) {
          throw new Error(`Error deleting client: ${error.message}`);
        }
      },
    },

    // Add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Not Started',
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
        frontendDeveloperId: { type: GraphQLNonNull(GraphQLID) },
        backendDeveloperId: { type: GraphQLNonNull(GraphQLID) },
        designDeveloperId: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
          frontendDeveloperId: args.frontendDeveloperId,
          backendDeveloperId: args.backendDeveloperId,
          designDeveloperId: args.designDeveloperId,
        });

        const savedProject = await project.save();

        return savedProject;
      },
    },

    // Delete a project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      },
    },

    // Update a project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },

    // Add Developer 
    addDeveloper: {
      type: DevelopersType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        position: { type: GraphQLNonNull(DeveloperPositionEnum) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        projectId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const developer = new Developers({
          name: args.name,
          position: args.position,
          email: args.email,
          phone: args.phone,
          projectId: args.projectId,
        });

        return developer.save();
      },
    },

    // Remove developer
    deleteDeveloper: {
      type: DevelopersType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Developers.findByIdAndDelete(args.id);
      },
    },
  },
});


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});