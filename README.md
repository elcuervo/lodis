# Lodis

    -----------------------------------------------------------------------
    |_____________________________________________________________________X
    | <  |  >  | x  |_____________________________________________________|
    -----------------------------------------------------------------------
    |                    _._                                              |
    |               _.-``__ ''-._                                         |
    |          _.-``    `.  `_.  ''-._                                    |
    |      .-`` .-```.  ```\\/    _.,_ ''-._                              |
    |     (    '      ,       .-`  | `,    )                              |
    |     |`-._`-...-` __...-.``-._|'` _.-'|       Lodis 0.1              |
    |     |    `-._   `._    /     _.-'    |                              |
    |      `-._    `-._  `-./  _.-'    _.-'        like Redis             |
    |     |`-._`-._    `-.__.-'    _.-'_.-'|       but in a browser       |
    |     |    `-._`-._        _.-'_.-'    |                              |
    |      `-._    `-._`-.__.-'_.-'    _.-'                               |
    |     |`-._`-._    `-.__.-'    _.-'_.-'|                              |
    |     |    `-._`-._        _.-'_.-'    |                              |
    |      `-._    `-._`-.__.-'_.-'    _.-'                               |
    |          `-._    `-.__.-'    _.-'                                   |
    |              `-._        _.-'        github.com/elcuervo/lodis      |
    |                  `-.__.-'                                           |
    |---------------------------------------------------------------------|
    -----------------------------------------------------------------------

## Compatibility
  Redis 2.4

## Supported commands
  * SET &#10003;
  * GET &#10003;
  * DEL &#10003;
  * EXISTS &#10003;
  * EXPIRE &#10003;
  * DBSIZE &#10003;
  * EXPIREAT &#10003;
  * KEYS &#10003;
  * APPEND key, value &#10003;
  * AUTH password &#10003;
  * BGREWRITEAOF &#10003;
  * BGSAVE &#10003;
  * BLPOP key [key ...] timeout
  * BRPOP key [key ...] timeout
  * BRPOPLPUSH source destination timeout
  * CONFIG GET parameter
  * CONFIG SET parameter value
  * CONFIG RESETSTAT
  * DEBUG OBJECT key
  * DEBUG SEGFAULT
  * DECR key &#10003;
  * DECRBY key decrement &#10003;
  * DISCARD
  * ECHO message &#10003;
  * EXEC
  * FLUSHALL &#10003;
  * FLUSHDB &#10003;
  * GETBIT key offset
  * GETRANGE key start end &#10003;
  * GETSET key value &#10003;
  * HDEL key field [field ...] &#10003;
  * HEXISTS key field &#10003;
  * HGET key field &#10003;
  * HGETALL key &#10003;
  * HINCRBY key field increment &#10003;
  * HKEYS key &#10003;
  * HLEN key &#10003;
  * HMGET key field [field ...] &#10003;
  * HMSET key field value [field value ...] &#10003;
  * HSET key field value &#10003;
  * HSETNX key field value &#10003;
  * HVALS key &#10003;
  * INCR key &#10003;
  * INCRBY key increment &#10003;
  * INFO
  * LASTSAVE
  * LINDEX key index &#10003;
  * LINSERT key BEFORE|AFTER pivot value &#10003;
  * LLEN key &#10003;
  * LPOP key &#10003;
  * LPUSH key value [value ...] &#10003;
  * LPUSHX key value &#10003;
  * LRANGE key start stop &#10003;
  * LREM key count value &#10003;
  * LSET key index value &#10003;
  * LTRIM key start stop &#10003;
  * MGET key [key ...] &#10003;
  * MONITOR
  * MOVE key db
  * MSET key value [key value ...] &#10003;
  * MSETNX key value [key value ...] &#10003;
  * MULTI
  * OBJECT subcommand [arguments [arguments ...]]
  * PERSIST key &#10003;
  * PING &#10003;
  * PSUBSCRIBE pattern [pattern ...]
  * PUBLISH channel message
  * PUNSUBSCRIBE [pattern [pattern ...]]
  * QUIT
  * RANDOMKEY &#10003;
  * RENAME key newkey &#10003;
  * RENAMENX key newkey &#10003;
  * RPOP key &#10003;
  * RPOPLPUSH source destination &#10003;
  * RPUSH key value [value ...] &#10003;
  * RPUSHX key value &#10003;
  * SADD key member [member ...] &#10003;
  * SAVE &#10003;
  * SCARD key &#10003;
  * SDIFF key [key ...] &#10003;
  * SDIFFSTORE destination key [key ...] &#10003;
  * SELECT index &#10003;
  * SETBIT key offset value
  * SETEX key seconds value &#10003;
  * SETNX key value &#10003;
  * SETRANGE key offset value &#10003;
  * SHUTDOWN &#10003;
  * SINTER key [key ...] &#10003;
  * SINTERSTORE destination key [key ...] &#10003;
  * SISMEMBER key member &#10003;
  * SLAVEOF host port
  * SLOWLOG subcommand [argument]
  * SMEMBERS key &#10003;
  * SMOVE source destination member &#10003;
  * SORT key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA] [STORE destination]
  * SPOP key &#10003;
  * SRANDMEMBER key &#10003;
  * SREM key member [member ...] &#10003;
  * STRLEN key
  * SUBSCRIBE channel [channel ...]
  * SUNION key [key ...]
  * SUNIONSTORE destination key [key ...]
  * SYNC
  * TYPE key
  * UNSUBSCRIBE [channel [channel ...]]
  * UNWATCH
  * WATCH key [key ...]
  * ZADD key score member
  * ZCARD key
  * ZCOUNT key min max
  * ZINCRBY key increment member
  * ZINTERSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]
  * ZRANGE key start stop [WITHSCORES]
  * ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]
  * ZRANK key member
  * ZREM key member
  * ZREMRANGEBYRANK key start stop
  * ZREMRANGEBYSCORE key min max
  * ZREVRANGE key start stop [WITHSCORES]
  * ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count]
  * ZREVRANK key member
  * ZSCORE key member
  * ZUNIONSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]


## TODO
  * Store expirations within Lodis itself to avoid expiration dates on reload
  * Sync with Redis via HTTP?
