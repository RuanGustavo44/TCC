const db = require('./database/connection');
exports.countConfirmedByResourceId = async (resourceId) => {
    const result = await db('reservation')
        .where({ resource_id: resourceId, status: 'CONFIRMED' })
        .count()
        .first();
    return parseInt(result.count, 10);
};

exports.findRecursoById = async (id, trx) => {
    return trx('recursos').where({ id }).first();
}

exports.findReservaById = async (id, trx) => {
    return trx('reservas').where({ id }).first();
}

exports.countConflitos = async (recurso_id, data_inicio, data_fim, trx) => {
    return trx('reservas')
        .where({ recurso_id })
        .andWhere('data_inicio', '<', data_fim)
        .andWhere('data_fim', '>', data_inicio)
        .count('id as count')
        .first();
}

exports.createReserva = async (dadosReserva, trx) => {
    return trx('reservas')
        .insert(dadosReserva)
        .returning('*');
}

exports.deleteReserva = async (id, trx) => {
    return trx('reservas')
        .where({ id })
        .del();
}