import Head from 'next/head'

const Layout = ({ children }) => {
	const title = 'WRITE RACE - Mirror'
	const description = "In Mirror's $WRITE Race, Twitter users compete for votes to receive a Mirror invite. The real race, however, is actually writing on your newly-earned Mirror publication."
	const url = 'https://write-race.m1guelpf.me/'
	const image = 'https://write-race.m1guelpf.me/social.jpg'

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="title" content={title} />
				<meta name="description" content={description} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={url} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:image" content={image} />
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content={url} />
				<meta property="twitter:title" content={title} />
				<meta property="twitter:description" content={description} />
				<meta property="twitter:image" content={image} />
			</Head>
			{children}
		</>
	)
}

export default Layout
