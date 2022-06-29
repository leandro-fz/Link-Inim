const { createLogger, format, transports } = require('winston');
const { combine, splat, timestamp, printf } = format;

const myFormat = printf( ({ level, message, timestamp , ...metadata}) => {
  let msg = `${timestamp} [${level}] ${message} `  
  if(metadata) {
      msg += JSON.stringify(metadata)
  }
  return msg
});
const mysimpleFormat = printf( ({ level, message, timestamp , ...metadata}) => {
  let msg = `${timestamp} [${level}] ${message} `  
  return msg
});

const logger = createLogger({
  colorize: true,
 
  transports: [
      new transports.Console({
        format: combine(
            format.colorize(),
            splat(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
            mysimpleFormat
          ),           
        level: 'warn'  
      }),
      new transports.File({  
          format: combine(
       
        splat(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        myFormat
      ),  
        filename: 'logs/all-logs.log',
        level: 'silly'
      }),
      new transports.File({
        format: combine(
       
            splat(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
            myFormat
          ),            
        filename: 'logs/errors.log',
        level: 'error'
      })
    ]
});
logger.httpStream = {
  write: function(message, encoding){
      logger.http(message);
  }
};
module.exports = {logger};