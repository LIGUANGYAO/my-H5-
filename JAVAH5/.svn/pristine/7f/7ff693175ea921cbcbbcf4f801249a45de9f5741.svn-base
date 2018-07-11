package com.mzj.eagle.wechat.portal.config.redis;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.StringRedisTemplate;

import redis.clients.jedis.JedisPoolConfig;

@Configuration
public class RedisConfig0 {

	@Value("${redis.usePool}")
	private Boolean usePool;

	@Value("${redis.hostName}")
	private String hostName;

	@Value("${redis.port}")
	private Integer port;

	@Value("${redis.password}")
	private String password;

	@Value("${redis.timeout}")
	private Integer timeout;

	@Value("${redis.database_0}")
	private Integer database;

	@Value("${redis.maxActive}")
	private Integer maxActive;

	@Value("${redis.maxIdle}")
	private Integer maxIdle;

	@Value("${redis.testOnBorrow}")
	private Boolean testOnBorrow;

	@Bean(name = "jedisPoolConfig0")
	public JedisPoolConfig jedisPoolConfigBean() {
		JedisPoolConfig bean = new JedisPoolConfig();
		bean.setMaxTotal(maxActive.intValue());
		bean.setMaxIdle(maxIdle.intValue());
		bean.setTestOnBorrow(testOnBorrow.booleanValue());
		return bean;
	}

	@Bean(name = "jedisConnectionFactory0")
	public JedisConnectionFactory jedisConnectionFactoryBean(final JedisPoolConfig jedisPoolConfig0) {
		JedisConnectionFactory factory = new JedisConnectionFactory();
		factory.setPoolConfig(jedisPoolConfig0);
		factory.setUsePool(usePool.booleanValue());
		factory.setHostName(hostName);
		factory.setPort(port.intValue());
		factory.setPassword(password);
		factory.setTimeout(timeout.intValue());
		factory.setDatabase(database.intValue());
		return factory;
	}

	@Bean(name = "redisTemplate0")
	@Qualifier("redisTemplate0")
	@Primary
	public StringRedisTemplate primaryRedis(final JedisConnectionFactory jedisConnectionFactory0) {
		return new StringRedisTemplate(jedisConnectionFactory0);
	}
}