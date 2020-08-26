import {IRuleMetadata, RuleFailure, Rules} from 'tslint/lib';
import {SourceFile} from 'typescript/lib/typescript';
import {NgWalker} from 'codelyzer/angular/ngWalker';
import {BasicTemplateAstVisitor} from 'codelyzer/angular/templates/basicTemplateAstVisitor';
import {TemplateAst, BoundEventAst} from '@angular/compiler';

export class Rule extends Rules.AbstractRule {
    static readonly metadata: IRuleMetadata = {
        ruleName: 'disallow-click-event-on-p-button',
        type: 'maintainability',
        description: `Ensures that 'p-button' (PrimeNG) components don't use (click) event (cause of bugs related to [disabled] directive). Use instead (onClick).`,
        options: null,
        optionsDescription: 'Not configurable',
        rationale: `Applying '(click)' event on p-button tags will cause an error.`,
        typescriptOnly: true,
    };

    static readonly FAILURE_STRING = `On p-button component don't use (click) event (cause of bugs related to [disabled] directive). Use instead (onClick).`;

    apply(sourceFile: SourceFile): RuleFailure[] {
        return this.applyWithWalker(
            new NgWalker(sourceFile, this.getOptions(), {
                templateVisitorCtrl: MyDirectiveTemplateVisitor,
            })
        );
    }
}

class MyDirectiveTemplateVisitor extends BasicTemplateAstVisitor {
    private hasMyDirectiveOutput(ast: any): boolean {
        return (
            !!ast.outputs.length &&
            !!ast.outputs.filter((output: BoundEventAst) => output.name === 'click').length
        );
    }

    private addSourceValidationError(ast: TemplateAst): void {
        const {
            sourceSpan: {
                end: {offset: endOffset},
                start: {offset: startOffset},
            },
        } = ast;
        this.addFailureFromStartToEnd(startOffset, endOffset, Rule.FAILURE_STRING);
    }
    visitElement(ast: any, context: any): any {
        this.validateElement(ast, context);
        super.visitElement(ast, context);
    }

    private validateElement(ast: any, contest: any): any {
        if (ast.name === 'p-button' && this.hasMyDirectiveOutput(ast)) {
            this.addSourceValidationError(ast);
        }
    }
}
