const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
//works with new db schema - June 2021
module.exports = {
    processPayment: async (req, res) => {
        const { id, amount } = req.body;
        try {
          const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Rent",
            payment_method: id,
            confirm: true,
          });
          console.log(payment);
          return res.status(200).json({
            confirm: "abc123",
          });
        } catch(error) {
          console.log(error);
          return res.status(400).json({
            message: 'Did not work'
          })
        }
      }
}