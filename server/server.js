require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
  [1, { price: 10000, name: 'first_payment' }],
  [2, { price: 20000, name: 'second_payment' }],
])

app.post('/create-checkout-session', async (req, res) => {
  try {
    const items = req.body.items.map(({ id, quantity }) => {
      const storeItem = storeItems.get(id)
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: storeItem.name,
          },
          unit_amount: storeItem.price,
        },
        quantity: quantity,
      }
    })
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    })

    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT)
})
