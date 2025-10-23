#!/bin/bash

# 修复文件权限的脚本
echo "正在修复文件权限..."

# 设置目录权限为755
find . -type d -exec chmod 755 {} \;

# 设置文件权限为644
find . -type f -exec chmod 644 {} \;

# 确保.htaccess文件有正确的权限
chmod 644 .htaccess

# 确保index.html有读取权限
chmod 644 index.html

# 确保CSS和JS文件有读取权限
chmod 644 css/style.css
chmod 644 js/game.js

echo "权限修复完成！"
echo "目录权限: 755"
echo "文件权限: 644"