const { getDatabaseConnection } = require('../config/database');

const sampleProducts = [
  {
    name: 'Fishing Rod',
    image: 'https://example.com/images/fishing-rod.jpg',
    description: 'A high-quality fishing rod suitable for both beginners and professionals.',
    price: 49.99,
    user_id: 1 // Assuming user with ID 1 exists
  },
  {
    name: 'Boat Anchor',
    image: 'https://example.com/images/boat-anchor.jpg',
    description: 'A durable boat anchor made from galvanized steel, perfect for small to medium-sized boats.',
    price: 79.99,
    user_id: 1 // Assuming user with ID 1 exists
  },
  {
    name: 'Life Jacket',
    image: 'https://example.com/images/life-jacket.jpg',
    description: 'A comfortable and reliable life jacket that ensures safety while on the water.',
    price: 29.99,
    user_id: 1 // Assuming user with ID 1 exists
  },
  {
    name: 'Fishing Net',
    image: 'https://example.com/images/fishing-net.jpg',
    description: 'A durable fishing net for catching fish of all sizes.',
    price: 19.99,
    user_id: 1 // Assuming user with ID 1 exists
  },
  {
    name: 'Tackle Box',
    image: 'https://example.com/images/tackle-box.jpg',
    description: 'A spacious tackle box to keep all your fishing gear organized.',
    price: 39.99,
    user_id: 1 // Assuming user with ID 1 exists
  },
  {
    name: 'Kayak',
    image: 'https://example.com/images/kayak.jpg',
    description: 'A lightweight and durable kayak for recreational use.',
    price: 299.99,
    user_id: 1 // Assuming user with ID 1 exists
  },
  {
    name: 'Fishing Hat',
    image: 'https://example.com/images/fishing-hat.jpg',
    description: 'A comfortable fishing hat to protect you from the sun.',
    price: 14.99,
    user_id: 1 // Assuming user with ID 1 exists
  },
  {
    name: 'Fishing Boots',
    image: 'https://example.com/images/fishing-boots.jpg',
    description: 'Waterproof fishing boots to keep your feet dry.',
    price: 59.99,
    user_id: 1 // Assuming user with ID 1 exists
  },
  {
    name: 'Fishing Line',
    image: 'https://example.com/images/fishing-line.jpg',
    description: 'A strong and durable fishing line for all types of fishing.',
    price: 9.99,
    user_id: 1 // Assuming user with ID 1 exists
  },
  {
    name: 'Fishing Reel',
    image: 'https://example.com/images/fishing-reel.jpg',
    description: 'A high-quality fishing reel for smooth casting and reeling.',
    price: 89.99,
    user_id: 1 // Assuming user with ID 1 exists
  }
];

const db = getDatabaseConnection();

db.serialize(() => {
  const stmt = db.prepare('INSERT INTO products (name, image, description, price, user_id) VALUES (?, ?, ?, ?, ?)');

  sampleProducts.forEach(product => {
    stmt.run(product.name, product.image, product.description, product.price, product.user_id);
  });

  stmt.finalize();
});

db.close(() => {
  console.log('Sample products inserted successfully.');
});