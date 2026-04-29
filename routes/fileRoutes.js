
// ---------------- ROUTES ---------------- //

// Home route - list all items
app.get('/', async (req, res) => {
    try {
        const items = await db.collection('items').find().toArray();
        res.render('index', { items });
    } catch (error) {
        res.status(500).send('Error fetching items');
    }
});

// Show create form
app.get('/create', (req, res) => {
    res.render('create');
});

// Create new item
app.post('/create', async (req, res) => {
    try {
        await db.collection('items').insertOne({
            name: req.body.name,
            description: req.body.description
        });
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error creating item');
    }
});

// Show edit form
app.get('/edit/:id', async (req, res) => {
    try {
        const item = await db.collection('items').findOne({
            _id: new ObjectId(req.params.id)
        });
        res.render('edit', { item });
    } catch (error) {
        res.status(500).send('Error fetching item');
    }
});

// Update item
app.post('/edit/:id', async (req, res) => {
    try {
        await db.collection('items').updateOne(
            { _id: new ObjectId(req.params.id) },
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description
                }
            }
        );
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error updating item');
    }
});

// Delete item
app.post('/delete/:id', async (req, res) => {
    try {
        await db.collection('items').deleteOne({
            _id: new ObjectId(req.params.id)
        });
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error deleting item');
    }
});

// Start server npm install express mongodb body-parser ejs
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
