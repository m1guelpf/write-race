import { gql } from '@apollo/client'

export default gql`
	query PublicationEntries($ensLabel: String!) {
		publication(ensLabel: $ensLabel) {
			ensLabel
			entries {
				digest
			}
		}
	}
`
