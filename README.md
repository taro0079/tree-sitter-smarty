# tree-sitter-smarty
This is for EC cube styled smarty.
## Usage
First add parser:

```lua
local parsers = require("nvim-treesitter.parsers").get_parser_configs()

parsers.smarty = {
  install_info = {
    url = "https://github.com/Kibadda/tree-sitter-smarty",
    files = { "src/parser.c" },
    branch = "main",
  },
}
```

## Develop
1. Edit `grammar.js`.
2. Run below command.
```shell
npx tree-sitter generate
```

3. Test (you need `test.tpl`)
```shell
npx tree-sitter parse test.tpl
```
Then follow [adding queries](https://github.com/nvim-treesitter/nvim-treesitter#adding-queries).
