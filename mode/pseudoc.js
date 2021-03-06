ace.define("ace/mode/pseudoc_highlight_rules", ['require', 'exports', 'ace/lib/oop', 'ace/mode/text_highlight_rules'], (acequire, exports) => {
    const oop = acequire('../lib/oop');
    const TextHighlightRules = acequire('./text_highlight_rules').TextHighlightRules;
    const PseudocHighlightRules = function PseudocHighlightRules() {
        let escapeRe = /\\(?:['"?\\abfnrtv]|[0-7]{1,3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}U[a-fA-F\d]{8}|.)/.source
        this.$rules = {
            "start": [{
                    token: "empty_line",
                    regex: '^$'
                },
                {
                    token: 'language.constant',
                    regex: '\\b(?:[aA][dD][eE][vV][aA][rR][aA][tT]|[fF][aA][lL][sS])\\b',
                },
                {
                    token: 'keyword.operator',
                    regex: '\\b(?:si|sau)\\b',
                },
                {
                    token: 'keyword.control',
                    regex: '\\b(?:[sS][cC][rR][iI][eE]|[cC][iI][tT][eE][sS][tT][eE]|' +
                        '[sS][fF]([aA][rR][sS][iI][tT])?\\s*(?:[pP][eE][nN][tT][rR][uU]|[cC][aA][tT]' +
                        '\\s*[tT][iI][mM][pP]|[dD][aA][cC][aA])?|[dD][aA][cC][aA]|[aA][lL][tT][fF][eE]' +
                        '[lL]|[aA][tT][uU][nN][cC][iI]|[cC][aA][tT]\\s*[tT][iI][mM][pP]|' +
                        '[pP][aA][nN][aA]\\s*[cC][aA][nN][dD]|[pP][eE][nN][tT][rR][uU]|' +
                        '[rR][eE][pP][eE][tT][aA]|[eE][xX][eE][cC][uU][tT][aA])\\b',
                },
                {
                    token: 'storage.type',
                    regex: '\\b(?:[iI][nN][tT][rR][eE][gG]|[lL][oO][gG][iI][cC]|[tT][eE][xX][tT]|[rR][eE][aA][lL])\\b'
                },
                {
                    token: "comment",
                    regex: "//.*$",
                },
                {
                    token : "constant.numeric", // hex
                    regex : "0[xX][0-9a-fA-F]+(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
                },
                {
                    token : "keyword.operator",
                    regex : /--|\+\+|<<=|>>=|>>>=|<>|&&|\|\||\?:|[*%\/+\-&\^|~!<>=]=?/
                },
                {
                    token : "punctuation.operator",
                    regex : "\\?|\\:|\\,|\\;|\\."
                },
                {
                    token : "paren.lparen",
                    regex : "[[({]"
                }, {
                    token : "paren.rparen",
                    regex : "[\\])}]"
                },  
                {
                    token: "string", // character
                    regex: "'(?:" + escapeRe + "|.)?'"
                },
                {
                    defaultToken: "text"
                },
            ],
        };
    };
    oop.inherits(PseudocHighlightRules, TextHighlightRules);

    exports.PseudocHighlightRules = PseudocHighlightRules;
});

ace.define("ace/mode/pseudoc", ["ace/mode/pseudoc_highlight_rules", "require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/behaviour"], function (acequire, exports, module) {
    "use strict";

    var oop = acequire("../lib/oop");
    var TextMode = acequire("./text").Mode;
    var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;
    var PseudocHighlightRules = acequire('ace/mode/pseudoc_highlight_rules').PseudocHighlightRules;
    var Behaviour = acequire("./behaviour").Behaviour;

    var Mode = function () {
        this.HighlightRules = PseudocHighlightRules;
    };

    oop.inherits(Mode, TextMode);

    (function () {
        this.$id = "ace/mode/pseudoc";
    }).call(Mode.prototype);

    exports.Mode = Mode;
});
