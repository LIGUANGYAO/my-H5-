package com.mzj.eagle.wechat.portal.common;

import java.util.List;

/**
 * Created by liuyihao on 2017/10/18.
 */
public class URLBuilder {
    private StringBuilder urlB;

    public URLBuilder(String url) {
        urlB = new StringBuilder(url);
    }

    public URLBuilder paramArray(String name, List<?> value) {
        return paramArray(name, value == null ? null : value.toArray());
    }

    public URLBuilder paramPath(String name, Object value) {
        if (name == null || value == null)
            return this;
        String p = '{' + name + '}';
        int s = urlB.indexOf(p);
        int e = p.length();
        urlB.replace(s, s + e, value.toString());
        return this;
    }

    public URLBuilder paramArrayPath(String name, List<?> value) {
        return paramArray(name, value == null ? null : value.toArray());
    }

    public URLBuilder paramArrayPath(String name, Object[] value) {
        return paramPath(name, parseArray(value));
    }

    public URLBuilder paramArray(String name, Object[] value) {
        return param(name, parseArray(value));
    }

    public URLBuilder param(String name, Object value) {
        if (name == null || value == null)
            return this;
        urlB.append(urlB.indexOf("?") == -1 ? '?' : '&');
        urlB.append(name).append('=').append(value.toString());
        return this;
    }

    private String parseArray(Object[] value) {
        if (value == null)
            return null;
        int iMax = value.length - 1;
        if (iMax == -1)
            return "";
        StringBuilder b = new StringBuilder();
        for (int i = 0; ; i++) {
            b.append(value[i]);
            if (i == iMax)
                break;
            b.append(",");
        }
        return b.toString();
    }

    @Override
    public String toString() {
        return urlB.toString();
    }

    public String getURL() {
        return toString();
    }
}
