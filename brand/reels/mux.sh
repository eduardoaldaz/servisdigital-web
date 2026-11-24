#!/bin/sh
# Usage: mux.sh <video.mp4> <variant fs|sd>  -> writes <video>-music.mp4 with an original track
set -e
V="$1"; VAR="$2"; D=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V")
T=$(mktemp -d)
"${PY:-python3}" "$(dirname "$0")/music.py" "$D" "$T/m.wav" "$VAR" >/dev/null
ffmpeg -v error -y -i "$V" -i "$T/m.wav" -map 0:v -map 1:a -c:v copy -af loudnorm=I=-16:TP=-1.5 -c:a aac -b:a 192k -ar 44100 -shortest "${V%.mp4}-music.mp4"
rm -rf "$T"; echo "${V%.mp4}-music.mp4"
