const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('E-commerce API is running...');
});

// Only start the server if the file is run directly, not during tests
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app; // Export app for testing