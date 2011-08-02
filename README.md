## Commands
  * SET
  * GET
  * DEL
  * EXISTS
  * EXPIRE
  * DBSIZE
  * EXPIREAT
  * KEYS

  * APPEND key, value
  * AUTH password //not implemented
  * BGREWRITEAOF //
  * BGSAVE
  BLPOP key [key ...] timeout
  BRPOP key [key ...] timeout
  BRPOPLPUSH source destination timeout
  CONFIG GET parameter
  CONFIG SET parameter value
  CONFIG RESETSTAT
  DEBUG OBJECT key
  DEBUG SEGFAULT
  * DECR key
  * DECRBY key decrement
  DISCARD
  ECHO message
  EXEC
  FLUSHALL
  FLUSHDB
  GETBIT key offset
  GETRANGE key start end
  GETSET key value
  HDEL key field [field ...]
  HEXISTS key field
  HGET key field
  HGETALL key
  HINCRBY key field increment
  HKEYS key
  HLEN key
  HMGET key field [field ...]
  HMSET key field value [field value ...]
  HSET key field value
  HSETNX key field value
  HVALS key
  * INCR key
  INCRBY key increment
  INFO
  LASTSAVE
  LINDEX key index
  LINSERT key BEFORE|AFTER pivot value
  LLEN key
  LPOP key
  * LPUSH key value [value ...]
  LPUSHX key value
  LRANGE key start stop
  LREM key count value
  LSET key index value
  LTRIM key start stop
  MGET key [key ...]
  MONITOR
  MOVE key db
  MSET key value [key value ...]
  MSETNX key value [key value ...]
  MULTI
  OBJECT subcommand [arguments [arguments ...]]
  PERSIST key
  PING
  PSUBSCRIBE pattern [pattern ...]
  PUBLISH channel message
  PUNSUBSCRIBE [pattern [pattern ...]]
  QUIT
  RANDOMKEY
  RENAME key newkey
  RENAMENX key newkey
  RPOP key
  RPOPLPUSH source destination
  * RPUSH key value [value ...]
  RPUSHX key value
  SADD key member [member ...]
  SAVE
  SCARD key
  SDIFF key [key ...]
  SDIFFSTORE destination key [key ...]
  SELECT index
  SETBIT key offset value
  SETEX key seconds value
  SETNX key value
  SETRANGE key offset value
  SHUTDOWN
  SINTER key [key ...]
  SINTERSTORE destination key [key ...]
  SISMEMBER key member
  SLAVEOF host port
  SLOWLOG subcommand [argument]
  SMEMBERS key
  SMOVE source destination member
  SORT key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA] [STORE destination]
  SPOP key
  SRANDMEMBER key
  SREM key member [member ...]
  STRLEN key
  SUBSCRIBE channel [channel ...]
  SUNION key [key ...]
  SUNIONSTORE destination key [key ...]
  SYNC
  TYPE key
  UNSUBSCRIBE [channel [channel ...]]
  UNWATCH
  WATCH key [key ...]
  ZADD key score member
  ZCARD key
  ZCOUNT key min max
  ZINCRBY key increment member
  ZINTERSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]
  ZRANGE key start stop [WITHSCORES]
  ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]
  ZRANK key member
  ZREM key member
  ZREMRANGEBYRANK key start stop
  ZREMRANGEBYSCORE key min max
  ZREVRANGE key start stop [WITHSCORES]
  ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count]
  ZREVRANK key member
  ZSCORE key member
  ZUNIONSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]
