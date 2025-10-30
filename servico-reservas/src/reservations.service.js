const repository = require('./reservations.repository');
const knex = require('./database/connection');

exports.countReservations = (resourceId) => {
    return repository.countConfirmedByResourceId(resourceId);
};

exports.criarReserva = (dadosReserva) => {
    const { recurso_id, data_inicio, data_fim } = dadosReserva;
    return knex.transaction(async (trx) => {
        const recurso = await repository.findRecursoById(recurso_id, trx);
        if(!recurso)
            throw new Error('Recurso não encontrado');

        const conflitos = await repository.countConflitos(recurso_id, data_inicio, data_fim)
        if(conflitos.count >= recurso.capacidade)
            throw new Error('Capacidade esgotada para este recurso neste horário')

        const [novaReserva] = await repository.createReserva(dadosReserva, trx);
        return novaReserva;
    })
}

exports.deletarReserva = async (id) => {
    return knex.transaction(async (trx) => {
        const reserva = await repository.findReservaById(id, trx);
        if(!reserva)
            throw new Error('Reserva não encontrada')

        await repository.deleteReserva(id, trx);
        return {
            message: 'Reserva deletada com sucesso'
        }
    })

}