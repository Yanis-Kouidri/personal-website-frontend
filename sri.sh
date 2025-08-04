#!/bin/sh

set -e

HTML_FILE="/usr/share/nginx/html/index.html"

echo "[SRI] Injecting integrity hashes into $HTML_FILE..."
echo "---------------------------------------------------"

find /usr/share/nginx/html/assets -type f \( -name "*.js" -o -name "*.css" \) | while read -r file; do
  filename=$(basename "$file")
  ext="${filename##*.}"

  sri_hash=$(openssl dgst -sha384 -binary "$file" | openssl base64 -A)
  integrity="sha384-$sri_hash"

  if [ "$ext" = "js" ]; then
    if sed -i "s|\(src=\"/assets/$filename\"\)|\1 integrity=\"$integrity\" crossorigin=\"anonymous\"|" "$HTML_FILE"; then
      echo "[✓] $filename — JS SRI injected"
    else
      echo "[✗] $filename — JS SRI injection failed"
    fi

  elif [ "$ext" = "css" ]; then
    if sed -i "s|\(href=\"/assets/$filename\"\)|\1 integrity=\"$integrity\" crossorigin=\"anonymous\"|" "$HTML_FILE"; then
      echo "[✓] $filename — CSS SRI injected"
    else
      echo "[✗] $filename — CSS SRI injection failed"
    fi
  fi
done

echo "---------------------------------------------------"
echo "[SRI] Injection completed."
