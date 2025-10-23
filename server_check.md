# 服务器配置检查清单

## 1. Apache服务器检查
- [ ] 确认Apache已安装并运行
- [ ] 检查httpd.conf或apache2.conf配置
- [ ] 确认mod_rewrite模块已启用
- [ ] 检查虚拟主机配置

## 2. 文件权限检查
```bash
# 检查当前权限
ls -la

# 修复权限（Linux/Unix）
chmod 755 ./
chmod 644 *.html *.css *.js
chmod 644 css/* js/*

# 或者使用提供的脚本
chmod +x fix_permissions.sh
./fix_permissions.sh
```

## 3. 常见问题排查
- [ ] 检查文件是否存在
- [ ] 检查文件路径是否正确
- [ ] 检查服务器错误日志
- [ ] 检查防火墙设置
- [ ] 检查SELinux状态（如果适用）

## 4. 测试方法
1. 直接在浏览器中访问CSS文件URL
2. 检查浏览器开发者工具的网络面板
3. 查看服务器错误日志
4. 使用curl命令测试：
   ```bash
   curl -I http://your-domain.com/css/style.css
   ```

## 5. 临时解决方案
如果问题持续存在，可以尝试：
1. 将CSS内容直接嵌入HTML中
2. 使用CDN托管静态文件
3. 检查服务器提供商的安全设置