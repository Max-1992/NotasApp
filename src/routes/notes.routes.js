const { Router } = require('express');
const router = Router();

router.get('/notes', (req, res, next) => {
    res.send('Notas desde la base de datos')
});

module.exports = router;