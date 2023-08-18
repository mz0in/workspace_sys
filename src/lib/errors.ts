export class RequiresPremiumPlanError extends Error {
    constructor(message = "This action requires a premium plan") {
        super(message);
    }
}
