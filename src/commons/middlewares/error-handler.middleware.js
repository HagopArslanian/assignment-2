

module.exports = {
    handleError(err, req, res, next){
        if(err.message.includes("duplicate")){
            err.statusCode = 409;
        }//in this case when the unique : true rule gets violated and we have duplicate of the same username, the status code will give the right 409 conflict instead of general case for everything which is the status code 500.
        else if(err.message.includes("validation")){
            err.statusCode = 400;
        }

        if(!err.statusCode){
            console.error(err);
        }
        
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}