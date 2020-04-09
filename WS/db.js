const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function(){

//_________________________ Cria tabela________________________________
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );    


    `)

//__________________Insere dados na Tabela_____________________________
/*
    const query = `
    INSERT INTO ideas (
        image,
        title,
        category,
        description,
        link

    ) VALUES(?,?,?,?,?);
    `
    const values = [
        "https://image.flaticon.com/icons/svg/2729/2729038.svg",
        "Imagem de Pintura",
        "Criatividade",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
        "https://rocketseat.com.br"
   ]

   db.run(query,values,function(err){
       if (err) return console.log(err)

       console.log(this)
   })
*/


/*
    // Deleta dados
    db.run(`DELETE FROM ideas WHERE id > ?`, [0], function(err){
        if (err) return console.log(err)

        console.log('DELETEI',this)
        
    })
*/

    //______________________Consulta Dados______________________________
/*
   db.all(`
        SELECT * FROM ideas;

   `, function(err,rows){
        if (err) return console.log(err)

        console.log(rows)
   })
*/


        

      
})


// Exporta o bancos para ser utlizado por qualquer lugar da aplicação que desejar usar.
// no caso será utilizado no server.js
module.exports = db
