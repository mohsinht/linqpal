module.exports = (router) => {
  router.get('/', async (req, res) => {
    const html = `
        <html>
            <head>
                <title>Linqpal</title>
            </head>
            <body>
                <h1 style="text-align: center;">Welcome to LinqPal</h1>
            </body>
        </html>
    `
    res.set('Content-Type', 'text/html');
    res.send(html);
  });
};
