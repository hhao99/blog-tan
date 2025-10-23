# Tanstack/start blog example

# setup

## prerequests
1. nodejs
2. vscode
3. pnpm packages tools

## database setup

```bash
cd blog-tan
echo "DATABASE_URL='file:./dev.db'"
pnpm install
pnpm migrate dev --name init
pnpm push
pnpm generate
pnpm dev
```


