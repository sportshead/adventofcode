# shellcheck shell=bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
echo "Adding $SCRIPT_DIR/bin to PATH..."

# dangerous! only use this script if you have checked what is in $SCRIPT_DIR/bin yourself
# and understand what the commands are doing
export PATH="$SCRIPT_DIR/bin:$PATH"

# shellcheck disable=SC2120
function browse() {
  open "$(browse.ts $1 $2)"
}

function today() {
  local dir
  local projectRoot

  dir="$(today.ts $1 $2)"
  echo "$dir"
  mkdir -p "$dir"
  cd "$dir" || (echo "failed to cd!"; return)

  projectRoot="$(projectRoot.ts)"
  if [ ! -f part1.ts ]; then
    cp "$projectRoot/template.ts" part1.ts
  fi
  touch input.txt
  touch _input.txt

  browse
  idea part1.ts
  idea input.txt

  bun --watch run part1.ts &
}

function part2() {
  kill $!
  cp part1.ts part2.ts
  swap

  idea part2.ts
  bun --watch run part2.ts &
}

function swap() {
  # round robin swap
  touch input.txt
  touch _input.txt

  mv _input.txt __input.txt
  mv input.txt _input.txt
  mv __input.txt input.txt
}
