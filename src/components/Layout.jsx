import Head from 'next/head'

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<title>WRITE RACE - Mirror</title>
			</Head>
			{children}
		</>
	)
}

export default Layout
