# save this as shell.nix
{ pkgs ? import <nixpkgs> {}}:

pkgs.mkShell {
  packages = with pkgs;[ 
    nodejs_22
    corepack
    nodePackages.typescript
   ];
}