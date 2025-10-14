{
    description = "flake for react project development";

    inputs = {
        nixpkgs.url="github:NixOS/nixpkgs/nixos-25.05";
        flake-utils.url = "github:numtide/flake-utils";
    };

    outputs = inputs@ {nixpkgs,...}: 
    let
      eachSystem = f: nixpkgs.lib.genAttrs nixpkgs.lib.systems.flakeExposed (system: f nixpkgs.legacyPackages.${system});
    in
    {

        devShells = eachSystem (pkgs: {
            default = pkgs.mkShell {
                packages = with pkgs; [
                    nodejs
                    pnpm
                    bun 
                    nodePackages.typescript
                    nodePackages.typescript-language-server
                ];        
                shellHook = ''
                    export SHELL="pkgs.zsh"
		            alias ll='ls -alF'
                '';
            };
        });
    };
}
