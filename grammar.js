module.exports = grammar({
  name: "smarty",

  extras: ($) => [$.comment],

  rules: {
    template: ($) => repeat($._smarty),

    _smarty: ($) =>
      choice(
        $.inline,
        $.include,
        $.block,
        $.text,
        $.foreach,
        $.if,
        $.nocache,
      ),

    _nested: ($) =>
      choice($.inline, $.include, $.text, $.foreach, $.if, $.nocache),

    comment: ($) =>
      choice(
        seq("{*", /[^*]*/, "*}"),
        seq("<!--{*", /[^*]*/, "*}-->"),
      ),

    inline: ($) =>
      seq(
        "<!--{",
        alias(/[^}|]+/, $.php),
        repeat(seq("|", $.modifier)),
        "}-->",
      ),

    include: ($) =>
      seq(
        "{include",
        repeat(seq(/\s+/, $.parameter)),
        optional(/\s+/),
        "}",
      ),

    block: ($) =>
      seq(
        "{block",
        repeat(seq(/\s+/, $.parameter)),
        optional(/\s+/),
        "}",
        alias(repeat($._nested), $.body),
        "{/block}",
      ),

    foreach: ($) =>
      seq(
        "<!--{foreach",
        field("parameters", alias(/[^}]+/, $.php)),
        "}-->",
        field("body", alias(repeat($._nested), $.body)),
        field("alternative", optional($.foreach_else)),
        "<!--{/foreach}-->",
      ),

    foreach_else: ($) => seq("{foreachelse}", alias(repeat($._nested), $.body)),

    if: ($) =>
      seq(
        "<!--{if",
        field("condition", alias(/[^}]+/, $.php)),
        "}-->",
        field("body", alias(repeat($._nested), $.body)),
        repeat(field("alternative", $.else_if)),
        optional(field("alternative", $.else)),
        "<!--{/if}-->",
      ),

    else_if: ($) =>
      seq(
        "<!--{elseif",
        field("condition", alias(/[^}]+/, $.php)),
        "}-->",
        field("body", alias(repeat($._nested), $.body)),
      ),

    else: ($) =>
      seq("<!--{else}-->", field("body", alias(repeat($._nested), $.body))),

    nocache: ($) =>
      seq(
        "{nocache}",
        field("body", alias(repeat($._nested), $.body)),
        "{/nocache}",
      ),

    modifier: ($) =>
      seq(/[^|:}]+/, repeat(seq(":", alias(/[^|:}]+/, $.parameter)))),
    attribute_name: ($) => /[^\s=]+/,
    attribute_value: ($) =>
      choice($.string_double, $.string_single, $.array_value),

    string_single: ($) => /'[^']*'/,
    string_double: ($) => /"[^"]*"/,
    array_value: ($) => /\[[^\]]*\]/,

    variable: ($) => /\$[^\s=]+/,

    parameter: ($) =>
      seq(
        field("name", $.attribute_name),
        /\s*=\s*/,
        field("value", $.attribute_value),
      ),

    text: ($) => choice(/[^<{]+/, /</, /\{/),
  },
});
