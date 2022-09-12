const {Command} = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main(){

    const program = new Command()

    program
    .version("v1")
    .option("-n, --nome [value]", "Nome do Heroi")
    .option("-p, --poder [value]", "Poder do Heroi")
    .option("-i, --id [value]", "Id do Heroi")
    .option("-c, --cadastrar", "Cadastrar um Heroi")
    .option("-l, --listar", "Listar o heroi")
    .option("-r, --remover", "Remove o heroi pelo id")
    .option("-a, --atualizar [value]", "Atualiza o heroi pelo id")



    program.parse(process.argv)
    

    const options = program.opts()
    const heroi = new Heroi(options)

    try{
        if(options.cadastrar){
            delete heroi.id;
            const resultado = await Database.cadastrar(heroi)
            if(!resultado){
                console.error('Heroi não foi cadastrado')
                return;
            }

            console.error('Heroi foi cadastrado')
        }

        if(options.listar){
            const resultado = await Database.listar()
            console.log(resultado);
            return;
        }

        if(options.remover){
            const resultado = await Database.remover(heroi.id)
            if(!resultado){
                console.error('Heroi não foi removido')
            }
            console.log('Heroi foi removido')
            return;
        }

        if(options.atualizar){
            const idParaAtualizar = parseInt(options.atualizar)
            // remover todas as chaves que estiverem com undefined | null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)
            if(!resultado){
                console.error('Herói não atualizado')
            }
            console.log('Heroi foi atualizado');
        }

    }catch(error){
        console.error("DEU RUIM", error)
    }
}

main()