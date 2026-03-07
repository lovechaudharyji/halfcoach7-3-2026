const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
//const domain = 'http://localhost:5173';

// Normal JSON parser for regular routes
router.use(express.json());

// ✅ Stripe Checkout Session Creation
router.post('/create-stripe-session', async (req, res) => {
    const { name, email, coachType, country, password } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: 'Coach Registration Fee',
                    },
                    unit_amount: 4900,
                },
                quantity: 1,
            }],
            mode: 'payment',
            customer_email: email,
            metadata: {
                name,
                email,
                coachType,
                country,
                password,
            },
            // discounts: [], // Optional: you can also pass a promotion_code ID here directly
            // allow_promotion_codes: true,
            allow_promotion_codes: true, // 👈 enables promo code field in Stripe UI

            success_url: `${process.env.FRONTEND_BASE_URL}/coachregister?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_BASE_URL}/coachregister?canceled=true`,
        });

        res.json({ sessionId: session.id });
    } catch (err) {
        console.error('Stripe session error:', err);
        res.status(500).json({ error: 'Failed to create Stripe session' });
    }
});

// ✅ Stripe Webhook Handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log('Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const { name, email, coachType, country, password } = session.metadata;

        // Import and use your Coach model
        const Coach = require('../models/coach-model');

        try {
            await Coach.create({
                name,
                email,
                coachType,
                country,
                password,
                // Add default profilePicture if needed
            });

            console.log('✅ Coach registered after successful payment:', email);
        } catch (err) {
            console.error('❌ Error saving coach after payment:', err.message);
        }
    }

    res.status(200).json({ received: true });
});

module.exports = router;
