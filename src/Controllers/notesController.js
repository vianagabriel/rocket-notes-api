const knex = require("../database/knex")

class NotesController {
  // método de criar um usuário;
  async create(request, response) {
    //Recuperando dados passados pelo corpo da requisição;
    const { title, description, tags, links } = request.body;
    //Recuperando o id passado pela rota;
    const { user_id } = request.params;

    //Inserindo a nota e recuperando o id da nota;
    const note_id = await knex("notes").insert({
      title,
      description,
      user_id
    })

    //Percorrendo cada link e retornando o note_id; 
    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    });

    //Inserindo cada link;
    await knex("links").insert(linksInsert)


    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    });

    await knex("tags").insert(tagsInsert);

    response.json();
  }

  //método para listar uma nota;
  async show(request, response) {
    //recuperar o id;
    const { id } = request.params;
    //buscando a nota pelo id;
    const note = await knex('notes').where({ id }).first();
    //buscando as tags;
    const tags = await knex('tags').where({ note_id: id }).orderBy('name');
    //buscando os links;
    const links = await knex('links').where({ note_id: id }).orderBy('created_at');

    return response.json({
      ...note,
      tags,
      links
    })
  }

  //método para deletar uma nota;
  async delete(request, response) {
    //Recuperando o id;
    const { id } = request.params;
    //buscando o id da nota na tabela de notas;
    await knex('notes').where({ id }).delete();

    return response.json();
  }

  //Método para listar todas as notas cadastradas por usuário;
  async index(request, response) {
    //Recuperando o id do usuário através da query;
    const { title, user_id, tags } = request.query;

    let notes;

    if (tags) {
      const filterTags = tags.split(',').map(tag => tag.trim())
      
      notes = await knex('tags')
      .select([
        'notes.id',
        'notes.title',
        'notes.user_id',
      ])
       .where('notes.user_id', user_id)
       .whereLike('notes.title', `%${title}%`)
       .whereIn('name', filterTags)
       .innerJoin('notes', 'notes.id', 'tags.note_id')
  

    } else {
      //Buscando as notas do usuário e ordenando por ordem alfabética;
      notes = await knex('notes')
        .where({ user_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title')
    }

    const userTags = await knex('tags').where({ user_id });
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return{
        ...note,
        tags: noteTags
      }
    })

  

    return response.json(notesWithTags);
  }
}

module.exports = NotesController;



