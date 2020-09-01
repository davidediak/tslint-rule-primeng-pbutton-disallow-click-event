
IMPORTANT: codelyzer version 6.0.0 is needed, with any lower version the rule won't work (without errors 😥).

TSLint rule for the p-button component from PrimeNG (UI lib for Angular).

Ensures that 'p-button' (PrimeNG) components don't use (click) event (cause of bugs related to the [disabled] directive). Use instead (onClick).

E.G.

`<p-button (click)="save()"></p-button> \\ Error`
`<p-button (onClick)="save()"></p-button> \\ Good`

You can find it on npm

`npm i tslint-rule-primeng-pbutton-disallow-click-event`