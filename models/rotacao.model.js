const conexao = require("../database/connection.database");

//puxa todos
async function getrotacao() {
  try {
    const [linhas] = await conexao.query(`
            select * from mov_item
            `);
    return linhas;
  } catch (erro) {
    return erro;
  }
}

//busca os rotacaos pelos id
async function getrotacaoById(id) {
  try {
    const [linhas] = await conexao.query(
      `
            select * from mov_item where id = ?
            `[id]
    );
    return linhas;
  } catch (erro) {
    return erro;
  }
}

//invoca um rotacao no banco de dados
async function addrotacao(tipo, quantidade, tb_produtos_id) {
  try {
    const [exec] = await conexao.query(
        `
              insert into tb_movimentacao ( 
                  dt_moviment,
                  tb_tipo_id
              ) values (
                  current_timestamp,
                  ?
              )
              `,
        [tipo]);
    const [linha] = await conexao.query(`select last_insert_id() as id`);

    const [exec2] = await conexao.query(
      `
            insert into mov_item ( 
                quantidade,
                tb_movimentacao_id,
                tb_produtos_id
                
            ) values (
                ?,
                ?,
                ?
            )
            `,
      [quantidade, linha[0].id, tb_produtos_id]
    );
    return exec2.affectedRows;
  } catch (erro) {
    return erro;
  }
}

//função para buscar todos os usuários do banco
async function buscaTodosrotacao() {
  //estrutura de tentativa try..catch para capturar erros
  try {
    let [linhas] = await conexao.query(`
            select
	m.id,
    m.dt_moviment,
    m.tb_tipo_id,
    t.descricao as ds_tipo,
    mi.tb_produtos_id,
    p.descricao as ds_produto,
    mi.quantidade
from tb_movimentacao m
	inner join mov_item mi on mi.tb_movimentacao_id = m.id
    inner join tb_tipo t on t.id = m.tb_tipo_id
    inner join tb_produtos p on p.id = mi.tb_produtos_id
            `);
    //retorna valores busos no banco
    return linhas;
  } catch (e) {
    //retorna o erro que aconteceu
    return e;
  }
}

module.exports = {
  getrotacao,
  getrotacaoById,
  addrotacao,
  buscaTodosrotacao,
};
