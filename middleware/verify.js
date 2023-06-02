const jwt = require('jsonwebtoken');

const verify= async function(req,res,query){
    await jwt.verify(req.token, process.env.TOKEN_KEY, (err, decoded) => {
        if(err) {
          res.sendStatus(403);
        } else {
            res.send(query);
        }
      });
}

module.exports = verify;