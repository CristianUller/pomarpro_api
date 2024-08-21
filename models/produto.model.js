const conexao = require('../database/connection.database');

//puxa todos
async function getproduto(){
    try{
        const[linhas] = await conexao.query(`
            select * from tb_produtos
            `)
            return linhas;
    }catch(erro){
        return erro;
    }
}

//busca os produtos pelos id
async function getprodutoById(id){
    try{
        const[linhas] = await conexao.query(`
            select * from tb_produtos where id = ?
            `[id])
            return linhas;
    }catch(erro){
        return erro;
    }
}

//invoca um produto no banco de dados
async function addproduto( 
   
    tipo,
    valor,
   descricao,
unid_medida){ try{
        const[exec] = await conexao.query(`
            insert into tb_produtos (  
                descricao,
                tb_tipo_id,
                valor,
                unid_medida
            )values(
                ?,
                ?,
                ?,
                ?
            )
            `,[  descricao,
                tipo,
                valor,
            unid_medida])
            return exec.affectedRows;
    }catch(erro){
        return erro;
    }

}

//função para buscar todos os usuários do banco
async function buscaTodosproduto(){
    //estrutura de tentativa try..catch para capturar erros
    try{
        let [linhas] = await conexao.query(`
            select 
          	    u.id,
                u.descricao,
                u.tb_tipo_id,
                u.valor,
                u.unid_medida

             from tb_produtos  u;
            `)
            //retorna valores buscados no banco
            return linhas;
    }catch(e){
        //retorna o erro que aconteceu
        return e;
    }
}



module.exports = {
     getproduto,
     getprodutoById,
     addproduto,
     buscaTodosproduto
};