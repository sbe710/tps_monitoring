module.exports.setup = (app, handlers) => {
    app.get('/', handlers.getStatic);
    app.get('/test', handlers.hello);
    app.ws('/worker', () => {});
};
