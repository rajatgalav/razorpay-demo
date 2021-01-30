import Head from 'next/head'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router";

export default function Home() {

	const router = useRouter()

	useEffect (() => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        script.id = 'razorpay-script'
        document.head.appendChild(script)
        return () => {
            const script = document.getElementById('razorpay-script')
            const rContainer = document.querySelector('.razorpay-container')
            console.log('script2', rContainer)
            rContainer && rContainer.remove()
            script && script.remove()
        };
    }, [])



	const displayRazorpay = async (data) => {

		const options = {
			key: 'rzp_test_NjVOM0U7XTIgmq',
			amount: 27890,
			// order_id: data?.order_id,
			// notes: data?.notes,
			name: 'CaterHero',
			description: 'Order Food',
			image: 'http://localhost:1337/logo.svg',
			handler: (response) => {
        		confirmPayment(response)
			},
			prefill: {
				name: 'rajat',
				email: 'rajat@harakirimail.com',
				phone_number: 989562314
			}
		}
        const paymentObject = new window.Razorpay(options)
        paymentObject.on('payment.failed', function (response){
            confirmPayment(response, false);
        })
		paymentObject.open()
	}
	
	const confirmPayment = () => {
		router.push('/success')
	}

  	return (
		<div >
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<button onClick={displayRazorpay}>pay</button>
			</main>
		</div>
  )
}
