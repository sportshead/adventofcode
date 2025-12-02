{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    nixvim.url = "github:sportshead/nixvim";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    nixvim,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};

        browse-wrapper = pkgs.writeShellScriptBin "browse" ''
          open "$(browse.ts "$1" "$2")"
        '';

        today-wrapper = pkgs.writeShellScriptBin "today" ''
          dir="$(today.ts "$1" "$2")"
          echo "$dir"
          mkdir -p "$dir"
          cd "$dir" || (
            echo "failed to cd!"
            return
          )
          [ ! -f part1.ts ] && (date -Iseconds >timestarted.txt)

          projectRoot="$(projectRoot.ts)"
          [ ! -f part1.ts ] && cp "$projectRoot/template.ts" part1.ts
          touch input.txt
          touch _input.txt

          browse

          if [[ "$@" != *"-s"* ]]; then
            bun --watch run part1.ts &
          fi
        '';

        part2-wrapper = pkgs.writeShellScriptBin "part2" ''
          kill $!
          [ ! -f part2.ts ] && cp part1.ts part2.ts
          swap
          bun --watch run part2.ts &
        '';

        swap-wrapper = pkgs.writeShellScriptBin "swap" ''
          touch input.txt
          touch _input.txt

          mv _input.txt __input.txt
          mv input.txt _input.txt
          mv __input.txt input.txt
        '';

        bench-wrapper = pkgs.writeShellScriptBin "bench" ''
          hyperfine -w 3 --export-json timings.json -P pt 1 2 'bun run part{pt}.ts'
        '';
      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            bun
            hyperfine

            browse-wrapper
            today-wrapper
            part2-wrapper
            swap-wrapper
            bench-wrapper

            (nixvim.packages.${system}.default.extend {
              sportshead.lang = {
                haskell = true;
              };

              extraConfigLuaPost = ''
                require("codeium").disable();
              '';
            })

            (ghc.withPackages (p:
              with p; [
                haskell-language-server
              ]))
          ];

          shellHook = ''
            export PATH="$PWD/bin:$PATH"
          '';
        };
      }
    );
}
