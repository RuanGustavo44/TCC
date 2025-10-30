const service = require('./reservations.service');
exports.handleCountReservations = async (req, res) => {
    try {
        const { resource_id } = req.query;
        if (!resource_id) {
            return res.status(400).json({ error: 'resource_id é obrigatório' });
        }
        const count = await service.countReservations(resource_id);
        return res.status(200).json({ count: count });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.criarReserva = async (req, res) => {
    try {
        const dadosReserva = req.body;
        const novaReserva = await service.criarReserva(dadosReserva);
        res.status(201).json(novaReserva);
    } catch (error) {
        if(error.message.includes('Capacidade esgotada') || error.message.includes('Recursos não encontrado')) {
            return res.status(409).json({
                error: error.message
            })
        } else {
            res.status(500).json({
                error: 'Erro ao criar reserva',
                detail: error.message,
            })
        }
    }
}

exports.deletarReserva = async (req, res) => {
    try {
        const { id } = req.param;
        await service.deletarReserva(id);
        return res.status(204).send();
    } catch (error) {
        if(error.message.includes('Reserva nâo encontrada')) {
            return res.status(404).json({
                error: error.message
            })
        } else {
            res.status(500).json({
                erro: 'Erro ao deletar reserva', details: error.message
            });
        }
    }
}