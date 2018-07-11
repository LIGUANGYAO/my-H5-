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
public class RedisConfig4 {

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

	@Value("${redis.database_4}")
	private Integer database;

	@Value("${redis.maxActive}")
	private Integer maxActive;

	@Value("${redis.maxIdle}")
	private Integer maxIdle;

	@Value("${redis.testOnBorrow}")
	private Boolean testOnBorrow;

	@Bean(name = "jedisPoolConfig4")
	public JedisPoolConfig jedisPoolConfigBean() {
		JedisPoolConfig bean = new JedisPoolConfig();
		bean.setMaxTotal(maxActive.intValue());
		bean.setMaxIdle(maxIdle.intValue());
		bean.setTestOnBorrow(testOnBorrow.booleanValue());
		return bean;
	}

	@Bean(name = "jedisConnectionFactory4")
	public JedisConnectionFactory jedisConnectionFactoryBean(final JedisPoolConfig jedisPoolConfig4) {
		JedisConnectionFactory factory = new JedisConnectionFactory();
		factory.setPoolConfig(jedisPoolConfig4);
		factory.setUsePool(usePool.booleanValue());
		factory.setHostName(hostName);
		factory.setPort(port.intValue());
		factory.setPassword(password);
		factory.setTimeout(timeout.intValue());
		factory.setDatabase(database.intValue());
		return factory;
	}

	@Bean(name = "redisTemplate4")
	@Qualifier("redisTemplate4")
	@Primary
	public StringRedisTemplate primaryRedis(final JedisConnectionFactory jedisConnectionFactory4) {
		return new StringRedisTemplate(jedisConnectionFactory4);
	}
}