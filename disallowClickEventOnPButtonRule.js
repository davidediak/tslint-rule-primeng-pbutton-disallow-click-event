"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Rule = void 0;
var lib_1 = require("tslint/lib");
var ngWalker_1 = require("codelyzer/angular/ngWalker");
var basicTemplateAstVisitor_1 = require("codelyzer/angular/templates/basicTemplateAstVisitor");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new ngWalker_1.NgWalker(sourceFile, this.getOptions(), {
            templateVisitorCtrl: MyDirectiveTemplateVisitor
        }));
    };
    Rule.metadata = {
        ruleName: 'disallow-click-event-on-p-button',
        type: 'maintainability',
        description: "Ensures that 'p-button' (PrimeNG) components don't use (click) event (cause of bugs related to [disabled] directive). Use instead (onClick).",
        options: null,
        optionsDescription: 'Not configurable',
        rationale: "Applying '(click)' event on p-button tags will cause an error.",
        typescriptOnly: true
    };
    Rule.FAILURE_STRING = "On p-button component don't use (click) event (cause of bugs related to [disabled] directive). Use instead (onClick).";
    return Rule;
}(lib_1.Rules.AbstractRule));
exports.Rule = Rule;
var MyDirectiveTemplateVisitor = /** @class */ (function (_super) {
    __extends(MyDirectiveTemplateVisitor, _super);
    function MyDirectiveTemplateVisitor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyDirectiveTemplateVisitor.prototype.hasMyDirectiveOutput = function (ast) {
        return (!!ast.outputs.length &&
            !!ast.outputs.filter(function (output) { return output.name === 'click'; }).length);
    };
    MyDirectiveTemplateVisitor.prototype.addSourceValidationError = function (ast) {
        var _a = ast.sourceSpan, endOffset = _a.end.offset, startOffset = _a.start.offset;
        this.addFailureFromStartToEnd(startOffset, endOffset, Rule.FAILURE_STRING);
    };
    MyDirectiveTemplateVisitor.prototype.visitElement = function (ast, context) {
        this.validateElement(ast, context);
        _super.prototype.visitElement.call(this, ast, context);
    };
    MyDirectiveTemplateVisitor.prototype.validateElement = function (ast, contest) {
        if (ast.name === 'p-button' && this.hasMyDirectiveOutput(ast)) {
            this.addSourceValidationError(ast);
        }
    };
    return MyDirectiveTemplateVisitor;
}(basicTemplateAstVisitor_1.BasicTemplateAstVisitor));
