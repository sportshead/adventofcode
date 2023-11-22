# shellcheck shell=bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
echo "Adding $SCRIPT_DIR/bin to PATH..."

# dangerous! only use this script if you have checked what is in $SCRIPT_DIR/bin yourself
# and understand what the commands are doing
export PATH="$SCRIPT_DIR/bin:$PATH"

function browse() {
  open "$(browse.ts $1 $2)"
}

function today() {
  local dir
  dir="$(today.ts $1 $2)"
  echo "$dir"
  cd "$dir" || (echo "failed to cd!"; return)

  browse
  idea part1.ts
}
