# 在 .env.local 文件中需要有一行 tinyKey=xxx
tinyKey=$(cat .env.local | grep tinyKey | sed 's/tinyKey=\(.*\)$/\1/')

commitMsg="fix: auto tiny image"

# 因为在 post-commit 中执行 git commit 后又会触发 post-commit ，所以这里判断一下
lastCommit=$(git log -1 --pretty="%s")
if [ "$lastCommit" = "$commitMsg" ]; then
  exit 0
fi

list=$(git diff HEAD^ HEAD --name-only --diff-filter=AM | grep -E '\.(png|jpg|jpeg)$')

# $? 指上个命令的退出状态，或函数的返回值
# grep 返回 1 表示没有匹配的结果，返回 0 表示有匹配的结果，
if [ $? -eq 1 ]; then
  echo "🤪 no image to tiny"
  exit 0
else
  echo "🤪 start tiny image..."
fi

set -eo pipefail

for originF in $list; do
  tinyF=$originF.tiny

  origin_size=$(ls -l $originF | awk '{print $5}')

  if [ $origin_size -lt 10240 ]; then
    continue
  fi

  curl -sS --user api:$tinyKey --data-binary @$originF https://api.tinify.com/shrink | sed 's/^.*"url":"\(.*\)"}}$/\1/' | xargs curl -sS -o $tinyF

  tiny_size=$(ls -l $tinyF | awk '{print $5}')

  osize=$(ls -lh $originF | awk '{print $5}')
  wsize=$(ls -lh $tinyF | awk '{print $5}')

  percent=$(awk 'BEGIN{printf "%.1f%%\n",(('$origin_size'-'$tiny_size')/'$origin_size')*100}')
  echo "✅ replaced $originF, $osize --> $wsize, reduce $percent"

  mv $tinyF $originF
  git add $originF
done

git commit --no-verify -m "$commitMsg"
