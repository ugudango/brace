ace.define("ace/mode/pseudoc", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/text_highlight_rules", "ace/mode/behaviour"], function (acequire, exports, module) {
    "use strict";

    var oop = acequire("../lib/oop");
    var TextMode = acequire("./text").Mode;
    var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;
    var PseudocHighlightRules = acequire('ace/mode/pseudoc_highlight_rules').PseudocHighlightRules;
    var Behaviour = acequire("./behaviour").Behaviour;

    var Mode = function () {
        this.HighlightRules = TextHighlightRules;
        this.$behaviour = new Behaviour();
    };

    oop.inherits(Mode, TextMode);

    (function () {
        this.type = "text";
        this.getNextLineIndent = function (state, line, tab) {
            return '';
        };
        this.$id = "ace/mode/pseudoc";
    }).call(Mode.prototype);

    exports.Mode = Mode;
});

ace.define("ace/mode/pseudoc_highlight_rules", ['require', 'exports', 'ace/lib/oop', 'ace/mode/text_highlight_rules'], (acequire, exports) => {
    const oop = acequire('../lib/oop');
    const TextHighlightRules = acequire('./text_highlight_rules').TextHighlightRules;

    const PseudocHighlightRules = function PseudocHighlightRules() {
        this.$rules = {
            "start": [{
                    token: "empty_line",
                    regex: '^$'
                },
                {
                    token: 'language.constant',
                    regex: '\b(?:[aA][dD][eE][vV][aA][rR][aA][tT]|[fF][aA][lL][sS])\b',
                },
                {
                    token: 'keyword.operator',
                    regex: /\b(?:si|sau)\b/,
                },
                {
                    token: 'keyword.control',
                    regex: new RegExp('\\b(?:[sS][cC][rR][iI][eE]|[cC][iI][tT][eE][sS][tT][eE]|' +
                        '[sS][fF]([aA][rR][sS][iI][tT])?\\s*(?:[pP][eE][nN][tT][rR][uU]|[cC][aA][tT]' +
                        '\\s*[tT][iI][mM][pP]|[dD][aA][cC][aA])?|[dD][aA][cC][aA]|[aA][lL][tT][fF][eE]' +
                        '[lL]|[aA][tT][uU][nN][cC][iI]|[cC][aA][tT]\\s*[tT][iI][mM][pP]|' +
                        '[pP][aA][nN][aA]\\s*[cC][aA][nN][dD]|[pP][eE][nN][tT][rR][uU]|' +
                        '[rR][eE][pP][eE][tT][aA]|[eE][xX][eE][cC][uU][tT][aA])\\b'),
                },
                {
                    token: 'storage.type',
                    regex: '\\b(?:[iI][nN][tT][rR][eE][gG]|[lL][oO][gG][iI][cC]|[tT][eE][xX][tT]|[rR][eE][aA][lL])\\b'
                },
                {
                    token: "comment",
                    regex: "//",
                    next: "singleLineComment"
                },
                {
                    token: "string", // character
                    regex: "'(?:" + escapeRe + "|.)?'"
                },
                {
                    defaultToken: "text"
                },
            ],
            "singleLineComment": [{
                token: 'comment',
                regex: '$',
                next: 'start'
            }],
        };
    };
    oop.inherits(PseudocHighlightRules, TextHighlightRules);

    exports.PseudocHighlightRules = PseudocHighlightRules;
});