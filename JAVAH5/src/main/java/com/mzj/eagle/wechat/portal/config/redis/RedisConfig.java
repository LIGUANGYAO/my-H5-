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
public class RedisConfig {

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

	@Value("${redis.database}")
	private Integer database;

	@Value("${redis.maxActive}")
	private Integer maxActive;

	@Value("${redis.maxIdle}")
	private Integer maxIdle;

	@Value("${redis.testOnBorrow}")
	private Boolean testOnBorrow;

	@Bean(name = "jedisPoolConfig")
	public JedisPoolConfig jedisPoolConfigBean() {
		JedisPoolConfig bean = new JedisPoolConfig();
		bean.setMaxTotal(maxActive.intValue());
		bean.setMaxIdle(maxIdle.intValue());
		bean.setTestOnBorrow(testOnBorrow.booleanValue());
		return bean;
	}

	@Bean(name = "jedisConnectionFactory")
	public JedisConnectionFactory jedisConnectionFactoryBean(final JedisPoolConfig jedisPoolConfig) {
		JedisConnectionFactory factory = new JedisConnectionFactory();
		factory.setPoolConfig(jedisPoolConfig);
		factory.setUsePool(usePool);
		factory.setHostName(hostName);
		factory.setPort(port);
		factory.setPassword(password);
		factory.setTimeout(timeout);
		factory.setDatabase(database);
		return factory;
	}

	@Bean(name = "redisTemplate")
	@Qualifier("redisTemplate")
	@Primary
	public StringRedisTemplate primaryRedis(final JedisConnectionFactory jedisConnectionFactory) {
		return new StringRedisTemplate(jedisConnectionFactory);
	}
}