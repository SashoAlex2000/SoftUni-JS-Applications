

export function addUserNav (navTemplate) {

    let hasUser = null;

    return function (ctx, next) {

        if (Boolean(ctx.user) !== hasUser) {
            hasUser = ctx.user;
            ctx.renderNav(navTemplate(hasUser));
        }
        next();

    }

}

