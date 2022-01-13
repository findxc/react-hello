list=$(find ./public ./src -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' -o -name '*.gif')

for originF in $list; do
  webpF=$originF.webp

  # -e 用来检查文件是否存在
  if [ -e $webpF ]; then
    continue
  fi

  if [[ $originF =~ gif$ ]]; then
    gif2webp $originF -o $webpF -quiet
  else
    cwebp $originF -o $webpF -quiet
  fi

  origin_size=$(ls -l $originF | awk '{print $5}')
  webp_size=$(ls -l $webpF | awk '{print $5}')

  osize=$(ls -lh $originF | awk '{print $5}')
  wsize=$(ls -lh $webpF | awk '{print $5}')

  if [ $webp_size -ge $origin_size ]; then
    rm $webpF
    echo "😯 dropped $webpF, $osize --> $wsize"
  else
    percent=$(awk 'BEGIN{printf "%.1f%%\n",(('$origin_size'-'$webp_size')/'$origin_size')*100}')
    echo "✅ generated $webpF, $osize --> $wsize, reduce $percent"
  fi
done
