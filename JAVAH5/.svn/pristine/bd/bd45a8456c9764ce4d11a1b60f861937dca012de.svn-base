package com.mzj.eagle.wechat.portal.wechat.vo;

import java.io.Serializable;
import java.util.List;

public class Graphic implements Serializable {

	private String touser;
	private String msgtype;
	private News news;
	
	
	
	public String getTouser() {
		return touser;
	}

	public void setTouser(String touser) {
		this.touser = touser;
	}

	public String getMsgtype() {
		return msgtype;
	}

	public void setMsgtype(String msgtype) {
		this.msgtype = msgtype;
	}

	public News getNews() {
		return news;
	}

	public void setNews(News news) {
		this.news = news;
	}

	public static class News{
		
		private List<NewsItem> articles;

		public List<NewsItem> getArticles() {
			return articles;
		}

		public void setArticles(List<NewsItem> articles) {
			this.articles = articles;
		}
	}
}
