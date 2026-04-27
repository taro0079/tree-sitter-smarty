[
"<!--{"
"}-->"
"}"
"|"
"<!--{elseif"
"<!--{else}-->"
"<!--{if"
"<!--{/if}-->"
"<!--{foreach"
"{foreachelse}"
"<!--{/foreach}-->"
"{block"
"{/block}"
"{nocache}"
"{/nocache}"
"{include"
] @tag

(if condition: (php) @string)
(else_if condition: (php) @string)
(foreach parameters: (php) @string)

(inline (php) @string)

(parameter) @parameter

(comment) @comment
