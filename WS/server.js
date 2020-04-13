const express = require("express")
const server = express()

const db = require("./db")

//configurar arquivos estáticos (css,scrips, imagens)
// o servidor vai olhar como se o conteudo essa pasta public estivisse no diretório raiz
server.use(express.static("public"))

// habilita o uso do req.body (recebe os dados de formulário...de metodo post)
server.use(express.urlencoded({extended: true}))

//configuração do nunjucks
// informo a pasta views e o link de conexão entre o nunjucks e o servido (Express)
const nunjuncks  = require("nunjucks")
nunjuncks.configure("views", {
    express: server,
    noCache: true,  // Não fazer cache. Colocar essa opção em ambiente de desenvolvimento, pq
                    // alterações no style.css por exemplo pode não refletir, pois o nunjucks 
                    // está com a versão antiga em cache.
                    // EM AMBIENTE DE PRODUÇÂO COLOCAR FALSE (pois tem ganho de processamento nas paginas.)
}) 

const Piii = require("piii");
const piiiFilters = require("piii-filters");

const piii = new Piii({
  filters: [
    ...Object.values(piiiFilters)
  ]
});


/*
const ideas = [  
    
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Curso de Programação",
        category:"Estudo",
        description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
        url:"https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Imagem de Exercícios",
        category:"Exercícios",
        description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
        url:"https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Imagem de Meditação",
        category:"Mentalidade",
        description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
        url:"https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Imagem de Karaokê",
        category:"Karaokê",
        description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
        url:"https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729038.svg",
        title: "Imagem de Pintura",
        category:"Criatividade",
        description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
        url:"https://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729048.svg",
        title: "Imagem de Recortes",
        category:"Criatividade",
        description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
        url:"https://rocketseat.com.br"
    }
    
]
*/

// Cria uma rota /
// e capturo o pedido do client para responder
server.get("/",function(req,res){

    db.all(`SELECT * FROM ideas`, function(err,rows){
        if (err) {
            console.log(err)
            return res.send('<h3 style="color: #ff0000">Ocorreu um erro de Bando de Dados!</h3>')
        }

        // reverse() = inverte o array de tras pra frente.
        // [...rows] espalha o conteudo do arrai para adiciona-lo em reverseIdeas
        // se fizer direto reverseIdeas = rows estaria atribuindo um atalho de rows 
        // dentro de reverseIdeas (tipo o conceito de passagem de parametro por referencia utilizando o @)
        const reverseIdeas = [...rows].reverse()

        let lastIdeas = []


        //Em javaScript a variavel item (variavél auxiliar contador), além de ser um
        //contador, a cada laço ela recebe o conteduo variável ideas (a variável que é o limite do for).
        //Desta forma, para pegar o conteudo de ideas na posição corrente, menciono a própria variável 
        //auxiliar (neste caso chadada de "item"). Diferente de outras linguagens, onde variamos ideas na posição N
        //ideas[n].title ----> em javascrip não é assim.
        
        

        for (let item of reverseIdeas){
            if (lastIdeas.length < 2){
                
                //push add uma ideia no array
                lastIdeas.push(item)

            }
        }

        // objento res é para retorno da requisão
        // propriedade render para renderizar (exibir em tela) um arq .html
        // propriedade send para enviar messangem
        return res.render("index.html",{ideas: lastIdeas})
        
    })


    
})


server.get("/ideas",function(req,res){

    db.all(`SELECT * FROM ideas`, function(err,rows){
        if (err) {
            console.log(err)
            return res.send('<h3 style="color: #ff0000">Ocorreu um erro de Bando de Dados!</h3>')
        }
        
        

    const reverseIdeas = [...rows].reverse()


    // objento res é para retonor da requisão
    // propriedade send para enviar messangem
    return res.render("ideas.html",{ideas: reverseIdeas})

    }) 

})

server.get("/remove/:id",function(req,res){
    

   // Deleta dados
   
    db.run(`DELETE FROM ideas WHERE id = ?`, [req.params.id], function(err){

        if (err) {
            console.log(err)
            return res.send('<h3 style="color: #ff0000">Ocorreu um erro de Bando de Dados!</h3>')
        }

        res.redirect("/ideas")
        console.log('DELETEI',this)
        
    })
    

})

server.post("/",function(req,res){

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
        req.body.image,
        piii.filter(req.body.title),
        piii.filter(req.body.category),
        piii.filter(req.body.description),
        piii.filter(req.body.link)
        
   ]

   db.run(query,values,function(err){
    if (err) {
        console.log(err)
        return res.send('<h3 style="color: #ff0000">Ocorreu um erro de Bando de Dados!</h3>')
    }

        res.redirect("/ideas")
   })

})



// levata servidro na porta 3000
server.listen(3000)