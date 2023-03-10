# 配置个人站点的HTTPS

::: tip
    阿里云申请SSL，宝塔Nginx配置HTTPS
:::



## 一、证书申请

### 1、阿里云整站搜索ssl

![image-20230111222155308.png](assets/d148fea69168466888c5ffc436b7727f_tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp)

### 2、进入ssl证书，点击免费证书

![image-20230111222322107.png](assets/d5337ff66a764e9087c2ffa619dc6fbf_tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp)

### 3、点击创建证书

一个ECS应用每个人每年可以申请20个，点进去申请即可

申请完毕，点击立即创建

![image-20230111222511725.png](assets/d3d78bb5be9845eabc58350a5e3b6e77_tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp)

### 4、点击证书申请

![image-20230111222706090.png](assets/2eaa02a0830244d086588b24247ffa4e_tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp)

**验证的时候可以点击验证，确保域名指向ip进行解析**

### 5、下载证书

![image-20230111222835684.png](assets/ebd15e7d13294e6183c9ea009465707c_tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp)

![image-20230111222912830.png](assets/9bac59c83989414f88da1610a835f088_tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp)

## 二、宝塔配置

### 1、进入宝塔相关设置

![image-20230111223053970.png](assets/3cd1cb5af7894e1385b9f2925f928d00_tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp)

![image-20230111223141318.png](assets/de49cfe496614833838be2db8f0216d1_tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp)

### 2、将之前在阿里云下载的文件进行解压

![image-20230111223250787.png](assets/3f5428769e1a4be19ac608b88db76ece_tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp)

### 3、将对应的文件打开，将key中的内容复制到第一个秘钥中，将pem中的内容复制到第二个证书中即可

### 4、访问你的域名即可，[www.yourdomain.com](https://link.juejin.cn?target=https%3A%2F%2Fwww.yourdomain.com)

