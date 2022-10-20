import React from 'react'
import axios from 'axios'

const Home = () => {
  const checkout = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/create-checkout-session`, {
        items: [
          {
            id: 1,
            quantity: 2,
          },
          {
            id: 2,
            quantity: 1,
          },
        ],
      })
      .then((res) => {
        if (res.status === 200) {
          return res
        }
        return new Promise.reject('InvalidGrantError')
      })
      .then(({ data }) => {
        window.location = data?.url
      })
      .catch((e) => {
        console.error('error', e)
      })
  }
  return (
    <div className="App">
      <button onClick={checkout}>Checkout</button>
    </div>
  )
}

export default Home
