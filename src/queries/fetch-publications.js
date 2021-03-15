import { gql } from '@apollo/client'

export default gql`
	query FetchPublications {
		publications {
			ensLabel
			displayName
			avatarURL
			contributor {
				displayName
				avatarURL
				address
			}
		}
	}
`
