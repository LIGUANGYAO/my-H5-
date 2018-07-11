package com.mzj.eagle.wechat.portal.common;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

public class AESUtil {
	private static final String DEFAULT_SECRET_KEY = "db5c7ed2-af94-46fe-a05d-40efdb4a77c9";// 默认密钥

	public static void main(String[] args) {
//		String msg = "良威zz打折的空间哈啥机会看到块钱我就好的速度很快范围付款就asskfafk123[0;l'EQ89;L;slJLKLF.MC良威zz打折的空间哈啥机会看到块钱我就好的速度很快范围付款就asskfafk123[0;l'EQ89;L;slJLKLF.MC良威zz打折的空间哈啥机会看到块钱我就好的速度很快范围付款就asskfafk123[0;l'EQ89;L;slJLKLF.MC良威zz打折的空间哈啥机会看到块钱我就好的速度很快范围付款就asskfafk123[0;l'EQ89;L;slJLKLF.MC良威zz打折的空间哈啥机会看到块钱我就好的速度很快范围付款就asskfafk123[0;l'EQ89;L;slJLKLF.MC良威zz打折的空间哈啥机会看到块钱我就好的速度很快范围付款就asskfafk123[0;l'EQ89;L;slJLKLF.MC";
//		
//		
//		System.out.println(msg.length());
//		System.out.println(new Date().getTime());
//		String e = encryptZip(msg);
//		System.out.println(new Date().getTime());
//		System.out.println(e);
//		// String z = ZipUtil.gzip(e);
//		// System.out.println(z);
//		// System.out.println(z.length());
//		// System.err.println("*******************************************");
//		// System.out.println(ZipUtil.gunzip(z));
//		System.out.println(e.length());
//		System.out.println(decryptZip(e));
//	
//
		String msg = encrypt("accountId=0&openId=o5bx2uHrL5qnrVehMJJC3tmM23QY&reportId=145");
		System.out.println(msg);
		System.out.println(decrypt("41c2ef373865a5f1c1ba13d614c8bbd4006ede415ef002bf0ee390cf2798dcd5b259e0bbeba98ba060c9ec133282679d48db1708f2dd7aa7e4b397b0ef72157d"));
	}

//	public static String encryptZip(String content) {
//		return ZipUtil.gzip(encrypt(content, DEFAULT_SECRET_KEY));
//	}
//
//	public static String decryptZip(String content) {
//		return decrypt(ZipUtil.gunzip(content), DEFAULT_SECRET_KEY);
//	}

	public static String encrypt(String content) {
		return encrypt(content, DEFAULT_SECRET_KEY);
	}

	public static String decrypt(String content) {
		return decrypt(content, DEFAULT_SECRET_KEY);
	}
	
	public static String encrypt(String content, String secret) {
		try {
			KeyGenerator kgen = KeyGenerator.getInstance("AES");
			SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
			secureRandom.setSeed(secret.getBytes());
			kgen.init(128,secureRandom);
			SecretKey secretKey = kgen.generateKey();
			byte[] enCodeFormat = secretKey.getEncoded();
			SecretKeySpec key = new SecretKeySpec(enCodeFormat, "AES");
			Cipher cipher = Cipher.getInstance("AES");// 创建密码器
			byte[] byteContent = content.getBytes("utf-8");
			cipher.init(Cipher.ENCRYPT_MODE, key);// 初始化
			byte[] result = cipher.doFinal(byteContent);
			// System.out.println(byte2int(result));
			return parseByte2HexStr(result); // 加密

		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static String decrypt(String content, String secret) {
		try {
			// byte[] contentByte = parseHexStr2Byte(content);
			byte[] contentByte = parseHexStr2Byte(content);
			KeyGenerator kgen = KeyGenerator.getInstance("AES");
			SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
			secureRandom.setSeed(secret.getBytes());
			kgen.init(128, secureRandom);
			SecretKey secretKey = kgen.generateKey();
			byte[] enCodeFormat = secretKey.getEncoded();
			SecretKeySpec key = new SecretKeySpec(enCodeFormat, "AES");
			Cipher cipher = Cipher.getInstance("AES");// 创建密码器
			cipher.init(Cipher.DECRYPT_MODE, key);// 初始化
			byte[] result = cipher.doFinal(contentByte);
			return new String(result); // 加密
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			e.printStackTrace();
		} catch (BadPaddingException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static String parseByte2HexStr(byte buf[]) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < buf.length; i++) {
			String hex = Integer.toHexString(buf[i] & 0xFF);
			if (hex.length() == 1) {
				hex = '0' + hex;
			}
			sb.append(hex);
		}
		return sb.toString();
	}

	public static byte[] parseHexStr2Byte(String hexStr) {
		if (hexStr.length() < 1)
			return null;
		byte[] result = new byte[hexStr.length() / 2];
		for (int i = 0; i < hexStr.length() / 2; i++) {
			int high = Integer.parseInt(hexStr.substring(i * 2, i * 2 + 1), 16);
			int low = Integer.parseInt(hexStr.substring(i * 2 + 1, i * 2 + 2), 16);
			result[i] = (byte) (high * 16 + low);
		}
		return result;
	}


}
