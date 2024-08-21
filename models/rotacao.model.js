const conexao = require('../database/connection.database');

//puxa todos
async function getrotacao(){
    try{
        const[linhas] = await conexao.query(`
            select * from tb_movimentacao
            `)
            return linhas;
    }catch(erro){
        return erro;
    }
}

//busca os rotacaos pelos id
async function getrotacaoById(id){
    try{
        const[linhas] = await conexao.query(`
            select * from tb_movimentacao where id = ?
            `[id])
            return linhas;
    }catch(erro){
        return erro;
    }
}

//invoca um rotacao no banco de dados
async function addrotacao( 
    dt_moviment,
    td_tipo_id){ try{
        const[exec] = await conexao.query(`
            insert into tb_movimentacao ( 
                dt_moviment,
                td_tipo_id
            ) values (
                current_timestamp,
                ?
            )
            `,[dt_moviment,td_tipo_id]);
            return exec.affectedRows;
    }catch(erro){
        return erro;
    }

}

//função para buscar todos os usuários do banco
async function buscaTodosrotacao(){
    //estrutura de tentativa try..catch para capturar erros
    try{
        let [linhas] = await conexao.query(`
            select 
          	    u.id,
                u.dt_moviment,
                u.td_tipo_id
             from tb_movimentacao  u;
            `)
            //retorna valores busos no banco
            return linhas;
    }catch(e){
        //retorna o erro que aconteceu
        return e;
    }
}



module.exports = {
     getrotacao,
     getrotacaoById,
     addrotacao,
     buscaTodosrotacao
};