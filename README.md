
TSLint rule for the p-button component from PrimeNG (UI lib for Angular).

Ensures that 'p-button' (PrimeNG) components don't use (click) event (cause of bugs related to the [disabled] directive). Use instead (onClick).

E.G.
`<p-button (click)="save()"></p-button> \\ Error`
`<p-button (onClick)="save()"></p-button> \\ Good`