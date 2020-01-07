#!/usr/bin/env bash
cd ..
GZIP=game_statistic.tar.gz
tar zcf ${GZIP} --exclude ./game_statistic/node_modules ./game_statistic
scp ${GZIP} root@47.56.146.202:/var/www
rm -rf ${GZIP}
