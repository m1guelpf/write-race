import { DotsHorizontalOutline, SearchOutline } from 'heroicons-react'
import { useState } from 'react'
import Layout from '../components/Layout'
import RaceLogo from '../components/RaceLogo'
import client from '../lib/client'
import fetchPublicationEntries from '../queries/fetch-publication-entries'
import fetchPublications from '../queries/fetch-publications'

const Race = ({ publications }) => {
	const [isOpen, setOpen] = useState(false)
	const [search, setSearch] = useState('')
	let sortedPublications = publications.sort((pub1, pub2) => pub2.entry_count - pub1.entry_count)

	if (search != '') {
		sortedPublications = sortedPublications.filter(pub => pub.ensLabel.toLowerCase().includes(search.toLowerCase()) || pub.displayName.toLowerCase().includes(search.toLowerCase()) || pub.contributor.displayName.toLowerCase().includes(search.toLowerCase()))
	}

	return (
		<Layout>
			<iframe style={{ zIndex: -1 }} className="absolute top-0 inset-x-0 w-full h-1/3" src="https://mirror.xyz/race/background" />
			<div className="relative z-1 h-screen w-full" style={{ background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 30%)' }}>
				<div className="flex flex-col items-center justify-center mt-24">
					<RaceLogo className="block overflow-visible w-5/6 sm:w-96" />
					<div className="my-10 bg-white shadow sm:max-w-2xl w-full sm:rounded-lg">
						<div className="py-4 px-4 border-b">
							<div className="flex items-center justify-between mb-6">
								<div className="flex items-center space-x-4">
									<div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-contain ${isOpen ? '' : 'bg-gray-200 animate-pulse'}`} style={{ backgroundImage: isOpen ? 'url(https://miguelpiedrafita.com/images/_site/logo.png)' : '' }} />
									<span className={`font-medium text-xl sm:text-2xl ${isOpen ? 'text-gray-800' : 'text-transparent bg-gray-200 rounded-lg animate-pulse'}`}>@m1guelpf</span>
								</div>
								<p className={`font-medium text-lg sm:text-xl ${isOpen ? 'text-blue-600' : 'text-gray-600'}`}>{isOpen ? '10' : ''}0 $MIGUEL</p>
							</div>
							{/* <div class="mb-4 flex flex-col justify-between items-center h-64 text-lg font-medium tracking-tight leading-7 text-center p-6 rounded-lg bg-blue-500">
								<div className="mt-14">
									<div class="text-2xl font-semibold text-center sm:text-3xl text-white">65h 42m 49s</div>
									<div class="font-normal leading-7 text-white">Join us each Wednesday at 3pm ET / 12pm PT</div>
								</div>
								<button class="p-1 text-white bg-blue-400 bg-opacity-60 rounded-lg px-2.5 py-1 font-medium ring-blue-400 ring-opacity-60 hover:ring-4 transition ease-in-out duration-300">Add To Calendar</button>
							</div> */}
							{isOpen && (
								<div className="mb-4 text-lg text-gray-800 leading-8 space-y-1">
									<p>
										👋 Hey! I'm{' '}
										<a href="https://twitter.com/m1guelpf" target="_blank" rel="noopener" className="font-medium text-gray-900">
											Miguel Piedrafita
										</a>
										, an 18-year-old maker. I noticed there weren't any lists of Mirror publications, so I decided to make one and have some fun in the process. You can follow my journey{' '}
										<a href="https://twitter.com/m1guelpf" target="_blank" rel="noopener" className="font-medium text-gray-900">
											on Twitter
										</a>
										, and hopefully on Mirror one day.
									</p>
									<p>
										Oh, and{' '}
										<a href="https://github.com/m1guelpf/write-race" target="_blank" rel="noopener" className="font-medium text-gray-900">
											this site is open-source
										</a>
										, in case you want to check the source out :)
									</p>
								</div>
							)}
							<p className="mb-4 text-lg text-gray-800 leading-8">
								In Mirror's{' '}
								<a href="https://mirror.xyz/race" target="_blank" rel="noopener" className="font-medium text-gray-900">
									$WRITE Race
								</a>
								, Twitter users compete for votes to receive a Mirror invite. The real race, however, is actually writing on your newly-earned Mirror publication.{' '}
								<button className="text-gray-400 focus:outline-none" onClick={() => alert("I'd link to my Mirror blog here, but I haven't received an invite yet! Vote for me on the next $WRITE race if you want me to write about building this site.")} target="_blank" rel="noreferrer">
									Continue reading…
								</button>
							</p>
							<div className="flex items-center justify-center">
								<button onClick={() => setOpen(state => !state)} className="rounded-lg py-1.5 px-6 hover:bg-gray-200 transition duration-300 focus:outline-none">
									<DotsHorizontalOutline className="w-6 h-6 text-gray-800" />
								</button>
							</div>
						</div>
						<div className="border-b mb-8">
							<div className="relative">
								<input onChange={event => setSearch(event.target.value)} value={search} className="pl-12 pr-6 py-6 w-full focus:outline-none" type="search" placeholder="Search" />
								<SearchOutline className="absolute top-6 left-3 text-gray-400 w-6 h-6" />
							</div>
						</div>
						<div className="py-4 px-4 flex items-center justify-between border-b">
							<p className="text-2xl font-semibold">Round ∞</p>
							<div className="flex items-center space-x-3 text-gray-500 text-lg">
								<p>
									<span className="font-medium text-gray-600">{publications.length}</span> Publications
								</p>
								<p>
									<span className="font-medium text-gray-600">{publications.map(pub => pub.entry_count).reduce((a, b) => a + b, 0)}</span> Entries
								</p>
							</div>
						</div>
						<div className="divide-y divide-gray-200">
							{sortedPublications.map((publication, i) => (
								<a href={`https://${publication.ensLabel}.mirror.xyz/`} target="_blank" rel="noopener" key={publication.ensLabel} className="border-l-2 border-transparent py-4 px-4 flex items-center justify-between w-full" style={{ borderLeftColor: i < 10 ? '#36d399' : 'transparent' }}>
									<div className="flex items-center">
										<img className="w-12 h-12 rounded-full" src={publication.avatarURL || `https://avatar.tobi.sh/mirrorhall-pub-${publication.ensLabel}.svg`} />
										<div className="ml-4 space-y-0.5">
											<div className="flex items-center space-x-2">
												<span className="font-medium text-xl text-gray-800">{publication.displayName}</span>
												<span className="hidden sm:block border px-1.5 py-0.5 rounded-full text-xs text-gray-400 font-medium">{publication.contributor.address.substr(0, 6)}</span>
											</div>
											<p className="text-gray-400 pb-0.5 text-sm">{publication.ensLabel}.mirror.xyz</p>
										</div>
									</div>
									<div className="flex items-center space-x-4">
										<p className="text-lg font-medium text-gray-800">
											{publication.entry_count} {publication.entry_count == 1 ? 'Entry' : 'Entries'}
										</p>
									</div>
								</a>
							))}
							{sortedPublications.length == 0 && <p className="py-4 text-center text-gray-600">No results</p>}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

const median = arr => {
	const mid = Math.floor(arr.length / 2),
		nums = [...arr].sort((a, b) => a - b)

	return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
}

export async function getStaticProps() {
	const {
		data: { publications },
	} = await client.query({ query: fetchPublications })

	let publicationEntries = publications.map(publication => {
		return client.query({ query: fetchPublicationEntries, variables: { ensLabel: publication.ensLabel } }).then(({ data: { publication } }) => [publication.ensLabel, publication.entries.length])
	})

	publicationEntries = Object.fromEntries(await Promise.all(publicationEntries))

	return {
		props: {
			publications: publications.map(publication => ({ ...publication, entry_count: publicationEntries[publication.ensLabel] })),
		},
	}
}

export default Race
