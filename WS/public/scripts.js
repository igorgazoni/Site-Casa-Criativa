

function onOff(){
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")

    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")

}

function checkFields(event) {

	const valuesToCheck = [
		"title",
        "category",
        "image",
		"description",
		"link",
	]
	
	const isEmpty = valuesToCheck.find(function(value){

        const checkIfIsString = typeof event.target[value].value === "string"	
        
					           // Senão fazer o trim é vazio
		const checkIfIsEmpty = !event.target[value].value.trim()
		
		if(checkIfIsString && checkIfIsEmpty){
			// ao retornar verdadeiro, a variavel isEmpty recebe o nome do item
            // encontrado e também fica com status de verdadei (true), podendo ser 
            // utilizada em um if ou ser impresso o nome do elemento encontrado
			return true 
		} 
	})	

    /* em vez de usar o find poderia ser feito via for
	for(let value of valuesToCheck){
		console.log(event.target[value].value)
	}
    */

    if(isEmpty){
    
        // interrompe o evento padrão do formuário (que é um submit (envio) )
        event.preventDefault()
        alert("Por favor preencha o campo " + isEmpty)
    }

}


