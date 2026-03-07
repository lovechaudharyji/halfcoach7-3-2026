

// module.exports = router;
const express = require('express');
const multer = require('multer');
const Book = require('../models/Book');
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Multer config
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'pdf' && file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files allowed'));
    }
    if (file.fieldname === 'image' && !file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files allowed'));
    }
    cb(null, true);
  },
});

// POST /api/books
router.post('/', upload.fields([{ name: 'pdf' }, { name: 'image' }]), async (req, res) => {
  try {
    const { name, description, price, coachId } = req.body;
    const pdfFile = req.files['pdf'][0];
    const imageFile = req.files['image'][0];

    if (!coachId) return res.status(400).json({ error: 'Coach ID is required' });

    if (pdfFile.size > 10 * 1024 * 1024) return res.status(400).json({ error: 'PDF too large' });
    if (imageFile.size > 2 * 1024 * 1024) return res.status(400).json({ error: 'Image too large' });

    const newBook = new Book({
      name,
      description,
      price,
      coach: coachId,
      pdf: {
        data: pdfFile.buffer,
        contentType: pdfFile.mimetype,
        filename: pdfFile.originalname,
      },
      image: {
        data: imageFile.buffer,
        contentType: imageFile.mimetype,
        filename: imageFile.originalname,
      },
    });

    await newBook.save();
    await newBook.populate('coach', 'name email'); // 👈 Get coach details in response

    res.json({ message: 'Book uploaded successfully!', book: newBook });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// router.post("/create-checkout-session", async (req, res) => {
//   const { bookId, bookName, price } = req.body;

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: [
//         {
//           price_data: {
//             currency: "gbp",
//             product_data: {
//               name: bookName,
//             },
//             unit_amount: parseInt(price) * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       success_url: `${process.env.FRONTEND_BASE_URL}/book?paid=true&bookId=${bookId}`,
//       cancel_url: `${process.env.FRONTEND_BASE_URL}/cancel`,
//       customer_creation: "always",
//       locale: "en-GB",
//     });

//     res.json({ url: session.url });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

 router.post('/checkout-session/:bookId', async (req, res) => {
    try {
      const book = await Book.findById(req.params.bookId);
      if (!book) return res.status(404).json({ error: 'Book not found' });

      console.log('Booking initiated for:', book.name, 'Price:', book.price); // Debug log

      const price = parseFloat(book.price);
      
      // Calculate total amount: Base Price + 10% Markup + 4% Platform Fee
      // The frontend displays (Price * 1.10). We need to charge that + 4%.
      const priceWithMarkup = price * 1.10;
      const totalAmountInPence = Math.round(priceWithMarkup * 1.04 * 100);

      console.log('Price with Markup (10%):', priceWithMarkup);
      console.log('Total Amount in Pence (with 4% fee):', totalAmountInPence);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price_data: {
            currency: 'gbp',
            product_data: {
              name: book.name,
              description: book.description,
            },
            unit_amount: totalAmountInPence,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_BASE_URL}/download-success?bookId=${book._id}`, // Frontend success page
        cancel_url: `${process.env.FRONTEND_BASE_URL}/payment-failure`, // Or wherever you want
      });
          res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 📌 Get all books
router.get('/', async (req, res) => {
  const books = await Book.find({}, 'name description price');
  res.json(books);
});

// 📌 Get book image
router.get('/image/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book?.image) return res.status(404).send('Image not found');
  res.set('Content-Type', book.image.contentType);
  res.send(book.image.data);
});

// 📌 Download PDF
router.get('/download/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book?.pdf) return res.status(404).send('PDF not found');
  res.set({
    'Content-Type': book.pdf.contentType,
    'Content-Disposition': `attachment; filename="${book.pdf.filename}"`,
  });
  res.send(book.pdf.data);
});

// GET /api/books/coach/:coachId
router.get('/:coachId', async (req, res) => {
  try {
    const { coachId } = req.params;
    const books = await Book.find({ coach: coachId }).populate('coach', 'name email');

    if (!books.length) {
      return res.status(404).json({ message: 'No books found for this coach' });
    }

    res.json({ total: books.length, books });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 📌 Delete book
router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});

module.exports = router;
