const { knex } = require("./connection");
const { createWriteStream } = require("fs");
const Path = require("path");

const resolvers = {
  Query: {
    async persona() {
      return await knex
        .select()
        .from("persona")
        .where("active", 1)
        .orderBy("points", "desc");
    },
    async personas(_, args) {
      try {
        const views = await knex.select().from("persona").where("id", args.id);
        if (views.length != 0) {
          return views;
        } else {
          throw new Error("No se pueden obtener los datos con ID: " + args.id);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    async empleado() {
      try {
        return await knex.select().from("empleados").orderBy("id", "desc");
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    async createPersona(_, args) {
      try {
        const { fullname, points, empleados_id, image } = args;
        const { filename, mimetype, encoding, createReadStream } = image[0].file;
        let stream = createReadStream();

        const path = Path.resolve(__dirname, "uploads", filename);
        let writeStream = await createWriteStream(path);
        await stream.pipe(writeStream);

        let images = 'http://localhost:4000/uploads/' + filename;        
        const resultado = await knex("persona").insert({
          fullname,
          points,
          empleados_id,
          image: images
        });
        if (resultado.length != 0) {
          const id = resultado[0];
          let consulta = await knex.select(knex.raw('points, position, id, row_number() over (order by points desc) as rnk'))
              .from('persona')
              .orderByRaw('points DESC')
              .where({active: 1})
            for(x in consulta){
                await knex("persona")
                  .update({position: consulta[x].rnk})
                  .where({id: consulta[x].id});
            };
          return await knex("persona").where({ id }).first();
        } else {
          throw new Error("No se pueden guardar los datos");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async updatePersona(_, args) {
      try {
        const { id, fullname, points, empleados_id, image } = args;     
        const { filename, mimetype, encoding, createReadStream } = image[0].file;        
        let stream = createReadStream();
        
        const path = Path.resolve(__dirname, "uploads", filename);
        let writeStream = await createWriteStream(path);
        await stream.pipe(writeStream);

        let images = 'http://localhost:4000/uploads/' + filename;
        await knex("persona")
          .where({ id })
          .update({ fullname, points, empleados_id, image: images });
          let consulta = await knex.select(knex.raw('points, position, id, row_number() over (order by points desc) as rnk'))
          .from('persona')
          .orderByRaw('points DESC')
          .where({active: 1})
        for(x in consulta){
            await knex("persona")
              .update({position: consulta[x].rnk})
              .where({id: consulta[x].id});
        };
        return await knex("persona").where({ id }).first();
      } catch (error) {
        console.log(error);
      }
    },
    async deletePersona(_, args) {
      try {
        const { id } = args;
        await knex("persona").where({ id }).update({ active: false });
        let consulta = await knex
          .select(
            knex.raw(
              "points, position, id, row_number() over (order by points desc) as rnk"
            )
          )
          .from("persona")
          .orderByRaw("points DESC")
          .where({ active: 1 });
        for (x in consulta) {
          await knex("persona")
            .update({ position: consulta[x].rnk })
            .where({ id: consulta[x].id });
        }
        return await knex("persona").where({ id }).first();
      } catch (error) {
        console.log(error);
      }
    },
  },
  Persona: {
    async empleados(obj) {
      try {
        return await knex
          .select()
          .from("empleados")
          .where("id", obj.empleados_id);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
